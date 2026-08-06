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
# files[0..4] = Batch 2 (images 6..10: includes Full Body & Half Body & Left 45)
# files[5..9] = Batch 1 (images 1..5: includes Front Upper Body & Right 45)

batch1 = files[5:10]
batch2 = files[:5]
all_10 = batch1 + batch2

for i, f in enumerate(all_10):
    dest_name = f"master_user_{i+1}.png"
    dest_path = os.path.join(public_dir, dest_name)
    shutil.copy2(f, dest_path)
    print(f"Copied [{i+1}/10] {f} -> {dest_path}")

# Specifically copy Full Body (batch2[4] = image 10) to master_full_body.png
# Half body (batch2[3] = image 9) to master_half_body.png
# Left 45 (batch2[2] = image 8) to master_left_45.png
# Right 45 (batch1[3] = image 4) to master_right_45.png
# Upper body (batch1[1] = image 2) to master_upper_body.png

shutil.copy2(batch2[4], os.path.join(public_dir, "master_full_body.png"))
shutil.copy2(batch2[3], os.path.join(public_dir, "master_half_body.png"))
shutil.copy2(batch2[2], os.path.join(public_dir, "master_left_45.png"))
shutil.copy2(batch1[3], os.path.join(public_dir, "master_right_45.png"))
shutil.copy2(batch1[1], os.path.join(public_dir, "master_upper_body.png"))

print("All 10 newest master reference images successfully mapped!")
