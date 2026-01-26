import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FAQ.module.css";

interface FAQItem {
    questionKey: string;
    answerKey: string;
    categoryKey: string;
}

const FAQ_DATA: FAQItem[] = [
    // Eligibility
    { categoryKey: "eligibility", questionKey: "eligibility1", answerKey: "eligibility1Answer" },
    { categoryKey: "eligibility", questionKey: "eligibility2", answerKey: "eligibility2Answer" },
    { categoryKey: "eligibility", questionKey: "eligibility3", answerKey: "eligibility3Answer" },
    { categoryKey: "eligibility", questionKey: "eligibility4", answerKey: "eligibility4Answer" },
    // Applying
    { categoryKey: "applying", questionKey: "applying1", answerKey: "applying1Answer" },
    { categoryKey: "applying", questionKey: "applying2", answerKey: "applying2Answer" },
    { categoryKey: "applying", questionKey: "applying3", answerKey: "applying3Answer" },
    { categoryKey: "applying", questionKey: "applying4", answerKey: "applying4Answer" },
    // After Enrollment
    { categoryKey: "afterEnrollment", questionKey: "afterEnrollment1", answerKey: "afterEnrollment1Answer" },
    { categoryKey: "afterEnrollment", questionKey: "afterEnrollment2", answerKey: "afterEnrollment2Answer" },
    { categoryKey: "afterEnrollment", questionKey: "afterEnrollment3", answerKey: "afterEnrollment3Answer" },
    // Benefits
    { categoryKey: "benefits", questionKey: "benefits1", answerKey: "benefits1Answer" },
    { categoryKey: "benefits", questionKey: "benefits2", answerKey: "benefits2Answer" },
    { categoryKey: "benefits", questionKey: "benefits3", answerKey: "benefits3Answer" },
    // Managed Care
    { categoryKey: "managedCare", questionKey: "managedCare1", answerKey: "managedCare1Answer" },
    { categoryKey: "managedCare", questionKey: "managedCare2", answerKey: "managedCare2Answer" },
    { categoryKey: "managedCare", questionKey: "managedCare3", answerKey: "managedCare3Answer" },
    // Renewals
    { categoryKey: "renewals", questionKey: "renewals1", answerKey: "renewals1Answer" },
    { categoryKey: "renewals", questionKey: "renewals2", answerKey: "renewals2Answer" },
    { categoryKey: "renewals", questionKey: "renewals3", answerKey: "renewals3Answer" },
    // Changes & Help
    { categoryKey: "changesHelp", questionKey: "changesHelp1", answerKey: "changesHelp1Answer" },
    { categoryKey: "changesHelp", questionKey: "changesHelp2", answerKey: "changesHelp2Answer" },
    { categoryKey: "changesHelp", questionKey: "changesHelp3", answerKey: "changesHelp3Answer" },
    { categoryKey: "changesHelp", questionKey: "changesHelp4", answerKey: "changesHelp4Answer" },
    { categoryKey: "changesHelp", questionKey: "changesHelp5", answerKey: "changesHelp5Answer" }
];

const CATEGORY_KEYS = ["all", "eligibility", "applying", "afterEnrollment", "benefits", "managedCare", "renewals", "changesHelp"];

interface Props {
    onQuestionClick: (question: string) => void;
}

export const FAQ = ({ onQuestionClick }: Props) => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("all");
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const filteredFAQs = activeCategory === "all" ? FAQ_DATA : FAQ_DATA.filter(item => item.categoryKey === activeCategory);

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className={styles.faqContainer}>
            <h2 className={styles.faqTitle}>{t("faq.title")}</h2>

            <div className={styles.faqCategories}>
                {CATEGORY_KEYS.map(categoryKey => (
                    <button
                        key={categoryKey}
                        className={`${styles.categoryButton} ${activeCategory === categoryKey ? styles.categoryButtonActive : ""}`}
                        onClick={() => setActiveCategory(categoryKey)}
                    >
                        {t(`faq.categories.${categoryKey}`)}
                    </button>
                ))}
            </div>

            <div className={styles.faqList}>
                {filteredFAQs.map((item, index) => {
                    const globalIndex = FAQ_DATA.indexOf(item);
                    const isOpen = openItems.has(globalIndex);
                    const question = t(`faq.questions.${item.questionKey}`);
                    const answer = t(`faq.questions.${item.answerKey}`);

                    return (
                        <div key={globalIndex} className={styles.faqItem}>
                            <button className={styles.faqQuestion} onClick={() => toggleItem(globalIndex)}>
                                <span>{question}</span>
                                <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>▼</span>
                            </button>
                            {isOpen && (
                                <div className={styles.faqAnswer}>
                                    <p>{answer}</p>
                                    <button className={styles.askButton} onClick={() => onQuestionClick(question)}>
                                        {t("faq.askThisQuestion")}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
