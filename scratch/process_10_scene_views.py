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
for i, f in enumerate(files[:12]):
    print(f"[{i}] {os.path.basename(f)} - {os.path.getmtime(f)}")

# The latest 5 uploads are:
# files[0]: Apple harvest in orchard (과수원 수확)
# files[1]: Packing center watermelon inspection (패킹센터 검수)
# files[2]: Holding watermelon presenting (상품 들고 소개)
# files[3]: Truck crate loading (1톤 트럭 적재)
# files[4]: Dispatch clipboard checklist (산지 출고 확인)

scene_apple = files[0]
scene_inspect = files[1]
scene_present = files[2]
scene_truck = files[3]
scene_dispatch = files[4]

shutil.copy2(scene_apple, os.path.join(public_dir, "scene_orchard_harvest.png"))
shutil.copy2(scene_inspect, os.path.join(public_dir, "scene_packing_inspect.png"))
shutil.copy2(scene_truck, os.path.join(public_dir, "scene_truck_loading.png"))
shutil.copy2(scene_dispatch, os.path.join(public_dir, "scene_dispatch_check.png"))
shutil.copy2(scene_present, os.path.join(public_dir, "scene_product_present.png"))

print("All 5 master scene reference cuts successfully copied!")
