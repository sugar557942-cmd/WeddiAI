import styles from "./HorizontalFeatureSection.module.css";

type Props = {
    title: string;
    description: string[];
    imageUrl: string;
    imagePosition?: "left" | "right";
};

export function HorizontalFeatureSection({
    title,
    description,
    imageUrl,
    imagePosition = "left",
}: Props) {
    const positionClass =
        imagePosition === "left"
            ? styles.imageLeft
            : styles.imageRight;

    return (
        <section
            className={`${styles.section} ${positionClass}`}
            style={{
                backgroundImage: `linear-gradient(var(--feature-gradient)), url(${imageUrl})`
            } as React.CSSProperties}
        >
            <div className={styles.content}>
                <div className={styles.textBox}>
                    <h2 className={styles.title}>{title}</h2>
                    {description.map((line, index) => (
                        <p key={index} className={styles.desc}>
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
