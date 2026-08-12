"""Transparent logo assets from the black-background source logos.

The two source logos are JPEGs on solid black. Dropped straight into the page
they would show as black rectangles over the translucent, blurred navbar pill,
so the background is keyed out here instead.

Run from the Team_website directory:  python scripts/build-logos.py

How the key works
- The background is black, so the brightest channel of a pixel IS its coverage:
  a pixel that is half-covered by artwork came out half as bright.
- The artwork is a flat amber whose brightest channel peaks around 150, not 255.
  Treating 255 as "fully covered" would therefore key the whole emblem to ~55%
  alpha and it would look washed out. Coverage is measured against the artwork's
  own peak instead, so solid strokes end up opaque and only the anti-aliased
  edges stay partial.
- Colour is un-premultiplied (c / coverage) so edge pixels carry the emblem's
  real hue rather than a darkened version of it.
- Coverage under NOISE_FLOOR is JPEG mush, not artwork, so it goes fully clear.

Sources are never modified.
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "team"
OUT = ROOT / "src" / "assets" / "brand"

NOISE_FLOOR = 20  # 0-255 on the source; below this a pixel is background
PEAK_PERCENTILE = 99  # what counts as "fully covered" within the artwork
GAP_ROWS = 0.02  # a blank band this tall (fraction of height) separates parts
FLAT_TOLERANCE = 16  # per-channel spread (0-255) still treated as one flat colour
EDGE_LO, EDGE_HI = 0.12, 0.85  # coverage stretched between these before alpha

# Widths, chosen per asset from where it actually renders: ~20px in the navbar
# and ~80px in the footer, both tripled for dense displays and then rounded up
# generously. The emblem's soft edges leave a lot of partial alpha, which is what
# costs bytes, so ALPHA_QUALITY is trimmed too — invisible at these sizes.
NAV_WIDTH = 160
FOOTER_WIDTH = 256
QUALITY = 80
ALPHA_QUALITY = 85


def key_black(path: Path) -> Image.Image:
    """Black background -> alpha, with the artwork's colour restored."""
    rgb = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    brightest = rgb.max(axis=2)

    artwork = brightest[brightest >= NOISE_FLOOR]
    if artwork.size == 0:
        raise RuntimeError(f"{path.name}: no artwork above the noise floor")
    peak = float(np.percentile(artwork, PEAK_PERCENTILE))

    coverage = np.clip(brightest / peak, 0.0, 1.0)
    coverage[brightest < NOISE_FLOOR] = 0.0

    safe = np.where(coverage > 0, coverage, 1.0)[..., None]
    colour = np.clip(rgb / safe, 0, 255)

    # Coverage comes out bimodal — a solid interior just short of 1.0, a faint
    # haze of JPEG noise just above 0, and a thin ramp between. Stretching the
    # ends makes the interior properly opaque and the haze properly clear, which
    # is both what the artwork means and far cheaper to encode.
    alpha = np.clip((coverage - EDGE_LO) / (EDGE_HI - EDGE_LO), 0.0, 1.0)

    # These logos are one flat colour, so any variation across the solid interior
    # is JPEG mottling rather than design. Where that holds, every pixel is given
    # the interior's median colour: it removes the mottling, and a constant RGB
    # plane costs almost nothing to encode next to a noisy one.
    solid = colour[alpha > 0.9]
    note = ""
    if solid.size:
        spread = solid.std(axis=0).max()
        if spread <= FLAT_TOLERANCE:
            flat = tuple(int(v) for v in np.median(solid, axis=0).round())
            colour[...] = flat
            note = f"  flat rgb {flat} (spread {spread:.1f})"
        else:
            note = f"  multicolour, colour kept (spread {spread:.1f})"

    out = np.dstack([colour, alpha[..., None] * 255]).round().astype(np.uint8)
    print(f"{path.name:22s} peak {peak:5.1f}  opaque {(alpha > 0.9).mean():.0%}{note}")
    return Image.fromarray(out, "RGBA")


def row_bands(img: Image.Image) -> list[tuple[int, int]]:
    """(top, bottom) of each block of non-empty rows, split on blank gaps."""
    alpha = np.asarray(img.getchannel("A"))
    has_ink = alpha.any(axis=1)
    height = len(has_ink)

    min_gap = max(2, int(height * GAP_ROWS))
    bands, start, blanks = [], None, 0

    for y, ink in enumerate(has_ink):
        if ink:
            if start is None:
                start = y
            blanks = 0
        elif start is not None:
            blanks += 1
            if blanks >= min_gap:
                bands.append((start, y - blanks + 1))
                start = None

    if start is not None:
        bands.append((start, height))

    return bands


def emit(img: Image.Image, name: str, width: int) -> None:
    img = img.crop(img.getbbox())  # tight to the artwork, so layout can size it
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)

    OUT.mkdir(parents=True, exist_ok=True)
    target = OUT / f"{name}.webp"
    img.save(
        target,
        "WEBP",
        quality=QUALITY,
        alpha_quality=ALPHA_QUALITY,
        method=6,
        exact=True,
    )
    print(f"  -> {target.name}  {img.width}x{img.height}  {target.stat().st_size / 1024:.1f} kB")


def main() -> None:
    # Navbar mark: the source pairs the emblem with a wordmark underneath. At the
    # ~20px the navbar gives it, that wordmark would be an illegible smudge next
    # to the real TEAM APOLLO text, so only the emblem band is kept.
    keyed = key_black(SRC / "Apollo_Logo-1.jpeg")
    bands = row_bands(keyed)
    print(f"  {len(bands)} row band(s): {bands} — keeping the first")
    top, bottom = bands[0]
    emit(keyed.crop((0, top, keyed.width, bottom)), "apollo-mark", NAV_WIDTH)

    # Footer logo: the emblem on its own in the source, so it is used whole.
    emit(key_black(SRC / "Apollo_Logo.jpeg"), "apollo-logo", FOOTER_WIDTH)


if __name__ == "__main__":
    main()
