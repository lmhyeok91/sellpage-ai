import shutil
import os

src_path = r"C:\Users\minhy\OneDrive\바탕 화면\sanji_youth_person_library_config_v2_strict.json"
dest_data = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\src\data\sanji_youth_person_library_config_v2_strict.json"
dest_public = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\knowledge\sanji_youth_person_library_config_v2_strict.json"

os.makedirs(os.path.dirname(dest_public), exist_ok=True)

shutil.copy2(src_path, dest_data)
shutil.copy2(src_path, dest_public)

print("Successfully copied v2 strict JSON config!")
