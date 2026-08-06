import shutil
import os

c1 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\front_candidate_1_1785976028647.png"
c2 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\front_candidate_2_1785976045160.png"
c3 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\front_candidate_3_1785976056789.png"
c4 = r"C:\Users\minhy\.gemini\antigravity-ide\brain\01975df6-9695-44da-b3c7-fc731f199e99\front_candidate_4_1785976068340.png"

public_dir = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"

shutil.copy2(c1, os.path.join(public_dir, "front_candidate_1.png"))
shutil.copy2(c2, os.path.join(public_dir, "front_candidate_2.png"))
shutil.copy2(c3, os.path.join(public_dir, "front_candidate_3.png"))
shutil.copy2(c4, os.path.join(public_dir, "front_candidate_4.png"))

# Also copy c1 to model_person_1.png as default
shutil.copy2(c1, os.path.join(public_dir, "model_person_1.png"))

print("Copied front face candidates 1, 2, 3, 4 to public/example_media!")
