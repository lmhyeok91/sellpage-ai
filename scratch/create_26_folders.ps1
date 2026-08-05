$base = "C:\Users\minhy\OneDrive\바탕 화면\상세페이지 최종순서"
if (!(Test-Path -Path $base)) {
    New-Item -ItemType Directory -Force -Path $base | Out-Null
}

$folders = @(
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
)

foreach ($folder in $folders) {
    $dir = Join-Path $base $folder
    if (!(Test-Path -Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

# Copy matching reference files into each section folder

# 01_메인후킹_1-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 1.png" "$base\01_메인후킹_1-1_극상당도18Brix_상품비주얼\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\오늘 수확량 50상자 한정\오늘 수확량 50상자 한정 1.png" "$base\01_메인후킹_1-1_극상당도18Brix_상품비주얼\" -ErrorAction SilentlyContinue
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\1.webp" "$base\01_메인후킹_1-1_극상당도18Brix_상품비주얼\" -ErrorAction SilentlyContinue

# 02_메인후킹_1-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\신선배송.png" "$base\02_메인후킹_1-2_당일직송24시간콘셉트\" -ErrorAction SilentlyContinue
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\model_person_1.png" "$base\02_메인후킹_1-2_당일직송24시간콘셉트\" -ErrorAction SilentlyContinue
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\2.webp" "$base\02_메인후킹_1-2_당일직송24시간콘셉트\" -ErrorAction SilentlyContinue

# 03_식욕컷_2-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 2.png" "$base\03_식욕컷_2-1_과즙_아삭식감단면확대\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\크림색 배경 딸기 쇼핑몰 상세페이지\1.png" "$base\03_식욕컷_2-1_과즙_아삭식감단면확대\" -ErrorAction SilentlyContinue
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\3.webp" "$base\03_식욕컷_2-1_과즙_아삭식감단면확대\" -ErrorAction SilentlyContinue

# 04_희소성_3-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\오늘 수확량 50상자 한정\오늘 수확량 50상자 한정 2.png" "$base\04_희소성_3-1_선착순100박스한정\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\주황색 모던 방울토마토 과일 농산물 판매 스토어 상세 페이지\2.png" "$base\04_희소성_3-1_선착순100박스한정\" -ErrorAction SilentlyContinue

# 05_타임세일_4-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\세일시작.png" "$base\05_타임세일_4-1_마감임박카운트다운\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\초저가 프로젝트.png" "$base\05_타임세일_4-1_마감임박카운트다운\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\할인.png" "$base\05_타임세일_4-1_마감임박카운트다운\" -ErrorAction SilentlyContinue

# 06_맛표현식감가이드_5-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 5.png" "$base\06_맛표현식감가이드_5-1_달콤함_식감_향긋함오감가이드\" -ErrorAction SilentlyContinue
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\4.webp" "$base\06_맛표현식감가이드_5-1_달콤함_식감_향긋함오감가이드\" -ErrorAction SilentlyContinue

# 07_문제제기_6-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 6.png" "$base\07_문제제기_6-1_마트재고과일vs당일수확과일비교\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\ChatGPT Image (1).png" "$base\07_문제제기_6-1_마트재고과일vs당일수확과일비교\" -ErrorAction SilentlyContinue

# 08_문제제기_6-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\이미지 중간에 동영상.mp4" "$base\08_문제제기_6-2_여러유통대기가정신선도차이\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\2026-08-02_153009_202608031528.mp4" "$base\08_문제제기_6-2_여러유통대기가정신선도차이\" -ErrorAction SilentlyContinue

# 09_구매이유_7-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\샤인머스켓 산지직송\1.png" "$base\09_구매이유_7-1_맛이오른제철시기와한정물량\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\샤인머스켓 산지직송\2.png" "$base\09_구매이유_7-1_맛이오른제철시기와한정물량\" -ErrorAction SilentlyContinue

# 10_구매이유_7-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 3.png" "$base\10_구매이유_7-2_산지시세와상품품질반영합리적가격\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\ChatGPT Image (2).png" "$base\10_구매이유_7-2_산지시세와상품품질반영합리적가격\" -ErrorAction SilentlyContinue

# 11_농부소개_8-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\초록색 노란색 농작물 옥수수 상품 판매 상세페이지\1.png" "$base\11_농부소개_8-1_30년장인농부의정직함스토리\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\ChatGPT Image (3).png" "$base\11_농부소개_8-1_30년장인농부의정직함스토리\" -ErrorAction SilentlyContinue

# 12_농부소개_8-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\베이지색 깔끔한 감자 농산물 판매 홍보 상세페이지\4.png" "$base\12_농부소개_8-2_까다로운기준과진정성스토리\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\ChatGPT Image (4).png" "$base\12_농부소개_8-2_까다로운기준과진정성스토리\" -ErrorAction SilentlyContinue

# 13_검수기준_9-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\녹색 전통적 농산물 신선한 과일 채소 오이 판매 상세페이지\5.png" "$base\13_검수기준_9-1_18Brix비파괴당도측정센서\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\브랜드\변경\ChatGPT Image (5).png" "$base\13_검수기준_9-1_18Brix비파괴당도측정센서\" -ErrorAction SilentlyContinue

# 14_검수기준_9-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 7.png" "$base\14_검수기준_9-2_1대1세심한신선도육안검수\" -ErrorAction SilentlyContinue

# 15_검수기준_9-3
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\고객리뷰\고객리뷰 1.png" "$base\15_검수기준_9-3_나무에서완숙된최적숙도선별\" -ErrorAction SilentlyContinue

# 16_산지검증_10
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\당일출고 후기\당일출고 후기 1.png" "$base\16_산지검증_10_풍부한일조량과큰일교차청정산지\" -ErrorAction SilentlyContinue

# 17_선별과정_11-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\감사한고객리뷰\감사한고객리뷰 1.png" "$base\17_선별과정_11-1_STEP1_1차산지현장선별\" -ErrorAction SilentlyContinue

# 18_선별과정_11-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 8.png" "$base\18_선별과정_11-2_STEP2_2차출고전최종재검수\" -ErrorAction SilentlyContinue

# 19_선별과정_11-3
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 10.png" "$base\19_선별과정_11-3_STEP3_3차안심에어셀안전포장\" -ErrorAction SilentlyContinue

# 20_고객후기_12
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\포토리뷰\포토리뷰 1.png" "$base\20_고객후기_12_평점5.0리뷰및생생한리얼후기\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\포토리뷰\포토리뷰 2.png" "$base\20_고객후기_12_평점5.0리뷰및생생한리얼후기\" -ErrorAction SilentlyContinue

# 21_배송신뢰_13
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\신선배송.png" "$base\21_배송신뢰_13_완충포장_콜드체인저온신속배송\" -ErrorAction SilentlyContinue

# 22_추천대상_14
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\분홍색과 빨간색 깔끔한 과일 농장 복숭아 판매 홍보 상세페이지\6.png" "$base\22_추천대상_14_선물용_아이간식_가족디저트\" -ErrorAction SilentlyContinue

# 23_FAQ_15-1
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\당일출고 후기\당일출고 후기 5.png" "$base\23_FAQ_15-1_올바른신선보관방법가이드\" -ErrorAction SilentlyContinue

# 24_FAQ_15-2
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 9.png" "$base\24_FAQ_15-2_세척및맛있게먹는섭취가이드\" -ErrorAction SilentlyContinue

# 25_교환환불_16
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\참외\참외 11.png" "$base\25_교환환불_16_배송파손24시간이내100프로AS보상\" -ErrorAction SilentlyContinue

# 26_품질보증_17
Copy-Item "c:\Users\minhy\Documents\Antigravity\detail-page-app\public\example_media\cs_notice_master_banner.png" "$base\26_품질보증_17_자부심을담은품질서약마감_문의교환안내배너\" -ErrorAction SilentlyContinue
Copy-Item "C:\Users\minhy\OneDrive\바탕 화면\망고보드\초록색 노란색 농작물 옥수수 상품 판매 상세페이지\7.png" "$base\26_품질보증_17_자부심을담은품질서약마감_문의교환안내배너\" -ErrorAction SilentlyContinue

Write-Host "All 26 folders populated successfully!"
