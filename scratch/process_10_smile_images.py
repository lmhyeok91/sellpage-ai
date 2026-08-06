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

# Copy the top 10 newest images from this session:
# files[0..4] = Batch 2 (smiling images 6..10: includes watermelon holding cut)
# files[5..9] = Batch 1 (smiling images 1..5)

batch1 = files[5:10]
batch2 = files[:5]
all_10_smile = batch1 + batch2

for i, f in enumerate(all_10_smile):
    dest_name = f"user_smile_{i+1}.png"
    dest_path = os.path.join(public_dir, dest_name)
    shutil.copy2(f, dest_path)
    print(f"Copied [{i+1}/10] {f} -> {dest_path}")

# Specifically copy batch2[3] (Image 9: watermelon holding cut) to scene_watermelon.png and model_person_1.png
shutil.copy2(batch2[3], os.path.join(public_dir, "scene_watermelon.png"))
shutil.copy2(batch2[3], os.path.join(public_dir, "model_person_1.png"))
shutil.copy2(batch2[1], os.path.join(public_dir, "model_person_2.png"))
shutil.copy2(batch2[0], os.path.join(public_dir, "model_person_3.png"))
shutil.copy2(batch1[0], os.path.join(public_dir, "model_person_4.png"))

print("All 10 smiling reference images successfully processed!")
