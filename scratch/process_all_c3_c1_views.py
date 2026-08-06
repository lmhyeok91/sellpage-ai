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

print(f"Total files: {len(files)}")
for i, f in enumerate(files[:15]):
    print(f"[{i}] {os.path.basename(f)} - {os.path.getmtime(f)}")

# Recent Candidate 3 uploads:
# files[0]: media__1785979894178.jpg -> C3 Full body with truck & boots
# files[1]: media__1785979894165.jpg -> C3 Front headshot
# files[2]: media__1785979894154.jpg -> C3 Front headshot close
# files[3]: media__1785979894143.jpg -> C3 Front upper body
# files[4]: media__1785979894132.jpg -> C3 Left 45 profile
# files[5]: media__1785979894119.jpg -> C3 Headshot

shutil.copy2(files[1], os.path.join(public_dir, "c3_view_1.png")) # 대표 정면 얼굴
shutil.copy2(files[3], os.path.join(public_dir, "c3_view_2.png")) # 정면 상반신
shutil.copy2(files[4], os.path.join(public_dir, "c3_view_3.png")) # 좌측 45도
shutil.copy2(files[2], os.path.join(public_dir, "c3_view_4.png")) # 우측 45도
shutil.copy2(files[1], os.path.join(public_dir, "c3_view_5.png")) # 반신
shutil.copy2(files[0], os.path.join(public_dir, "c3_view_6.png")) # 전신 (트럭&워크화)

# Candidate 1 uploads (greenhouse background):
# files[6]: media__1785979815851.jpg -> C1 Full body
# files[7]: media__1785979810991.jpg -> C1 Right 45
# files[8]: media__1785979810968.jpg -> C1 Front upper body
# files[9]: media__1785979810917.jpg -> C1 Front headshot
# files[10]: media__1785979810894.jpg -> C1 Half body leaning crates
# files[11]: media__1785979810867.jpg -> C1 Left 45

shutil.copy2(files[9], os.path.join(public_dir, "c1_view_1.png")) # 대표 정면 얼굴
shutil.copy2(files[8], os.path.join(public_dir, "c1_view_2.png")) # 정면 상반신
shutil.copy2(files[11], os.path.join(public_dir, "c1_view_3.png")) # 좌측 45도
shutil.copy2(files[7], os.path.join(public_dir, "c1_view_4.png")) # 우측 45도
shutil.copy2(files[10], os.path.join(public_dir, "c1_view_5.png")) # 반신
shutil.copy2(files[6], os.path.join(public_dir, "c1_view_6.png")) # 전신

print("Candidate 1 and Candidate 3 multi-angle 6-view sets successfully processed!")
