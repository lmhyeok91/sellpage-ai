import os
import glob
import shutil

app_data = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99"
temp_media = os.path.join(app_data, ".tempmediaStorage")

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
os.makedirs(public_dir, exist_ok=True)

# Find all JPG files sorted by modification time (newest first)
files = []
for ext in ('*.jpg', '*.png', '*.jpeg', '*.webp'):
    files.extend(glob.glob(os.path.join(temp_media, ext)))
    files.extend(glob.glob(os.path.join(app_data, ext)))

files.sort(key=os.path.getmtime, reverse=True)

print(f"Found {len(files)} files total:")
for f in files[:10]:
    print(f, os.path.getmtime(f))

# Copy the 5 newest images as user_ref_6 .. user_ref_10
for i, f in enumerate(files[:5]):
    ref_idx = i + 6
    dest_name = f"user_ref_{ref_idx}.png"
    dest_path = os.path.join(public_dir, dest_name)
    shutil.copy2(f, dest_path)
    print(f"Copied {f} -> {dest_path}")

print("Batch 2 (images 6-10) successfully processed!")
