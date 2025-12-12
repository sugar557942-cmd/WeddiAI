export interface Product {
    id: string;
    name: string;
    type: 'dress' | 'hanbok' | 'filter';
    price: number;
    promo?: string; // New field for badges
    images: {
        front: string;
        side: string;
        back: string;
    };
    model3d_url?: string;
    vendor_info: {
        name: string;
        location: string;
        contact: string;
    };
    description?: string;
    details?: {
        material: string;
        fit: string;
        style: string;
        point: string;
    };
}

export const PRODUCTS: Product[] = [
    // --- WEDDING DRESSES (10 Items) ---
    {
        id: 'd001', name: '로얄 머메이드 레이스', type: 'dress', price: 3500000, promo: 'BEST',
        images: { front: '/images/dress_01_mermaid.png', side: '/images/dress_01_mermaid_side.png', back: '/images/dress_01_mermaid_back.png' },
        vendor_info: { name: '청담 마리에', location: '서울 강남구 청담동 123-45 마리에빌딩 2층', contact: '02-555-0001' },
        description: '우아한 곡선미를 강조하는 머메이드 라인과 섬세한 레이스 디테일이 돋보이는 드레스입니다.',
        details: { material: '프렌치 레이스, 튤', fit: '머메이드', style: '럭셔리, 엘레강스', point: '롱 슬리브, 시스루 백' }
    },
    {
        id: 'd002', name: '그랜드 새틴 볼가운', type: 'dress', price: 4200000,
        images: { front: '/images/dress_02_ballgown.png', side: '/images/dress_02_ballgown_side.png', back: '/images/dress_02_ballgown_back.png' },
        vendor_info: { name: '루체 스튜디오', location: '서울 강남구 도산대로 456 루체타워 5층', contact: '02-555-0002' },
        description: '고급스러운 광택의 미카도 실크를 사용하여 압도적인 볼륨감과 클래식함을 선사합니다.',
        details: { material: '미카도 실크', fit: '볼가운 (벨라인)', style: '클래식, 로얄', point: '오프숄더, 긴 트레인' }
    },
    {
        id: 'd003', name: '보헤미안 쉬폰 드레스', type: 'dress', price: 1800000, promo: 'NEW',
        images: { front: '/images/dress_03_boho.png', side: '/images/dress_03_boho_side.png', back: '/images/dress_03_boho_back.png' },
        vendor_info: { name: '제주 웨딩', location: '제주특별자치도 제주시 애월읍 애월해안로 789', contact: '064-555-0003' },
        description: '가벼운 쉬폰 소재로 야외 웨딩이나 스몰 웨딩에 적합한 자연스럽고 로맨틱한 무드의 드레스입니다.',
        details: { material: '실크 쉬폰', fit: 'A라인', style: '보헤미안, 네추럴', point: '플라워 자수, 케이프 소매' }
    },
    {
        id: 'd004', name: '미니멀 실크 슬립', type: 'dress', price: 1500000,
        images: { front: '/images/dress_04_minimal.png', side: '/images/dress_04_minimal_side.png', back: '/images/dress_04_minimal_back.png' },
        vendor_info: { name: '모던 브라이드', location: '서울 성동구 아차산로 17 모던빌딩 1층', contact: '02-555-0004' },
        description: '군더더기 없는 깔끔한 디자인으로 신부 본연의 아름다움을 돋보이게 하는 도회적인 드레스입니다.',
        details: { material: '도비 실크', fit: '슬림 A라인', style: '미니멀, 모던', point: '딥 V넥, 슬릿' }
    },
    {
        id: 'd005', name: '클래식 로얄 하이넥', type: 'dress', price: 5500000, promo: 'PREMIUM',
        images: { front: '/images/dress_05_royal.png', side: '/images/dress_05_royal_side.png', back: '/images/dress_05_royal_back.png' },
        vendor_info: { name: '더 퀸', location: '서울 강남구 압구정로 34길 11 퀸즈테라스 3층', contact: '02-555-0005' },
        description: '하이넥 디자인과 긴 소매로 단아하고 성스러운 분위기를 연출하는 클래식 드레스의 정석입니다.',
        details: { material: '오간자 실크, 레이스', fit: 'A라인', style: '클래식, 채플', point: '하이넥, 버튼 장식' }
    },
    {
        id: 'd006', name: '오프숄더 튤 드레스', type: 'dress', price: 2800000,
        images: { front: '/images/dress_06_offshoulder.png', side: '/images/dress_06_offshoulder_side.png', back: '/images/dress_06_offshoulder_back.png' },
        vendor_info: { name: '프림 로즈', location: '서울 강남구 논현로 123 로즈빌딩 4층', contact: '02-555-0006' },
        description: '풍성한 튤 소재 스커트와 여리여리한 오프숄더가 만나 동화 속 공주님 같은 분위기를 자아냅니다.',
        details: { material: '이탈리아 튤', fit: '벨라인', style: '러블리, 로맨틱', point: '하트 탑, 글리터' }
    },
    {
        id: 'd007', name: '빈티지 레이스 A라인', type: 'dress', price: 2200000,
        images: { front: '/images/dress_07_vintage.png', side: '/images/dress_07_vintage_side.png', back: '/images/dress_07_vintage_back.png' },
        vendor_info: { name: '빈티지 웨딩', location: '서울 마포구 동교로 234 빈티지하우스 1층', contact: '02-555-0007' },
        description: '세월이 흘러도 변치 않는 아름다움을 지닌, 독특한 패턴의 레이스가 특징인 빈티지 무드 드레스입니다.',
        details: { material: '케미컬 레이스', fit: 'A라인', style: '빈티지, 유니크', point: '스퀘어 넥, 캡 소매' }
    },
    {
        id: 'd008', name: '럭셔리 비즈 엠파이어', type: 'dress', price: 6000000, promo: 'LUXURY',
        images: { front: '/images/dress_08_beads.png', side: '/images/dress_08_beads_side.png', back: '/images/dress_08_beads_back.png' },
        vendor_info: { name: '엔젤 스포사', location: '서울 강남구 선릉로 890 엔젤타워 7층', contact: '02-555-0008' },
        description: '드레스 전체를 수놓은 화려한 스와로브스키 비즈가 조명을 받아 눈부시게 빛나는 하이엔드 드레스.',
        details: { material: '비즈, 튤', fit: '엠파이어', style: '화려함, 럭셔리', point: '풀 비딩, 시스루' }
    },
    {
        id: 'd009', name: '시스루 롱슬리브', type: 'dress', price: 3100000,
        images: { front: '/images/dress_09_longsleeve.png', side: '/images/dress_09_longsleeve_side.png', back: '/images/dress_09_longsleeve_back.png' },
        vendor_info: { name: '블랑 드 블랑', location: '서울 강남구 도산대로 55길 22 블랑빌딩 2층', contact: '02-555-0009' },
        description: '과감하면서도 세련된 시스루 소재를 사용하여 매혹적인 분위기를 연출하는 드레스입니다.',
        details: { material: '레이스, 망사', fit: '머메이드', style: '시크, 섹시', point: '일루전 네크라인' }
    },
    {
        id: 'd010', name: '도비 실크 머메이드', type: 'dress', price: 2900000,
        images: { front: '/images/dress_10_silk.png', side: '/images/dress_10_silk_side.png', back: '/images/dress_10_silk_back.png' },
        vendor_info: { name: '심플리 웨딩', location: '서울 용산구 이태원로 45길 12 심플리하우스 1층', contact: '02-555-0010' },
        description: '몸매를 따라 흐르는 도비 실크의 부드러운 질감이 우아하고 성숙한 이미지를 완성합니다.',
        details: { material: '도비 실크', fit: '머메이드', style: '우아함, 심플', point: '주름 디테일(드레이핑)' }
    },

    // --- HANBOKS (10 Items) ---
    {
        id: 'h001', name: '파스텔 핑크 당의', type: 'hanbok', price: 850000, promo: 'POPULAR',
        images: { front: '/images/hanbok_01_pastel.png', side: '/images/hanbok_01_pastel_side.png', back: '/images/hanbok_01_pastel_back.png' },
        vendor_info: { name: '예인 한복', location: '서울 종로구 인사동길 34 예인빌딩 1층', contact: '02-777-0001' },
        description: '은은한 파스텔 톤의 핑크색 당의가 사랑스럽고 화사한 신부의 이미지를 만들어줍니다.',
        details: { material: '본견 실크', fit: '전통 당의', style: '화사함, 큐트', point: '금박 장식, 파스텔 톤' }
    },
    {
        id: 'h002', name: '순백의 금박 대례복', type: 'hanbok', price: 1500000, promo: 'ROYAL',
        images: { front: '/images/hanbok_02_royal.png', side: '/images/hanbok_02_royal_side.png', back: '/images/hanbok_02_royal_back.png' },
        vendor_info: { name: '궁중 한복', location: '서울 종로구 북촌로 5나길 32 한옥마을 내', contact: '02-777-0002' },
        description: '궁중 예복인 대례복을 재해석하여, 순백색 원단에 금박을 입혀 고귀하고 기품 있는 분위기를 냅니다.',
        details: { material: '명주, 금박', fit: '대례복 (활옷 스타일)', style: '웅장함, 전통적', point: '전체 금박 자수' }
    },
    {
        id: 'h003', name: '모던 시스루 퓨전', type: 'hanbok', price: 650000, promo: 'TREND',
        images: { front: '/images/hanbok_03_modern.png', side: '/images/hanbok_03_modern_side.png', back: '/images/hanbok_03_modern_back.png' },
        vendor_info: { name: '모던 한', location: '서울 종로구 삼청로 111 모던빌딩 2층', contact: '02-777-0003' },
        description: '전통 한복의 미에 현대적인 감각을 더한 퓨전 한복으로, 시스루 소재 저고리가 트렌디합니다.',
        details: { material: '오간자, 린넨', fit: '슬림핏', style: '모던, 트렌디', point: '시스루 저고리' }
    },
    {
        id: 'h004', name: '강렬한 대비 명주', type: 'hanbok', price: 950000,
        images: { front: '/images/hanbok_04_vivid.png', side: '/images/hanbok_04_vivid_side.png', back: '/images/hanbok_04_vivid_back.png' },
        vendor_info: { name: '전통의 미', location: '서울 종로구 창덕궁1길 45 전통문화관 1층', contact: '02-777-0004' },
        description: '짙은 네이비와 붉은색의 강렬한 색상 대비가 인상적인, 전통적인 멋이 살아있는 명주 한복입니다.',
        details: { material: '최고급 명주', fit: '전통 평면 재단', style: '강렬함, 고전적', point: '색동 소매, 고름' }
    },
    {
        id: 'h005', name: '크림 베이지 린넨', type: 'hanbok', price: 780000, promo: 'NATURAL',
        images: { front: '/images/hanbok_05_cream.png', side: '/images/hanbok_05_cream_side.png', back: '/images/hanbok_05_cream_back.png' },
        vendor_info: { name: '자연주의 한복', location: '경기도 과천시 중앙로 234 자연빌딩 1층', contact: '02-777-0005' },
        description: '염색하지 않은 천연 린넨 소재의 자연스러운 색감이 편안하고 단아한 분위기를 줍니다.',
        details: { material: '천연 린넨', fit: '네추럴 핏', style: '단아함, 소박함', point: '천연 염색 느낌' }
    },
    {
        id: 'h006', name: '옥색 저고리', type: 'hanbok', price: 700000,
        images: { front: '/images/hanbok_06_jade.png', side: '/images/hanbok_06_jade_side.png', back: '/images/hanbok_06_jade_back.png' },
        vendor_info: { name: '고운 날', location: '서울 종로구 삼청로 65 고운빌딩 1층', contact: '02-777-0006' },
        description: '청량한 옥색 저고리와 짙은 치마의 조화가 세련되고 지적인 이미지를 연출합니다.',
        details: { material: '옥사', fit: '전통 핏', style: '세련됨, 지적임', point: '옥색 색감' }
    },
    {
        id: 'h007', name: '레이스 저고리 퓨전', type: 'hanbok', price: 880000,
        images: { front: '/images/hanbok_07_lace.png', side: '/images/hanbok_07_lace_side.png', back: '/images/hanbok_07_lace_back.png' },
        vendor_info: { name: '소녀 감성', location: '서울 마포구 와우산로 123 홍대빌딩 2층', contact: '02-777-0007' },
        description: '저고리 전체에 레이스 원단을 사용하여 웨딩 드레스 같은 느낌을 주는 퓨전 한복입니다.',
        details: { material: '레이스, 실크', fit: '슬림핏', style: '로맨틱, 퓨전', point: '레이스 텍스처' }
    },
    {
        id: 'h008', name: '검정 곤룡포 스타일', type: 'hanbok', price: 1200000,
        images: { front: '/images/hanbok_08_black.png', side: '/images/hanbok_08_black_side.png', back: '/images/hanbok_08_black_back.png' },
        vendor_info: { name: '왕실 의상', location: '서울 종로구 효자로 12 경복궁역 3번출구', contact: '02-777-0008' },
        description: '왕의 집무복인 곤룡포를 현대적으로 재해석하여 블랙 컬러로 카리스마 있게 디자인했습니다.',
        details: { material: '양단', fit: '오버핏', style: '카리스마, 유니크', point: '용보 자수' }
    },
    {
        id: 'h009', name: '황금빛 갈래 치마', type: 'hanbok', price: 1100000,
        images: { front: '/images/hanbok_09_gold_skirt.png', side: '/images/hanbok_09_gold_skirt_side.png', back: '/images/hanbok_09_gold_skirt_back.png' },
        vendor_info: { name: '금빛 바늘', location: '서울 강남구 청담동 88-1 금빛빌딩 3층', contact: '02-777-0009' },
        description: '치마 자락이 여러 갈래로 갈라져 걸을 때마다 황금빛 춤을 추는 듯한 화려한 갈래 치마입니다.',
        details: { material: '금사 혼방 명주', fit: '풍성한 핏', style: '화려함, 무용복 스타일', point: '갈래 치마' }
    },
    {
        id: 'h010', name: '수묵화 프린팅', type: 'hanbok', price: 920000,
        images: { front: '/images/hanbok_10_ink.png', side: '/images/hanbok_10_ink_side.png', back: '/images/hanbok_10_ink_back.png' },
        vendor_info: { name: '예술 한복', location: '서울 종로구 인사동14길 10 갤러리 1층', contact: '02-777-0010' },
        description: '치마 폭에 한 폭의 수묵화를 그려 넣은 듯한 프린팅이 돋보이는 예술적인 한복입니다.',
        details: { material: '실크 프린트', fit: 'A라인', style: '예술적, 독창적', point: '수묵화 패턴' }
    }
];
