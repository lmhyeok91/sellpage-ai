import os
import shutil

base = r"C:\Users\minhy\OneDrive\바탕 화면\상세페이지 최종순서"

# 1. Clean folder 01 (Remove 1.webp which is review card)
folder_01 = os.path.join(base, "01_메인후킹_1-1_극상당도18Brix_상품비주얼")
bad_1_webp = os.path.join(folder_01, "1.webp")
if os.path.exists(bad_1_webp):
    os.remove(bad_1_webp)
    print("Removed incorrect 1.webp from Folder 01")

# Move 1.webp to Folder 20 (Customer Reviews)
folder_20 = os.path.join(base, "20_고객후기_12_평점5.0리뷰및생생한리얼후기")
app_media = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"
review_1 = os.path.join(app_media, "1.webp")
if os.path.exists(review_1):
    shutil.copy2(review_1, os.path.join(folder_20, "리뷰_평점5.0_고객후기_카드.webp"))
    print("Copied 1.webp as 리뷰_평점5.0_고객후기_카드.webp to Folder 20")

# Add real Veo 3.1 MP4 video to Folder 01 for juice/fruit motion
veo_video_1 = r"C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\2026-08-02_153009_202608031528.mp4"
if os.path.exists(veo_video_1):
    shutil.copy2(veo_video_1, os.path.join(folder_01, "샤인머스켓_과즙_움직이는_Veo3.1_AI영상.mp4"))
    print("Copied Veo 3.1 MP4 video to Folder 01")

print("Fixed Section Media successfully!")
