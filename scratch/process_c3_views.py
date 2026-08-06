import os
import glob
import shutil

app_data = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99"
temp_media = os.path.join(app_data, ".tempmediaStorage")

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
os.makedirs(public_dir, exist_ok=True)

files = []
for ext in ('*.jpg', '*.png', '*.jpeg', '*.webp'):
    files.extend(glob.glob(os.path.join(temp_media, ext)))
    files.extend(glob.glob(os.path.join(app_data, ext)))

files.sort(key=os.path.getmtime, reverse=True)

print(f"Found {len(files)} files total:")
for i, f in enumerate(files[:15]):
    print(f"[{i}] {f} - mtime: {os.path.getmtime(f)}")

# Save the latest 6 images as candidate #3's gold multi-angle views!
# Candidate 3 is the truck background guy with wavy two-block fringe
c3_views = {
    'headshot': files[0],
    'right_45': files[1],
    'front_upper': files[2],
    'left_45': files[3],
    'half_body': os.path.join(public_dir, 'gold_view_5.png'), # from previous batch (crates leaning)
    'full_body': os.path.join(public_dir, 'gold_view_6.png')  # from previous batch (cargo pants & boots)
}

shutil.copy2(c3_views['headshot'], os.path.join(public_dir, 'c3_gold_1.png'))
shutil.copy2(c3_views['front_upper'], os.path.join(public_dir, 'c3_gold_2.png'))
shutil.copy2(c3_views['left_45'], os.path.join(public_dir, 'c3_gold_3.png'))
shutil.copy2(c3_views['right_45'], os.path.join(public_dir, 'c3_gold_4.png'))
shutil.copy2(c3_views['half_body'], os.path.join(public_dir, 'c3_gold_5.png'))
shutil.copy2(c3_views['full_body'], os.path.join(public_dir, 'c3_gold_6.png'))

print("Candidate 3 Gold 6-angle views successfully saved!")
