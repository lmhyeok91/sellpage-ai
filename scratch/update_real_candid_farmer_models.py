import shutil
import os

img2 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_2_male_farmer_real_1785973694632.png"
img3 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_3_male_farmer_real_1785973705841.png"
img4 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_4_male_farmer_real_1785973717407.png"

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"

shutil.copy2(img2, os.path.join(public_dir, "model_person_2.png"))
shutil.copy2(img3, os.path.join(public_dir, "model_person_3.png"))
shutil.copy2(img4, os.path.join(public_dir, "model_person_4.png"))

print("Updated public/example_media model_person_2, 3, 4 with REAL camera candid photos!")
