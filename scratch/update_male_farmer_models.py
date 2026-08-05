import shutil
import os

img2 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_2_male_farmer_orchard_1785972406419.png"
img3 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_3_male_farmer_inspection_1785972419849.png"
img4 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_4_male_farmer_truck_smile_1785972435315.png"

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"

shutil.copy2(img2, os.path.join(public_dir, "model_person_2.png"))
shutil.copy2(img3, os.path.join(public_dir, "model_person_3.png"))
shutil.copy2(img4, os.path.join(public_dir, "model_person_4.png"))

print("Updated public/example_media model_person_2, 3, 4 with 30s Male Farmer cuts!")
