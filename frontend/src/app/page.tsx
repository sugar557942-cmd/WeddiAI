"use client";


import Link from "next/link";
import { HorizontalFeatureSection } from "@/components/HorizontalFeatureSection";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            {/* 1. Hero Section - Immersive Start */}
            <section className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>WeddiAI</h1>
                    <p className={styles.heroSubtitle}>
                        결혼 준비의 새로운 기준,<br />
                        인공지능으로 경험하는 완벽한 웨딩
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/products" className={styles.ctaPrimary}>
                            컬렉션 둘러보기
                        </Link>
                    </div>
                </div>
                <div className={styles.scrollIndicator}>
                    <span>Scroll Down</span>
                    <div className={styles.arrowDown}></div>
                </div>
            </section>

            {/* 1. Service Value - 3 Icon Summary */}
            <section className={styles.valueSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>AI로 미리 경험하는 당신만의 웨딩</h2>
                    </div>
                    <div className={styles.valueGrid}>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2C8 2 8 6 8 6L5 21H19L16 6C16 6 16 2 12 2Z" />
                                    <path d="M12 6L9 21" />
                                    <path d="M12 6L15 21" />
                                </svg>
                            </div>
                            <h3>AI 가상 피팅</h3>
                            <p>내 사진 한 장으로 드레스·한복을<br />미리 입어보세요.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8L16 12L12 16" />
                                    <path d="M8 12H16" />
                                </svg>
                            </div>
                            <h3>스튜디오 감성 필터</h3>
                            <p>서울 주요 웨딩스튜디오의<br />보정 스타일을 그대로 적용해보세요.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                                    <path d="M2 17L12 22L22 17" />
                                    <path d="M2 12L12 17L22 12" />
                                </svg>
                            </div>
                            <h3>3D 드레스 보기</h3>
                            <p>드레스의 실루엣을 360°로 돌려보고<br />디테일까지 확인할 수 있어요.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Market Needs */}
            <section className={styles.marketSection}>
                <div className={styles.container}>
                    <span className={styles.sectionLabel}>WHY NOW?</span>
                    <h2 className={styles.sectionTitle}>웨딩 준비, 왜 이제는<br />'디지털 체험'이 필요할까요?</h2>

                    <div className={styles.marketGrid}>
                        <div className={styles.marketItem}>
                            <h3>웨딩 시장의 회복과 성장</h3>
                            <p>최근 한국의 결혼 건수는 11개월 연속 증가하며, 웨딩 촬영·드레스 매출이 모두 확대되고 있습니다.</p>
                        </div>
                        <div className={styles.marketItem}>
                            <h3>비주얼 중심의 선택</h3>
                            <p>촬영 중심의 웨딩 트렌드로 인해, 나에게 맞는 사진 톤과 스타일을 미리 비교하려는 수요가 폭발적입니다.</p>
                        </div>
                        <div className={styles.marketItem}>
                            <h3>스마트한 MZ 세대의 방식</h3>
                            <p>직접 발품 파는 피로감 대신, 디지털로 미리 체험하고 확신을 가진 후 방문하는 효율적인 준비를 선호합니다.</p>
                        </div>
                    </div>

                    <div className={styles.patentBox}>
                        <h4>기존 웨딩 준비의 어려움</h4>
                        <p>
                            “내가 입으면 어떤 느낌일까?”<br />
                            비싼 피팅비와 고된 발품, 막막한 결정...<br />
                            <br />
                            <strong>WeddiAI</strong>는 이 모든 고민을 해결하기 위해 탄생했습니다.<br />
                            드레스, 한복, 필터, 3D까지— 촬영 전에 <strong>‘먼저 경험하고 결정’</strong>하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Solution Summary */}
            <section className={styles.solutionSection}>
                <div className={styles.heroOverlay} style={{ opacity: 0.7 }}></div>
                <div className={styles.solutionContent}>
                    <h2>AI가 먼저 입어보고,<br />당신은 결정만 하세요.</h2>
                    <ul className={styles.solutionList}>
                        <li>내 사진으로 드레스·한복 후보를 빠르게 비교</li>
                        <li>스튜디오 감성 필터로 촬영 콘셉트 선택 용이</li>
                        <li>정면·측면·후면 기반 3D 실루엣 자동 생성</li>
                        <li>파트너·지인과 공유하여 의견 수렴 가능</li>
                    </ul>
                </div>
            </section>

            {/* 4. Main Modules */}
            {/* 4. Main Modules - Validated Modules (3D View Removed) */}
            <HorizontalFeatureSection
                title="드레스·한복 가상 피팅"
                description={[
                    "100여 종의 드레스·한복을 내 사진에 즉시 합성",
                    "정면/측면/후면 비교 기능 제공",
                    "포즈와 조명에 자연스럽게 맞춘 결과"
                ]}
                imageUrl="/images/wide_fitting_bg.png"
                imagePosition="left"
            />

            <HorizontalFeatureSection
                title="스튜디오 감성 필터"
                description={[
                    "실제 웨딩 스튜디오의 보정 톤을 그대로 재현",
                    "화이트/빈티지/내추럴/흑백 등 다양한 스타일",
                    "커플사진, 셀프사진 모두 적용 가능"
                ]}
                imageUrl="/images/wide_filter_bg.png"
                imagePosition="right"
            />

            {/* 5. Target Audience */}
            <section className={styles.targetSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleCenter}>누구에게 필요한 서비스인가요?</h2>
                    <div className={styles.targetGrid}>
                        <div className={styles.targetCard}>
                            <div className={styles.targetHeader}>For Couples</div>
                            <h3>예비부부</h3>
                            <ul>
                                <li>시간과 비용을 획기적으로 절약</li>
                                <li>피팅 방문 전 후보 압축으로 실패 최소화</li>
                                <li>원하는 감성 톤 미리 탐색 및 결정</li>
                                <li>여러 스타일을 한 번에 비교 가능</li>
                            </ul>
                        </div>
                        <div className={styles.targetCard}>
                            <div className={styles.targetHeader} style={{ background: '#444' }}>For Business</div>
                            <h3>웨딩샵 & 스튜디오</h3>
                            <ul>
                                <li>AI 시각자료로 상담 설득력 강화</li>
                                <li>고객 만족도 및 계약 전환율 증가</li>
                                <li>전용 필터 및 카탈로그 제공 가능</li>
                                <li>온라인 상담 시 즉시 활용 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Process Flow (4 Steps) */}
            <section className={styles.flowSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleCenter}>이용 방법은 간단합니다</h2>
                    <div className={styles.flowSteps}>
                        <div className={styles.flowStep}>
                            <span className={styles.flowNum}>1</span>
                            <h4>사진 업로드</h4>
                        </div>
                        <div className={styles.flowLine}></div>
                        <div className={styles.flowStep}>
                            <span className={styles.flowNum}>2</span>
                            <h4>드레스/한복 선택</h4>
                        </div>
                        <div className={styles.flowLine}></div>
                        <div className={styles.flowStep}>
                            <span className={styles.flowNum}>3</span>
                            <h4>AI 시뮬레이션</h4>
                        </div>
                        <div className={styles.flowLine}></div>
                        <div className={styles.flowStep}>
                            <span className={styles.flowNum}>4</span>
                            <h4>결과 저장/상담</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Tech Reliability */}
            <section className={styles.techSection}>
                <div className={styles.container}>
                    <h2>최신 AI 기술로 구현되는 웨딩 시뮬레이션</h2>
                    <div className={styles.techBadges}>
                        <span>Google Gemini 기반 합성</span>
                        <span>3D 재구성 파이프라인</span>
                        <span>고급 필터 렌더링 엔진</span>
                        <span>개인정보 암호화</span>
                        <span>반응형 웹 지원</span>
                    </div>
                </div>
            </section>

            {/* 8. User Reviews */}
            <section className={styles.reviewSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleCenter}>먼저 사용해본 사람들의 이야기</h2>
                    <div className={styles.reviewGrid}>
                        <div className={styles.reviewCard}>
                            <p className={styles.reviewText}>"피팅 전에 후보군을 좁힐 수 있어 부담이 확실히 줄었어요. 어떤 스타일이 어울리는지 미리 아니까 샵에서도 편했습니다."</p>
                            <span className={styles.reviewAuthor}>예비신부 김**님</span>
                        </div>
                        <div className={styles.reviewCard}>
                            <p className={styles.reviewText}>"스튜디오마다 색감이 다른데, 우리 사진에 직접 적용해보니 어디가 맞는지 바로 알겠더라고요. 결정 장애 해결!"</p>
                            <span className={styles.reviewAuthor}>예비신랑 이**님</span>
                        </div>
                        <div className={styles.reviewCard}>
                            <p className={styles.reviewText}>"지방에 계신 부모님께 한복 입은 모습을 미리 보여드릴 수 있어서 좋았어요. 가족들과 공유하기 딱 좋아요."</p>
                            <span className={styles.reviewAuthor}>예비신부 박**님</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Pricing / Plans */}
            <section className={styles.pricingSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitleCenter}>이용 및 도입 안내</h2>
                    <div className={styles.pricingGrid}>
                        <div className={styles.priceCard}>
                            <h3>개인 체험</h3>
                            <div className={styles.priceValue}>Free / Basic</div>
                            <p>AI 피팅 및 필터 체험<br />결과물 다운로드</p>
                            <Link href="/products" className={styles.priceBtn}>바로 체험하기</Link>
                        </div>
                        <div className={styles.priceCard}>
                            <h3>스튜디오 베이직</h3>
                            <div className={styles.priceValue}>Partner</div>
                            <p>상담용 태블릿 모드<br />고객 관리 대시보드</p>
                            <button className={styles.priceBtnSecondary}>도입 문의</button>
                        </div>
                        <div className={styles.priceCard}>
                            <h3>엔터프라이즈</h3>
                            <div className={styles.priceValue}>Custom</div>
                            <p>화이트라벨 지원<br />자체 데이터 학습</p>
                            <button className={styles.priceBtnSecondary}>상담 신청</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Final CTA */}
            <section className={styles.finalCtaSection}>
                <h2>지금, 당신의 웨딩을 미리 경험해보세요.</h2>
                <div className={styles.finalButtons}>
                    <Link href="/products" className={styles.finalBtnPrimary}>AI 웨딩 시뮬레이션 시작하기</Link>
                    <button className={styles.finalBtnSecondary}>스튜디오 도입 문의</button>
                </div>
            </section>
        </main>
    );
}

