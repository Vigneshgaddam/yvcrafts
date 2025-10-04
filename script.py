import requests
from PIL import Image
from io import BytesIO
import os

# Download the user's logo image
logo_path = 'WhatsApp-Image-2025-10-04-at-12.41.18-PM.jpg'
logo_img = Image.open(logo_path)

# Resize logo for web app header usage
logo_resized = logo_img.resize((120, 120))
logo_resized.save('logo_yv_crafts.png')

'Logo processed and saved as logo_yv_crafts.png for integration.'