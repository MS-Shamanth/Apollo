"""Diagnostic: try several cascades per portrait and print every candidate box.

Used to pick reliable focal points for scripts/build-portraits.py.
"""

from pathlib import Path

import cv2

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Team_PFP"

FILES = {
    "preran": "Preran_PFP.jpeg",
    "shamanth": "Shamanth_PFP.jpeg",
    "shreya": "Shreya_PFP.jpeg",
    "shashank": "Shashank_PFP.jpeg",
    "chithsukhi": "Chitsukhi_PFP.jpeg",
}

CASCADES = [
    "haarcascade_frontalface_default.xml",
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_frontalface_alt.xml",
    "haarcascade_profileface.xml",
    "haarcascade_upperbody.xml",
]

for slug, filename in FILES.items():
    img = cv2.imread(str(SRC / filename))
    h, w = img.shape[:2]

    # Upscale small images so small faces clear the cascade's minimum size.
    scale = max(1.0, 900 / w)
    work = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_CUBIC)
    gray = cv2.equalizeHist(cv2.cvtColor(work, cv2.COLOR_BGR2GRAY))
    sh, sw = gray.shape[:2]

    print(f"\n=== {slug}  src {w}x{h}  (probing at {sw}x{sh}) ===")

    for name in CASCADES:
        path = cv2.data.haarcascades + name
        cascade = cv2.CascadeClassifier(path)
        if cascade.empty():
            print(f"  {name:42s} unavailable")
            continue

        boxes = cascade.detectMultiScale(
            gray, scaleFactor=1.03, minNeighbors=6, minSize=(int(sw * 0.05), int(sw * 0.05))
        )

        if len(boxes) == 0:
            print(f"  {name:42s} none")
            continue

        parts = []
        for bx, by, bw, bh in sorted(boxes, key=lambda b: -b[2] * b[3])[:4]:
            parts.append(
                f"cx={(bx + bw / 2) / sw:.3f} cy={(by + bh / 2) / sh:.3f} w={bw / sw:.3f}"
            )
        print(f"  {name:42s} {' | '.join(parts)}")
