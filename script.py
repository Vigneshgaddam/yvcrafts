from PIL import Image

# Load previously uploaded logo file (logo_yv_crafts.jpg)
logo_path = 'logo_yv_crafts.jpg'
logo_img = Image.open(logo_path)

# Resize the logo for web header usage (PNG with transparency if possible)
logo_resized = logo_img.resize((120, 120))
logo_resized = logo_resized.convert("RGBA") # ensure PNG mode
logo_resized.save('logo_yv_crafts.png')

