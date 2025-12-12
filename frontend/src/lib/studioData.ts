export interface Studio {
    id: string;
    name: string;
    region: string;
    filterStyle: string; // CSS filter string
    description: string;
    location: string; // New field
    contact: string; // New field
}

export const REGIONS = ['서울', '경기', '제주', '부산', '대구', '광주'];

export const STUDIOS: Studio[] = [
    // --- SEOUL ---
    {
        id: 's001', name: '원규스튜디오 (노블레스/식스플로어)', region: '서울',
        filterStyle: 'sepia(0.2) contrast(1.1) brightness(1.05)',
        description: '다양한 배경과 하이엔드 퀄리티',
        location: '서울 강남구 삼성로 540 브로스빌딩', contact: '02-518-6232'
    },
    {
        id: 's002', name: '가을스튜디오 (시그니처)', region: '서울',
        filterStyle: 'contrast(1.15) saturate(1.1) brightness(1.0)',
        description: '시그니처 옥상씬과 풍부한 색감',
        location: '서울 송파구 백제고분로 435 예스빌딩', contact: '02-417-4322'
    },
    {
        id: 's003', name: '스튜디오 378', region: '서울',
        filterStyle: 'brightness(1.1) contrast(1.05)',
        description: '세련되고 모던한 인물 중심',
        location: '서울 강남구 도산대로 378', contact: '02-511-3780'
    },
    {
        id: 's004', name: '더브라이드', region: '서울',
        filterStyle: 'sepia(0.1) contrast(1.2) brightness(1.1)',
        description: '압도적인 스케일과 웅장한 배경',
        location: '서울 송파구 오금로 152', contact: '02-415-3222'
    },
    {
        id: 's005', name: '비포원스튜디오', region: '서울',
        filterStyle: 'grayscale(1) contrast(1.2) brightness(1.1)',
        description: '심플하고 모던한 흑백 사진의 미학',
        location: '서울 강남구 도산대로66길 26', contact: '02-545-1218'
    },
    {
        id: 's006', name: '마이퍼스트레이디', region: '서울',
        filterStyle: 'saturate(0.9) brightness(1.1)',
        description: '화사하고 로맨틱한 분위기',
        location: '서울 강남구 도산대로75길 19', contact: '02-511-2247'
    },
    {
        id: 's007', name: '어반스튜디오 (서울본점)', region: '서울',
        filterStyle: 'contrast(1.1) hue-rotate(-10deg)',
        description: '도시적인 세련미와 다양한 컨셉',
        location: '서울 강남구 언주로159길 3', contact: '02-547-3570'
    },
    {
        id: 's008', name: '스파지오스튜디오', region: '서울',
        filterStyle: 'sepia(0.4) contrast(0.9) brightness(1.1)',
        description: '따뜻한 감성과 자연스러운 연출',
        location: '서울 강남구 논현로136길 16', contact: '02-3442-5208'
    },
    {
        id: 's009', name: '라리씬세븐', region: '서울',
        filterStyle: 'saturate(1.2) contrast(1.05)',
        description: '자연광을 활용한 화사한 색감',
        location: '서울 강남구 도산대로 430', contact: '02-544-7232'
    },
    {
        id: 's010', name: '루체스튜디오', region: '서울',
        filterStyle: 'brightness(1.05) contrast(1.05) sepia(0.1)',
        description: '유러피안 감성의 우아함',
        location: '서울 강남구 도산대로 456', contact: '02-515-6800'
    },

    // --- GYEONGGI ---
    {
        id: 's011', name: '섬스튜디오', region: '경기',
        filterStyle: 'saturate(1.3) contrast(1.1)',
        description: '야외 정원과 자연스러운 채광',
        location: '경기 하남시 미사동로40번길 33-6', contact: '02-518-5654'
    },
    {
        id: 's012', name: '봉스튜디오', region: '경기',
        filterStyle: 'brightness(1.1) contrast(1.1)',
        description: '숲속 웨딩 같은 내추럴함',
        location: '경기 하남시 미사동로 100', contact: '02-3447-7355'
    },
    {
        id: 's013', name: '로이스튜디오 (하남점)', region: '경기',
        filterStyle: 'sepia(0.2) brightness(1.05)',
        description: '클래식과 트렌디의 조화',
        location: '경기 하남시 미사동로40번길 103', contact: '02-512-1941'
    },
    {
        id: 's014', name: '실버문스튜디오', region: '경기',
        filterStyle: 'contrast(0.9) brightness(1.15)',
        description: '몽환적이고 신비로운 분위기',
        location: '경기 남양주시 화도읍 북한강로 1493', contact: '031-591-2066'
    },
    {
        id: 's015', name: '메이빈스튜디오', region: '경기',
        filterStyle: 'saturate(1.1) brightness(1.1)',
        description: '밝고 깨끗한 이미지',
        location: '경기 하남시 미사동로40번길 176', contact: '02-516-7248'
    },
    {
        id: 's016', name: '황철승웨딩스튜디오', region: '경기',
        filterStyle: 'contrast(1.1) sepia(0.1)',
        description: '인물 중심의 깊이 있는 사진',
        location: '경기 의정부시 신흥로 251', contact: '031-879-7000'
    },
    {
        id: 's017', name: '가로수길옆이태원', region: '경기',
        filterStyle: 'hue-rotate(10deg) brightness(1.05)',
        description: '유니크하고 감각적인 스타일',
        location: '경기 수원시 팔달구 효원로307번길 51', contact: '031-233-3636'
    },
    {
        id: 's018', name: '더페이스 스튜디오 (수원)', region: '경기',
        filterStyle: 'grayscale(0.8) contrast(1.1)',
        description: '모던하고 심플한 매력',
        location: '경기 수원시 팔달구 인계로138번길 9', contact: '031-233-0203'
    },
    {
        id: 's019', name: '설레임밀키웨이', region: '경기',
        filterStyle: 'saturate(1.2) brightness(1.05)',
        description: '사랑스러운 파스텔 톤',
        location: '경기 광주시 오포읍 능평로 116-11', contact: '031-714-3677'
    },
    {
        id: 's020', name: '시아모스튜디오', region: '경기',
        filterStyle: 'sepia(0.15) contrast(1.05)',
        description: '편안하고 자연스러운 무드',
        location: '경기 파주시 탄현면 헤이리마을길 93-75', contact: '031-947-1941'
    },

    // --- JEJU ---
    {
        id: 's021', name: '슈퍼헬퍼 (본점)', region: '제주',
        filterStyle: 'saturate(1.4) contrast(1.1)',
        description: '제주의 쨍한 색감을 살린 스냅',
        location: '제주 제주시 서광로 112', contact: '064-747-3800'
    },
    {
        id: 's022', name: '아돌라스튜디오', region: '제주',
        filterStyle: 'brightness(1.1) hue-rotate(-5deg)',
        description: '감성적이고 부드러운 해변 스냅',
        location: '제주 제주시 중앙로 366', contact: '064-725-7200'
    },
    {
        id: 's023', name: '제주홀릭 (그림스냅)', region: '제주',
        filterStyle: 'contrast(1.1) saturate(1.2)',
        description: '동화 같은 제주 풍경',
        location: '제주 제주시 연삼로 15', contact: '010-2365-0103'
    },
    {
        id: 's024', name: '오랜스튜디오', region: '제주',
        filterStyle: 'sepia(0.2) contrast(0.9)',
        description: '빈티지한 필름 감성',
        location: '제주 제주시 아란5길 31-6', contact: '010-6607-3355'
    },
    {
        id: 's025', name: '다게르스튜디오', region: '제주',
        filterStyle: 'grayscale(0.2) contrast(1.1)',
        description: '흑백과 컬러의 조화',
        location: '제주 제주시 아연로 216-8', contact: '064-756-0079'
    },
    {
        id: 's026', name: '그리다스튜디오 (제주)', region: '제주',
        filterStyle: 'brightness(1.15) saturate(0.9)',
        description: '깨끗하고 맑은 인물 사진',
        location: '제주 제주시 한천로 37', contact: '064-743-4321'
    },
    {
        id: 's027', name: '고지형웨딩', region: '제주',
        filterStyle: 'contrast(1.1) brightness(1.05)',
        description: '세련된 토탈 웨딩 스타일링',
        location: '제주 제주시 남광로 118', contact: '064-712-0012'
    },
    {
        id: 's028', name: '유일용웨딩', region: '제주',
        filterStyle: 'saturate(1.1) hue-rotate(5deg)',
        description: '클래식한 제주의 멋',
        location: '제주 제주시 서광로 209', contact: '064-759-3331'
    },
    {
        id: 's029', name: '커맨드유', region: '제주',
        filterStyle: 'contrast(1.2) brightness(0.9)',
        description: '강렬하고 힙한 무드',
        location: '제주 제주시 신설로9길 55', contact: '010-4828-4420'
    },
    {
        id: 's030', name: '바이문', region: '제주',
        filterStyle: 'sepia(0.1) brightness(1.1)',
        description: '감각적인 디테일과 연출',
        location: '제주 제주시 연신로 196', contact: '010-2228-4228'
    },

    // --- BUSAN ---
    {
        id: 's031', name: '고스튜디오 (송정점)', region: '부산',
        filterStyle: 'saturate(1.2) hue-rotate(-10deg)',
        description: '송정 바다를 배경으로 한 오션뷰',
        location: '부산 해운대구 송정광어골로 59', contact: '051-701-0005'
    },
    {
        id: 's032', name: '어반스튜디오 (부산점)', region: '부산',
        filterStyle: 'contrast(1.1) brightness(1.05)',
        description: '부산만의 활기찬 에너지',
        location: '부산 해운대구 송정광어골로 29', contact: '051-704-3570'
    },
    {
        id: 's033', name: '달빛스쿠터 (부산점)', region: '부산',
        filterStyle: 'sepia(0.2) contrast(1.05)',
        description: '로맨틱하고 감성적인 색감',
        location: '부산 해운대구 송정광어골로 28', contact: '051-702-8801'
    },
    {
        id: 's034', name: '그사순 (부산)', region: '부산',
        filterStyle: 'grayscale(0.7) contrast(1.1)',
        description: '그가 사랑하는 순간, 감성 인물화',
        location: '부산 해운대구 송정광어골로 22', contact: '051-747-0105'
    },
    {
        id: 's035', name: '오브스튜디오', region: '부산',
        filterStyle: 'brightness(1.1) saturate(1.1)',
        description: '심플하고 깨끗한 화보 느낌',
        location: '부산 해운대구 송정광어골로 67', contact: '051-742-0679'
    },
    {
        id: 's036', name: '마이퍼스트레이디 (해운대)', region: '부산',
        filterStyle: 'contrast(1.05) hue-rotate(5deg)',
        description: '세련된 도시적 감성',
        location: '부산 해운대구 송정광어골로 74', contact: '051-701-3828'
    },
    {
        id: 's037', name: '비아스튜디오', region: '부산',
        filterStyle: 'saturate(0.9) brightness(1.1)',
        description: '내추럴하고 편안한 분위기',
        location: '부산 부산진구 자유평화로 11', contact: '051-632-1551'
    },
    {
        id: 's038', name: '원규스튜디오 (부산점)', region: '부산',
        filterStyle: 'sepia(0.3) contrast(1.2)',
        description: '클래식한 앤티크 감성',
        location: '부산 해운대구 송정광어골로 56', contact: '051-747-9201'
    },
    {
        id: 's039', name: '소울브라우즈 (부산)', region: '부산',
        filterStyle: 'contrast(1.15) brightness(0.95)',
        description: '깊이감 있는 톤과 무드',
        location: '부산 부산진구 자유평화로 11 3층', contact: '051-635-1551'
    },
    {
        id: 's040', name: '블랑드윈느', region: '부산',
        filterStyle: 'brightness(1.2) contrast(0.95)',
        description: '꿈꾸는 듯한 몽환적인 화이트 톤',
        location: '부산 해운대구 송정광어골로 64', contact: '051-702-0036'
    },

    // --- DAEGU ---
    {
        id: 's041', name: '비비엔다스튜디오 (대구)', region: '대구',
        filterStyle: 'contrast(1.1) saturate(0.9)',
        description: '모던하고 시크한 인물 중심',
        location: '대구 중구 동덕로 36-15', contact: '053-426-5353'
    },
    {
        id: 's042', name: '페레스튜디오 (대구점)', region: '대구',
        filterStyle: 'sepia(0.1) brightness(1.1)',
        description: '사랑스럽고 따뜻한 감성',
        location: '대구 중구 명륜로23길 98', contact: '053-421-2666'
    },
    {
        id: 's043', name: '그가사랑하는순간 (대구)', region: '대구',
        filterStyle: 'grayscale(0.6) contrast(1.1)',
        description: '순간을 포착하는 자연스러움',
        location: '대구 중구 동덕로 26', contact: '053-423-7771'
    },
    {
        id: 's044', name: '메이든스튜디오 (대구점)', region: '대구',
        filterStyle: 'brightness(1.05) contrast(1.05)',
        description: '심플함 속에 담긴 특별함',
        location: '대구 중구 동덕로 64', contact: '053-421-1277'
    },
    {
        id: 's045', name: '이동진스튜디오 (대봉점)', region: '대구',
        filterStyle: 'saturate(1.2) contrast(1.1)',
        description: '대구 웨딩의 전통과 퀄리티',
        location: '대구 중구 동덕로 106-7', contact: '053-425-3789'
    },
    {
        id: 's046', name: '노마하우스', region: '대구',
        filterStyle: 'brightness(1.1) hue-rotate(5deg)',
        description: '감각적이고 트렌디한 하우스 웨딩',
        location: '대구 중구 명륜로23길 56', contact: '053-255-8777'
    },
    {
        id: 's047', name: '어반스튜디오 (대구점)', region: '대구',
        filterStyle: 'contrast(1.15) brightness(1.0)',
        description: '도시적인 세련미',
        location: '대구 중구 동덕로 8길 40', contact: '053-421-2244'
    },
    {
        id: 's048', name: '아우라스튜디오 (대구)', region: '대구',
        filterStyle: 'sepia(0.3) contrast(1.2)',
        description: '클래식하고 웅장한 아우라',
        location: '대구 중구 동덕로 40', contact: '053-422-5553'
    },
    {
        id: 's049', name: '테라스스튜디오 (대구)', region: '대구',
        filterStyle: 'saturate(1.1) brightness(1.1)',
        description: '자연광이 예쁜 테라스 씬',
        location: '대구 중구 동덕로8길 34', contact: '053-424-3323'
    },
    {
        id: 's050', name: '소나르스튜디오', region: '대구',
        filterStyle: 'grayscale(0.9) contrast(1.3)',
        description: '예술적인 흑백 사진의 깊이',
        location: '대구 중구 동덕로 12', contact: '053-423-5353'
    },

    // --- GWANGJU ---
    {
        id: 's051', name: '더써드마인드 (광주)', region: '광주',
        filterStyle: 'contrast(1.2) brightness(0.9)',
        description: '예술적이고 드라마틱한 연출',
        location: '광주 동구 천변우로 405-5', contact: '062-232-3535'
    },
    {
        id: 's052', name: '원규스튜디오 (광주점)', region: '광주',
        filterStyle: 'sepia(0.2) contrast(1.1)',
        description: '앤티크한 배경의 클래식함',
        location: '광주 동구 서석로 24', contact: '062-225-2253'
    },
    {
        id: 's053', name: '마이퍼스트레이디 (광주)', region: '광주',
        filterStyle: 'saturate(1.1) brightness(1.05)',
        description: '화사하고 밝은 웨딩 화보',
        location: '광주 동구 천변우로 413', contact: '062-226-2226'
    },
    {
        id: 's054', name: '줄리의정원 (광주)', region: '광주',
        filterStyle: 'saturate(1.3) contrast(1.0)',
        description: '꽃과 함께하는 가든 웨딩',
        location: '광주 동구 천변우로 409', contact: '062-227-2272'
    },
    {
        id: 's055', name: '오브라픽쳐스 (광주)', region: '광주',
        filterStyle: 'brightness(1.1) contrast(1.05)',
        description: '감성적이고 따뜻한 시선',
        location: '광주 남구 천변좌로338번길 16', contact: '062-672-0101'
    },
    {
        id: 's056', name: '동감스튜디오 (광주)', region: '광주',
        filterStyle: 'sepia(0.1) contrast(1.1)',
        description: '편안하고 자연스러운 미소',
        location: '광주 동구 서석로 14', contact: '062-223-0808'
    },
    {
        id: 's057', name: '603스튜디오', region: '광주',
        filterStyle: 'grayscale(0.5) contrast(1.2)',
        description: '모던하고 심플한 인물 중심',
        location: '광주 동구 서석로 24 (원규 건물 內)', contact: '062-225-2253'
    },
    {
        id: 's058', name: '루미에르', region: '광주',
        filterStyle: 'brightness(1.1) hue-rotate(-5deg)',
        description: '빛을 활용한 감성 사진',
        location: '광주 남구 양림로 78', contact: '062-655-2255'
    },
    {
        id: 's059', name: '설레임 (광주점)', region: '광주',
        filterStyle: 'saturate(1.2) brightness(1.1)',
        description: '설레는 순간을 담은 색감',
        location: '광주 동구 서석로 20', contact: '062-222-2228'
    },
    {
        id: 's060', name: '메이든스튜디오 (광주)', region: '광주',
        filterStyle: 'contrast(1.05) brightness(1.05)',
        description: '심플함이 주는 고급스러움',
        location: '광주 동구 천변우로 415', contact: '062-228-2280'
    }
];
