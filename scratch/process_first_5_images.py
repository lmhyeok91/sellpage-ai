import os
import glob
import shutil

app_data = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99"
temp_media = os.path.join(app_data, ".tempmediaStorage")

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
os.makedirs(public_dir, exist_ok=True)

# Find all PNG/JPG files in tempmediaStorage sorted by modification time (newest first)
files = []
for ext in ('*.png', '*.jpg', '*.jpeg', '*.webp'):
    files.extend(glob.glob(os.path.join(temp_media, ext)))
    files.extend(glob.glob(os.path.join(app_data, ext)))

files.sort(key=os.path.getmtime, reverse=True)

print(f"Found {len(files)} files in temp media:")
for f in files[:10]:
    print(f, os.path.getmtime(f))

# Copy the top 5 newest images
for i, f in enumerate(files[:5]):
    dest_name = f"user_ref_{i+1}.png"
    dest_path = os.path.join(public_dir, dest_name)
    shutil.copy2(f, dest_path)
    print(f"Copied {f} -> {dest_path}")

    # Also map to candidate 1..5
    candidate_name = f"front_candidate_{i+1}.png"
    shutil.copy2(f, os.path.join(public_dir, candidate_name))
    if i == 0:
        shutil.copy2(f, os.path.join(public_dir, "model_person_1.png"))

print("First 5 user images successfully processed!")
