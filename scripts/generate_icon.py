from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SIZE = 128


def main() -> None:
    ASSETS.mkdir(exist_ok=True)
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle((6, 6, 122, 122), radius=26, fill="#0B1020")
    draw.rounded_rectangle((12, 12, 116, 116), radius=21, outline="#23304A", width=2)

    draw.rounded_rectangle((34, 22, 90, 104), radius=8, fill="#F8FAFC")
    draw.polygon([(78, 22), (90, 34), (78, 34)], fill="#CBD5E1")

    for y, width in ((45, 34), (58, 42), (71, 28)):
        draw.rounded_rectangle((44, y, 44 + width, y + 5), radius=2, fill="#334155")

    draw.line((64, 50, 55, 63, 65, 63, 56, 78), fill="#22D3EE", width=5)
    draw.line((72, 50, 81, 63, 71, 63, 80, 78), fill="#22D3EE", width=5)

    draw.polygon(
        [(75, 69), (63, 94), (78, 91), (70, 110), (94, 78), (80, 81)],
        fill="#FACC15",
    )
    draw.line((75, 69, 63, 94, 78, 91, 70, 110, 94, 78, 80, 81, 75, 69), fill="#A16207", width=2)

    image.save(ASSETS / "icon.png")


if __name__ == "__main__":
    main()

