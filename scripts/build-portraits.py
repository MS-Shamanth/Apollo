"""Face-aligned portrait crops.

Detects each face, then chooses a 4:5 crop so that every portrait places the
face centre at the SAME fraction of the frame height (FACE_Y) and, where the
source allows, at the same relative size (FACE_WIDTH). That is what makes the
five heads sit on one line in the layout.

Run from the Team_website directory:  python scripts/build-portraits.py

Notes
- Sources in Team_PFP are never modified.
- Faces are detected on an upscaled copy so small faces clear the cascade's
  minimum size. Sunglasses defeat the default cascade, so several cascades are
  tried and the consensus box wins.
- Upscaling of the final image is capped, so a low-resolution source stays
  honest rather than being blown up into mush.
"""

from pathlib import Path
from statistics import median

import cv2
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Team_PFP"
OUT = ROOT / "src" / "assets" / "team"

RATIO = 4 / 5  # width / height
FACE_Y = 0.32  # face centre, as a fraction of crop height
FACE_WIDTH = 0.26  # face width, as a fraction of crop width
OUT_MIN, OUT_MAX = 520, 900
MAX_UPSCALE = 2.0

FILES = {
    "preran": "Preran_PFP.jpeg",
    "shamanth": "Shamanth_PFP.jpeg",
    "shreya": "Shreya_PFP.jpeg",
    "shashank": "Shashank_PFP.jpeg",
    "chithsukhi": "Chitsukhi_PFP.jpeg",
}

CASCADES = (
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_frontalface_alt.xml",
    "haarcascade_frontalface_default.xml",
)


def detect_face(path: Path) -> tuple[float, float, float]:
    """Return (cx, cy, width) of the face in fractions of the image size."""
    img = cv2.imread(str(path))
    if img is None:
        raise RuntimeError(f"could not read {path}")

    height, width = img.shape[:2]
    scale = max(1.0, 900 / width)
    work = cv2.resize(img, (int(width * scale), int(height * scale)), cv2.INTER_CUBIC)
    gray = cv2.equalizeHist(cv2.cvtColor(work, cv2.COLOR_BGR2GRAY))
    sh, sw = gray.shape[:2]

    # One vote per cascade: its largest box. In these photos the real face is
    # always the biggest detection, while false positives (foliage, logos,
    # hands) are small. Taking the median across cascades then discards any
    # single cascade that got it wrong — averaging all boxes would not, because
    # false positives cluster in their own group and drag the mean with them.
    votes = []
    for name in CASCADES:
        cascade = cv2.CascadeClassifier(cv2.data.haarcascades + name)
        if cascade.empty():
            continue
        boxes = cascade.detectMultiScale(
            gray,
            scaleFactor=1.03,
            minNeighbors=6,
            minSize=(int(sw * 0.05), int(sw * 0.05)),
        )
        if len(boxes) == 0:
            continue
        bx, by, bw, bh = max(boxes, key=lambda b: b[2] * b[3])
        votes.append(((bx + bw / 2) / sw, (by + bh / 2) / sh, bw / sw))

    if not votes:
        raise RuntimeError(f"no face detected in {path.name}")

    return (
        median(v[0] for v in votes),
        median(v[1] for v in votes),
        median(v[2] for v in votes),
    )


def plan_crop(src_w: int, src_h: int, cx: float, cy: float, face_w: float):
    """Widest 4:5 crop that still lands the face at FACE_Y / FACE_WIDTH."""
    face_px = face_w * src_w
    cx_px, cy_px = cx * src_w, cy * src_h

    limits = [
        face_px / FACE_WIDTH,  # desired head size
        src_w,  # image width
        src_h / (1 / RATIO),  # image height, via the 4:5 ratio
        cy_px / ((1 / RATIO) * FACE_Y),  # enough headroom above the face
        (src_h - cy_px) / ((1 / RATIO) * (1 - FACE_Y)),  # enough room below
    ]
    crop_w = max(16.0, min(limits))
    crop_h = crop_w / RATIO

    left = min(max(cx_px - crop_w / 2, 0), src_w - crop_w)
    top = min(max(cy_px - FACE_Y * crop_h, 0), src_h - crop_h)

    return round(left), round(top), round(crop_w), round(crop_h), face_px


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"target: face centre at {FACE_Y:.0%} of height, face width {FACE_WIDTH:.0%}\n")
    print(f"{'name':12s} {'source':>11s}  {'crop':>11s}  {'output':>10s}  {'face y':>7s}  {'face w':>7s}")
    print("-" * 68)

    for slug, filename in FILES.items():
        source = SRC / filename
        if not source.exists():
            raise FileNotFoundError(f"missing source portrait: {source}")

        cx, cy, face_w = detect_face(source)

        with Image.open(source) as raw:
            img = ImageOps.exif_transpose(raw).convert("RGB")
            src_w, src_h = img.size

            left, top, crop_w, crop_h, face_px = plan_crop(src_w, src_h, cx, cy, face_w)
            cropped = img.crop((left, top, left + crop_w, top + crop_h))

            out_w = min(OUT_MAX, max(OUT_MIN, crop_w), round(crop_w * MAX_UPSCALE))
            out_h = round(out_w / RATIO)
            final = cropped.resize((out_w, out_h), Image.LANCZOS)

            final.save(OUT / f"{slug}.webp", "WEBP", quality=88, method=6)
            final.save(OUT / f"{slug}.jpg", "JPEG", quality=88, optimize=True, progressive=True)

        # Independent check: re-detect on the written file rather than trusting
        # the arithmetic. These are the numbers that actually matter.
        try:
            vx, vy, vw = detect_face(OUT / f"{slug}.jpg")
            measured = f"{vy:6.3f}  {vw:6.3f}"
        except RuntimeError:
            measured = "     ?       ?"

        print(
            f"{slug:12s} {src_w:5d}x{src_h:<5d}  {crop_w:5d}x{crop_h:<5d}  "
            f"{out_w:4d}x{out_h:<5d}  {measured}"
        )


if __name__ == "__main__":
    main()
