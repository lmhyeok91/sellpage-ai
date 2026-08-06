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
for f in files[:15]:
    print(f, os.path.getmtime(f))

# Copy the top 10 newest images as user_new_1.png .. user_new_10.png
# Since images were uploaded in 2 batches of 5:
# files[0..4] = 2nd batch (images 6..10)
# files[5..9] = 1st batch (images 1..5)
# Let's order them chronologically: 1st batch first, 2nd batch second!

batch1 = files[5:10]
batch2 = files[:5]
all_10 = batch1 + batch2

for i, f in enumerate(all_10):
    dest_name = f"user_new_{i+1}.png"
    dest_path = os.path.join(public_dir, dest_name)
    shutil.copy2(f, dest_path)
    print(f"Copied [{i+1}/10] {f} -> {dest_path}")

print("All 10 newest reference images successfully processed!")
