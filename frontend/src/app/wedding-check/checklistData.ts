export const INITIAL_CHECKLIST = [
    // 1. 전체 일정·예산
    { id: 101, category: "1. 전체 일정·예산", text: "결혼식 유무와 형태 결정", done: false, importance: 5, d_day_standard: 180, pct_range: [34, 50] },
    { id: 102, category: "1. 전체 일정·예산", text: "결혼 예정일 범위 설정", done: false, importance: 5, d_day_standard: 180, pct_range: [34, 50] },
    { id: 103, category: "1. 전체 일정·예산", text: "양가 부모님께 결혼 의사 전달", done: false, importance: 4, d_day_standard: 150, pct_range: [42, 59] },
    { id: 104, category: "1. 전체 일정·예산", text: "양가 상견례 일정·장소 선정", done: false, importance: 4, d_day_standard: 150, pct_range: [42, 59] },
    { id: 105, category: "1. 전체 일정·예산", text: "전체 예산 한도 설정", done: false, importance: 5, d_day_standard: 150, pct_range: [42, 59] },
    { id: 106, category: "1. 전체 일정·예산", text: "예산 분담 원칙 합의", done: false, importance: 5, d_day_standard: 150, pct_range: [42, 59] },

    // 2. 상견례·가족 (All 42-59)
    { id: 201, category: "2. 상견례·가족", text: "상견례 날짜·장소 예약", done: false, importance: 4, d_day_standard: 150, pct_range: [42, 59] },
    { id: 202, category: "2. 상견례·가족", text: "상견례 참석자 구성 확인", done: false, importance: 3, d_day_standard: 150, pct_range: [42, 59] },
    { id: 203, category: "2. 상견례·가족", text: "상견례에서 논의할 항목 정리", done: false, importance: 3, d_day_standard: 150, pct_range: [42, 59] },
    { id: 204, category: "2. 상견례·가족", text: "양가 부모님 선물 준비", done: false, importance: 2, d_day_standard: 150, pct_range: [42, 59] },

    // 3. 예식장·웨딩플래너
    { id: 301, category: "3. 예식장·웨딩플래너", text: "하객 예상 인원수 집계", done: false, importance: 4, d_day_standard: 150, pct_range: [42, 59] },
    { id: 302, category: "3. 예식장·웨딩플래너", text: "예식장 후보 리스트업", done: false, importance: 5, d_day_standard: 150, pct_range: [42, 59] },
    { id: 303, category: "3. 예식장·웨딩플래너", text: "웨딩홀 투어 예약", done: false, importance: 4, d_day_standard: 150, pct_range: [42, 59] },
    { id: 304, category: "3. 예식장·웨딩플래너", text: "예식장 계약 진행 (식대, 보증인원, 옵션)", done: false, importance: 5, d_day_standard: 150, pct_range: [50, 59] },
    { id: 305, category: "3. 예식장·웨딩플래너", text: "웨딩플래너 필요 여부 결정 및 섭외", done: false, importance: 3, d_day_standard: 150, pct_range: [50, 59] },

    // 4. 스튜디오·드레스·메이크업
    { id: 401, category: "4. 스튜디오·드레스·메이크업", text: "스튜디오 후보 조사", done: false, importance: 3, d_day_standard: 150, pct_range: [50, 59] },
    { id: 402, category: "4. 스튜디오·드레스·메이크업", text: "드레스 샵 후보 조사", done: false, importance: 3, d_day_standard: 150, pct_range: [50, 59] },
    { id: 403, category: "4. 스튜디오·드레스·메이크업", text: "메이크업 샵 후보 조사", done: false, importance: 3, d_day_standard: 150, pct_range: [50, 59] },
    { id: 404, category: "4. 스튜디오·드레스·메이크업", text: "스·드·메 패키지 선택 및 계약", done: false, importance: 5, d_day_standard: 120, pct_range: [59, 67] },
    { id: 405, category: "4. 스튜디오·드레스·메이크업", text: "웨딩 촬영 진행 (스튜디오/야외)", done: false, importance: 4, d_day_standard: 60, pct_range: [67, 83] },
    { id: 406, category: "4. 스튜디오·드레스·메이크업", text: "촬영·본식 소품 준비", done: false, importance: 2, d_day_standard: 60, pct_range: [67, 83] },
    { id: 407, category: "4. 스튜디오·드레스·메이크업", text: "부케 준비 방식 결정", done: false, importance: 2, d_day_standard: 60, pct_range: [67, 83] },

    // 5. 예복·한복
    { id: 501, category: "5. 예복·한복", text: "신랑 예복 결정 (맞춤/대여)", done: false, importance: 4, d_day_standard: 90, pct_range: [67, 75] },
    { id: 502, category: "5. 예복·한복", text: "신부 한복 선택", done: false, importance: 3, d_day_standard: 90, pct_range: [67, 75] },
    { id: 503, category: "5. 예복·한복", text: "양가 부모님 한복 또는 정장 확인", done: false, importance: 4, d_day_standard: 90, pct_range: [67, 75] },
    { id: 504, category: "5. 예복·한복", text: "가족 복장 가이드 전달", done: false, importance: 2, d_day_standard: 60, pct_range: [75, 83] },

    // 6. 예단·예물·반지
    { id: 601, category: "6. 예단·예물·반지", text: "예단 진행 여부·범위 협의", done: false, importance: 4, d_day_standard: 120, pct_range: [59, 67] },
    { id: 602, category: "6. 예단·예물·반지", text: "혼인 반지 선택 (사이즈/각인)", done: false, importance: 5, d_day_standard: 90, pct_range: [67, 75] },
    { id: 603, category: "6. 예단·예물·반지", text: "예물 범위 결정 (시계·주얼리)", done: false, importance: 3, d_day_standard: 90, pct_range: [67, 75] },
    { id: 604, category: "6. 예단·예물·반지", text: "예물·예단 구매 진행 및 일정", done: false, importance: 3, d_day_standard: 60, pct_range: [75, 83] },

    // 7. 신혼집·혼수
    { id: 701, category: "7. 신혼집·혼수", text: "신혼집 형태·입주 시점 결정", done: false, importance: 5, d_day_standard: 150, pct_range: [42, 59] },
    { id: 702, category: "7. 신혼집·혼수", text: "전세계약·입주 절차 진행", done: false, importance: 5, d_day_standard: 90, pct_range: [59, 75] },
    { id: 703, category: "7. 신혼집·혼수", text: "관리비·입주 규정 확인", done: false, importance: 3, d_day_standard: 90, pct_range: [59, 75] },
    { id: 704, category: "7. 신혼집·혼수", text: "혼수가전 리스트 작성 및 가격 비교", done: false, importance: 4, d_day_standard: 60, pct_range: [67, 83] },
    { id: 705, category: "7. 신혼집·혼수", text: "혼수가구 리스트 작성 및 쇼룸 방문", done: false, importance: 4, d_day_standard: 60, pct_range: [67, 83] },
    { id: 706, category: "7. 신혼집·혼수", text: "혼수가전·가구 계약 및 배송일 지정", done: false, importance: 4, d_day_standard: 30, pct_range: [75, 92] },
    { id: 707, category: "7. 신혼집·혼수", text: "주방·생활용품 리스트 작성 및 구매", done: false, importance: 3, d_day_standard: 30, pct_range: [75, 92] },
    { id: 708, category: "7. 신혼집·혼수", text: "이사 업체 선정 및 이사 날짜 확정", done: false, importance: 3, d_day_standard: 7, pct_range: [92, 98] },

    // 8. 청첩장·하객 관리
    { id: 801, category: "8. 청첩장·하객 관리", text: "청첩장 디자인 선택", done: false, importance: 3, d_day_standard: 60, pct_range: [75, 83] },
    { id: 802, category: "8. 청첩장·하객 관리", text: "종이·모바일 청첩장 제작", done: false, importance: 3, d_day_standard: 60, pct_range: [75, 83] },
    { id: 803, category: "8. 청첩장·하객 관리", text: "청첩장 문구 확정", done: false, importance: 2, d_day_standard: 45, pct_range: [83, 88] },
    { id: 804, category: "8. 청첩장·하객 관리", text: "하객 명단 작성·엑셀 관리 시작", done: false, importance: 4, d_day_standard: 45, pct_range: [83, 88] },
    { id: 805, category: "8. 청첩장·하객 관리", text: "종이 청첩장 전달 시작 (직접/우편)", done: false, importance: 3, d_day_standard: 30, pct_range: [88, 92] },
    { id: 806, category: "8. 청첩장·하객 관리", text: "모바일 청첩장 발송 계획 수립", done: false, importance: 3, d_day_standard: 30, pct_range: [92, 96] }, // Grouped logic
    { id: 807, category: "8. 청첩장·하객 관리", text: "모바일 청첩장 발송", done: false, importance: 3, d_day_standard: 14, pct_range: [92, 96] },
    { id: 808, category: "8. 청첩장·하객 관리", text: "참석 여부 취합·좌석·식수 예측 갱신", done: false, importance: 4, d_day_standard: 14, pct_range: [92, 96] },

    // 9. 예식 진행
    { id: 901, category: "9. 예식 진행", text: "예식 형식 결정 (주례 유무, 폐백 등)", done: false, importance: 4, d_day_standard: 45, pct_range: [83, 92] },
    { id: 902, category: "9. 예식 진행", text: "사회자 섭외", done: false, importance: 3, d_day_standard: 45, pct_range: [83, 92] },
    { id: 903, category: "9. 예식 진행", text: "축가·축사 섭외", done: false, importance: 3, d_day_standard: 45, pct_range: [83, 92] },
    { id: 904, category: "9. 예식 진행", text: "식순 구성 (입장, 서약, 선언, 인사)", done: false, importance: 4, d_day_standard: 30, pct_range: [88, 96] },
    { id: 905, category: "9. 예식 진행", text: "예식 음악 협의 (입장/퇴장/BGM)", done: false, importance: 2, d_day_standard: 30, pct_range: [88, 96] },
    { id: 906, category: "9. 예식 진행", text: "DVD·스냅 촬영 여부 결정 및 계약", done: false, importance: 3, d_day_standard: 30, pct_range: [83, 92] },
    { id: 907, category: "9. 예식 진행", text: "성장/식전/감사 영상 콘티 및 제작", done: false, importance: 2, d_day_standard: 7, pct_range: [88, 98] },
    { id: 908, category: "9. 예식 진행", text: "리허설 가능 여부 확인 및 일정 조율", done: false, importance: 2, d_day_standard: 7, pct_range: [96, 98] },

    // 10. 신혼여행
    { id: 1001, category: "10. 신혼여행", text: "여행 예산·지역·기간 결정", done: false, importance: 4, d_day_standard: 90, pct_range: [67, 75] },
    { id: 1002, category: "10. 신혼여행", text: "항공권·숙소 예약 (얼리버드)", done: false, importance: 5, d_day_standard: 60, pct_range: [67, 83] },
    { id: 1003, category: "10. 신혼여행", text: "여행자 보험 준비", done: false, importance: 2, d_day_standard: 30, pct_range: [83, 92] },
    { id: 1004, category: "10. 신혼여행", text: "여권·비자·접종 필요 여부 확인", done: false, importance: 4, d_day_standard: 30, pct_range: [83, 92] },
    { id: 1005, category: "10. 신혼여행", text: "환전 계획 수립", done: false, importance: 3, d_day_standard: 30, pct_range: [88, 98] },
    { id: 1006, category: "10. 신혼여행", text: "여행 일정표 구체화", done: false, importance: 3, d_day_standard: 7, pct_range: [88, 98] },
    { id: 1007, category: "10. 신혼여행", text: "준비물 체크리스트 작성 및 구매", done: false, importance: 2, d_day_standard: 7, pct_range: [88, 98] },

    // 11. 혼인신고·행정 절차
    { id: 1101, category: "11. 혼인신고·행정 절차", text: "혼인신고서 준비", done: false, importance: 3, d_day_standard: -7, pct_range: [88, 100] },
    { id: 1102, category: "11. 혼인신고·행정 절차", text: "신분증·증인 서명 준비", done: false, importance: 3, d_day_standard: -7, pct_range: [88, 100] },
    { id: 1103, category: "11. 혼인신고·행정 절차", text: "혼인신고 제출 (관할 구청 등)", done: false, importance: 4, d_day_standard: -7, pct_range: [88, 100] },
    { id: 1104, category: "11. 혼인신고·행정 절차", text: "가족관계등록부 반영 확인", done: false, importance: 2, d_day_standard: -14, pct_range: [92, 100] },
    { id: 1105, category: "11. 혼인신고·행정 절차", text: "정보 변경 (보험/인사/은행/카드)", done: false, importance: 3, d_day_standard: -14, pct_range: [92, 100] },
    { id: 1106, category: "11. 혼인신고·행정 절차", text: "주거 지원·대출·세제 혜택 확인", done: false, importance: 3, d_day_standard: -14, pct_range: [92, 100] },

    // 12. 건강·재무·생활 계획
    { id: 1201, category: "12. 건강·재무·생활 계획", text: "결혼 전 건강검진 여부 논의", done: false, importance: 3, d_day_standard: 90, pct_range: [34, 59] },
    { id: 1202, category: "12. 건강·재무·생활 계획", text: "건강 정보 공유", done: false, importance: 3, d_day_standard: 90, pct_range: [34, 59] },
    { id: 1203, category: "12. 건강·재무·생활 계획", text: "재무 정보 공유 (소득·부채·자산)", done: false, importance: 5, d_day_standard: 90, pct_range: [34, 59] },
    { id: 1204, category: "12. 건강·재무·생활 계획", text: "생활비 관리 방식 합의 (통장 관리)", done: false, importance: 5, d_day_standard: 90, pct_range: [34, 59] },
    { id: 1205, category: "12. 건강·재무·생활 계획", text: "가사 분담·가족 계획·육아 대화", done: false, importance: 4, d_day_standard: 60, pct_range: [50, 75] },
    { id: 1206, category: "12. 건강·재무·생활 계획", text: "출퇴근·생활권·장기 거주 계획 논의", done: false, importance: 4, d_day_standard: 60, pct_range: [50, 75] },

    // 13. 직전 마무리 구간
    { id: 1301, category: "13. 직전 마무리 구간", text: "예식장과 최종 인원·식단 확인", done: false, importance: 5, d_day_standard: 7, pct_range: [96, 98] },
    { id: 1302, category: "13. 직전 마무리 구간", text: "사회·축가·축사자 최종 타임라인 공유", done: false, importance: 4, d_day_standard: 7, pct_range: [96, 98] },
    { id: 1303, category: "13. 직전 마무리 구간", text: "혼주·가족 복장 최종 점검", done: false, importance: 3, d_day_standard: 7, pct_range: [96, 100] },
    { id: 1304, category: "13. 직전 마무리 구간", text: "드레스·예복·한복 착용 시간·동선 확인", done: false, importance: 5, d_day_standard: 1, pct_range: [96, 100] },
    { id: 1305, category: "13. 직전 마무리 구간", text: "예물·반지·부케·소품 모아두기", done: false, importance: 4, d_day_standard: 1, pct_range: [96, 100] },
    { id: 1306, category: "13. 직전 마무리 구간", text: "축의금함·방명록 등 예식장 물품 확인", done: false, importance: 3, d_day_standard: 1, pct_range: [96, 100] },
    { id: 1307, category: "13. 직전 마무리 구간", text: "신혼여행 짐 최종 점검", done: false, importance: 4, d_day_standard: 1, pct_range: [96, 100] },
    { id: 1308, category: "13. 직전 마무리 구간", text: "메이크업·헤어 시간 준수 (D-Day)", done: false, importance: 5, d_day_standard: 0, pct_range: [100, 100] },
    { id: 1309, category: "13. 직전 마무리 구간", text: "예식장 도착·리허설 진행 (D-Day)", done: false, importance: 5, d_day_standard: 0, pct_range: [100, 100] },
    { id: 1310, category: "13. 직전 마무리 구간", text: "축의·혼주 케어 담당자 지정 (D-Day)", done: false, importance: 4, d_day_standard: 0, pct_range: [100, 100] },
];
