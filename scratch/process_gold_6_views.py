import os
import glob
import shutil

app_data = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99"
temp_media = os.path.join(app_data, ".tempmediaStorage")

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
os.makedirs(public_dir, exist_ok=True)

# Find all image files sorted by modification time (newest first)
files = []
for ext in ('*.jpg', '*.png', '*.jpeg', '*.webp'):
    files.extend(glob.glob(os.path.join(temp_media, ext)))
    files.extend(glob.glob(os.path.join(app_data, ext)))

files.sort(key=os.path.getmtime, reverse=True)

print(f"Found {len(files)} files total:")
for f in files[:10]:
    print(f, os.path.getmtime(f))

# The top 6 newest images are the 6 gold standard multi-angle images uploaded by the user!
# In order of upload:
# files[5] = Image 1 (Left 45 angle headshot)
# files[4] = Image 2 (Half body leaning)
# files[3] = Image 3 (Front headshot)
# files[2] = Image 4 (Front upper body)
# files[1] = Image 5 (Right 45 angle headshot)
# files[0] = Image 6 (Full body standing with boots)

img_full_body = files[0]
img_right_45 = files[1]
img_upper_body = files[2]
img_front_headshot = files[3]
img_half_body = files[4]
img_left_45 = files[5]

shutil.copy2(img_front_headshot, os.path.join(public_dir, "gold_view_1.png"))
shutil.copy2(img_upper_body, os.path.join(public_dir, "gold_view_2.png"))
shutil.copy2(img_left_45, os.path.join(public_dir, "gold_view_3.png"))
shutil.copy2(img_right_45, os.path.join(public_dir, "gold_view_4.png"))
shutil.copy2(img_half_body, os.path.join(public_dir, "gold_view_5.png"))
shutil.copy2(img_full_body, os.path.join(public_dir, "gold_view_6.png"))

print("Gold standard 6-angle views successfully saved!")
