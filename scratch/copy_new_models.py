import shutil
import os

img2 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_2_female_farmer_1785959214765.png"
img3 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_3_chef_1785959226825.png"
img4 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\model_person_4_seafood_1785959238158.png"

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"

shutil.copy2(img2, os.path.join(public_dir, "model_person_2.png"))
shutil.copy2(img3, os.path.join(public_dir, "model_person_3.png"))
shutil.copy2(img4, os.path.join(public_dir, "model_person_4.png"))

print("Copied updated real models to public/example_media!")
