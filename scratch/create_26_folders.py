import os
import shutil

base = r"C:\Users\minhy\OneDrive\바탕 화면\상세페이지 최종순서"

os.makedirs(base, exist_ok=True)

folders = [
    "01_메인후킹_1-1_극상당도18Brix_상품비주얼",
    "02_메인후킹_1-2_당일직송24시간콘셉트",
    "03_식욕컷_2-1_과즙_아삭식감단면확대",
    "04_희소성_3-1_선착순100박스한정",
    "05_타임세일_4-1_마감임박카운트다운",
    "06_맛표현식감가이드_5-1_달콤함_식감_향긋함오감가이드",
    "07_문제제기_6-1_마트재고과일vs당일수확과일비교",
    "08_문제제기_6-2_여러유통대기가정신선도차이",
    "09_구매이유_7-1_맛이오른제철시기와한정물량",
    "10_구매이유_7-2_산지시세와상품품질반영합리적가격",
    "11_농부소개_8-1_30년장인농부의정직함스토리",
    "12_농부소개_8-2_까다로운기준과진정성스토리",
    "13_검수기준_9-1_18Brix비파괴당도측정센서",
    "14_검수기준_9-2_1대1세심한신선도육안검수",
    "15_검수기준_9-3_나무에서완숙된최적숙도선별",
    "16_산지검증_10_풍부한일조량과큰일교차청정산지",
    "17_선별과정_11-1_STEP1_1차산지현장선별",
    "18_선별과정_11-2_STEP2_2차출고전최종재검수",
    "19_선별과정_11-3_STEP3_3차안심에어셀안전포장",
    "20_고객후기_12_평점5.0리뷰및생생한리얼후기",
    "21_배송신뢰_13_완충포장_콜드체인저온신속배송",
    "22_추천대상_14_선물용_아이간식_가족디저트",
    "23_FAQ_15-1_올바른신선보관방법가이드",
    "24_FAQ_15-2_세척및맛있게먹는섭취가이드",
    "25_교환환불_16_배송파손24시간이내100프로AS보상",
    "26_품질보증_17_자부심을담은품질서약마감_문의교환안내배너"
]

for folder in folders:
    path = os.path.join(base, folder)
    os.makedirs(path, exist_ok=True)

mangoboard = r"C:\Users\minhy\OneDrive\바탕 화면\망고보드"
brand_change = r"C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경"
app_media = r"c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media"

def safe_copy(src, folder_name):
    if os.path.exists(src):
        dst = os.path.join(base, folder_name, os.path.basename(src))
        shutil.copy2(src, dst)
        print(f"Copied {os.path.basename(src)} -> {folder_name}")

# Copy matching files
safe_copy(os.path.join(mangoboard, "참외", "참외 1.png"), folders[0])
safe_copy(os.path.join(mangoboard, "오늘 수확량 50상자 한정", "오늘 수확량 50상자 한정 1.png"), folders[0])
safe_copy(os.path.join(app_media, "1.webp"), folders[0])

safe_copy(os.path.join(mangoboard, "신선배송.png"), folders[1])
safe_copy(os.path.join(app_media, "model_person_1.png"), folders[1])
safe_copy(os.path.join(app_media, "2.webp"), folders[1])

safe_copy(os.path.join(mangoboard, "참외", "참외 2.png"), folders[2])
safe_copy(os.path.join(app_media, "3.webp"), folders[2])

safe_copy(os.path.join(mangoboard, "오늘 수확량 50상자 한정", "오늘 수확량 50상자 한정 2.png"), folders[3])

safe_copy(os.path.join(mangoboard, "세일시작.png"), folders[4])
safe_copy(os.path.join(mangoboard, "초저가 프로젝트.png"), folders[4])
safe_copy(os.path.join(mangoboard, "할인.png"), folders[4])

safe_copy(os.path.join(mangoboard, "참외", "참외 5.png"), folders[5])
safe_copy(os.path.join(app_media, "4.webp"), folders[5])

safe_copy(os.path.join(mangoboard, "참외", "참외 6.png"), folders[6])
safe_copy(os.path.join(brand_change, "ChatGPT Image (1).png"), folders[6])

safe_copy(os.path.join(mangoboard, "이미지 중간에 동영상.mp4"), folders[7])
safe_copy(os.path.join(brand_change, "2026-08-02_153009_202608031528.mp4"), folders[7])

safe_copy(os.path.join(mangoboard, "샤인머스켓 산지직송", "1.png"), folders[8])
safe_copy(os.path.join(mangoboard, "샤인머스켓 산지직송", "2.png"), folders[8])

safe_copy(os.path.join(mangoboard, "참외", "참외 3.png"), folders[9])
safe_copy(os.path.join(brand_change, "ChatGPT Image (2).png"), folders[9])

safe_copy(os.path.join(mangoboard, "초록색 노란색 농작물 옥수수 상품 판매 상세페이지", "1.png"), folders[10])
safe_copy(os.path.join(brand_change, "ChatGPT Image (3).png"), folders[10])

safe_copy(os.path.join(mangoboard, "베이지색 깔끔한 감자 농산물 판매 홍보 상세페이지", "4.png"), folders[11])
safe_copy(os.path.join(brand_change, "ChatGPT Image (4).png"), folders[11])

safe_copy(os.path.join(mangoboard, "녹색 전통적 농산물 신선한 과일 채소 오이 판매 상세페이지", "5.png"), folders[12])
safe_copy(os.path.join(brand_change, "ChatGPT Image (5).png"), folders[12])

safe_copy(os.path.join(mangoboard, "참외", "참외 7.png"), folders[13])

safe_copy(os.path.join(mangoboard, "고객리뷰", "고객리뷰 1.png"), folders[14])

safe_copy(os.path.join(mangoboard, "당일출고 후기", "당일출고 후기 1.png"), folders[15])

safe_copy(os.path.join(mangoboard, "감사한고객리뷰", "감사한고객리뷰 1.png"), folders[16])

safe_copy(os.path.join(mangoboard, "참외", "참외 8.png"), folders[17])

safe_copy(os.path.join(mangoboard, "참외", "참외 10.png"), folders[18])

safe_copy(os.path.join(mangoboard, "포토리뷰", "포토리뷰 1.png"), folders[19])
safe_copy(os.path.join(mangoboard, "포토리뷰", "포토리뷰 2.png"), folders[19])

safe_copy(os.path.join(mangoboard, "신선배송.png"), folders[20])

safe_copy(os.path.join(mangoboard, "분홍색과 빨간색 깔끔한 과일 농장 복숭아 판매 홍보 상세페이지", "6.png"), folders[21])

safe_copy(os.path.join(mangoboard, "당일출고 후기", "당일출고 후기 5.png"), folders[22])

safe_copy(os.path.join(mangoboard, "참외", "참외 9.png"), folders[23])

safe_copy(os.path.join(mangoboard, "참외", "참외 11.png"), folders[24])

safe_copy(os.path.join(app_media, "cs_notice_master_banner.png"), folders[25])
safe_copy(os.path.join(mangoboard, "초록색 노란색 농작물 옥수수 상품 판매 상세페이지", "7.png"), folders[25])

print("Completed python script successfully!")
