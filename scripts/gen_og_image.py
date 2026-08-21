from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

W, H = 1200, 630
NAVY = (10, 22, 40)

# Base: sea background, cropped/darkened
sea = Image.open("public/hav-baggrund.jpg").convert("RGB")
# cover-fit crop to 1200x630
sea_ratio = sea.width / sea.height
target_ratio = W / H
if sea_ratio > target_ratio:
    new_w = int(sea.height * target_ratio)
    x0 = (sea.width - new_w) // 2
    sea = sea.crop((x0, 0, x0 + new_w, sea.height))
else:
    new_h = int(sea.width / target_ratio)
    y0 = (sea.height - new_h) // 2
    sea = sea.crop((0, y0, sea.width, y0 + new_h))
sea = sea.resize((W, H), Image.LANCZOS)

# Darken with navy overlay
overlay = Image.new("RGB", (W, H), NAVY)
base = Image.blend(sea, overlay, 0.62)
base = base.filter(ImageFilter.GaussianBlur(1.2))

draw = ImageDraw.Draw(base, "RGBA")
# extra dark gradient panel on left for text legibility
grad = Image.new("L", (W, H), 0)
gdraw = ImageDraw.Draw(grad)
for x in range(W):
    # stronger dark on left 65%, fading out
    if x < int(W * 0.72):
        alpha = 235
    else:
        alpha = int(235 * max(0, (1 - (x - W * 0.72) / (W * 0.28))))
    gdraw.line([(x, 0), (x, H)], fill=alpha)
dark = Image.new("RGB", (W, H), (6, 13, 22))
base = Image.composite(dark, base, grad)

draw = ImageDraw.Draw(base, "RGBA")

# Faroe accent strip left edge
for i in range(10):
    draw.line([(i, 0), (i, H)], fill=(245, 240, 235, 90))

# Portrait: circular, right side
portrait = Image.open("public/bergur-headshot.png").convert("RGB")
p_size = 300
portrait = ImageOps.fit(portrait, (p_size, p_size), Image.LANCZOS)
mask = Image.new("L", (p_size, p_size), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.ellipse((0, 0, p_size, p_size), fill=255)
ring = Image.new("RGBA", (p_size + 12, p_size + 12), (0, 0, 0, 0))
rdraw = ImageDraw.Draw(ring)
rdraw.ellipse((0, 0, p_size + 12, p_size + 12), outline=(245, 240, 235, 200), width=3)
px, py = W - p_size - 60, H - p_size - 70
base.paste(portrait, (px, py), mask)
base.paste(ring, (px - 6, py - 6), ring)

# Fonts
serif_bold = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 48)
serif_italic = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf", 30)
sans_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
sans_tiny = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)

cream = (245, 240, 235)
accent = (130, 180, 220)

margin_x = 80
y = 120

draw.text((margin_x, y), "BERGUR RØNNE MOBERG", font=sans_small, fill=(*accent, 255))
y += 50
draw.text((margin_x, y), "Foredrag om Færøerne,", font=serif_bold, fill=cream)
y += 58
draw.text((margin_x, y), "William Heinesen og", font=serif_bold, fill=cream)
y += 58
draw.text((margin_x, y), "nordisk litteratur", font=serif_bold, fill=cream)
y += 90
draw.text((margin_x, y), "Lektor i nordisk litteratur, Københavns Universitet", font=sans_tiny, fill=(210, 210, 215, 255))

base = base.convert("RGB")
base.save("public/og/bergur-roenne-moberg.jpg", quality=88)
print("saved", base.size)
