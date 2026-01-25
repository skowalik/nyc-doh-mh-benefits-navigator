import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ_DATA: FAQItem[] = [
    // Eligibility
    {
        category: "Eligibility",
        question: "Who is eligible for Medicaid in New York City?",
        answer: "Medicaid is available to NYC residents who meet income and household size requirements. Eligibility depends on income, family size, age, disability status, pregnancy, and immigration status."
    },
    {
        category: "Eligibility",
        question: "Can undocumented immigrants get Medicaid?",
        answer: "Some undocumented New Yorkers may qualify for Emergency Medicaid, Medicaid for Pregnant People, or the Essential Plan (age 19–64). New York also offers Medicaid for adults age 65+ regardless of immigration status."
    },
    {
        category: "Eligibility",
        question: "Does having a job disqualify me from Medicaid?",
        answer: "No. Many working individuals and families qualify if their income is below program limits."
    },
    {
        category: "Eligibility",
        question: "Can my children be on Medicaid even if I am not eligible?",
        answer: "Yes. Children often qualify at higher income levels than adults."
    },
    // Applying
    {
        category: "Applying",
        question: "How do I apply for Medicaid in NYC?",
        answer: "You can apply online at NY State of Health or ACCESS HRA, by phone, by mail, or with help from a certified enrollment counselor."
    },
    {
        category: "Applying",
        question: "What documents do I need to apply?",
        answer: "Typically: proof of identity, income (pay stubs, tax return), household information, Social Security number (if available), and immigration documents (if applicable)."
    },
    {
        category: "Applying",
        question: "Can I apply year-round?",
        answer: "Yes. Medicaid enrollment is open all year."
    },
    {
        category: "Applying",
        question: "How long does it take to get approved?",
        answer: "Most applications are processed within 30–45 days. Pregnant people and urgent cases may be faster."
    },
    // After Enrollment
    {
        category: "After Enrollment",
        question: "When does my coverage start?",
        answer: "Coverage usually begins the first day of the month you applied."
    },
    {
        category: "After Enrollment",
        question: "Will I get a Medicaid card?",
        answer: "Yes. You will receive a NYS Medicaid card and information about your health plan."
    },
    {
        category: "After Enrollment",
        question: "What if I never received my Medicaid card?",
        answer: "You should contact NY State of Health or NYC HRA to request a replacement."
    },
    // Benefits
    {
        category: "Benefits",
        question: "What does Medicaid cover?",
        answer: "Medicaid covers doctor visits, hospital care, emergency services, prescriptions, mental health, dental, vision, maternity care, and preventive services."
    },
    {
        category: "Benefits",
        question: "Does Medicaid cover dental and vision?",
        answer: "Yes, including exams, cleanings, glasses, and some procedures."
    },
    {
        category: "Benefits",
        question: "Can Medicaid pay for medical bills from before I enrolled?",
        answer: "Yes. Medicaid may cover services up to 90 days before your application if you were eligible."
    },
    // Managed Care
    {
        category: "Managed Care",
        question: "What is a Medicaid Managed Care plan?",
        answer: "A health insurance plan that manages your care and provider network."
    },
    {
        category: "Managed Care",
        question: "Do I have to choose a plan?",
        answer: "Yes. If you don't choose, one may be assigned to you."
    },
    {
        category: "Managed Care",
        question: "Can I change my plan?",
        answer: "Yes. You can change plans at any time in most cases."
    },
    // Renewals
    {
        category: "Renewals",
        question: "Do I have to renew Medicaid every year?",
        answer: "Yes. You must complete an annual renewal."
    },
    {
        category: "Renewals",
        question: "What happens if I miss my renewal?",
        answer: "Your coverage may end. You may need to reapply."
    },
    {
        category: "Renewals",
        question: "I never got my renewal notice — what should I do?",
        answer: "Log into your account or contact NYC HRA immediately."
    },
    // Changes & Problems
    {
        category: "Changes & Help",
        question: "What changes do I need to report?",
        answer: "Income, address, household size, pregnancy, or new insurance."
    },
    {
        category: "Changes & Help",
        question: "Will I lose Medicaid if my income increases?",
        answer: "Not necessarily. You may be moved to another low-cost plan."
    },
    {
        category: "Changes & Help",
        question: "My application was denied — what can I do?",
        answer: "You can request an appeal or fair hearing."
    },
    {
        category: "Changes & Help",
        question: "Where can I get help enrolling?",
        answer: "Free help is available from NYC enrollment counselors, community health centers, and hospitals."
    },
    {
        category: "Changes & Help",
        question: "Can someone help me in my language?",
        answer: "Yes. Translation services are available in many languages."
    }
];

const CATEGORIES = ["All", "Eligibility", "Applying", "After Enrollment", "Benefits", "Managed Care", "Renewals", "Changes & Help"];

interface Props {
    onQuestionClick: (question: string) => void;
}

export const FAQ = ({ onQuestionClick }: Props) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    const filteredFAQs = activeCategory === "All" 
        ? FAQ_DATA 
        : FAQ_DATA.filter(item => item.category === activeCategory);

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
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            
            <div className={styles.faqCategories}>
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        className={`${styles.categoryButton} ${activeCategory === category ? styles.categoryButtonActive : ""}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className={styles.faqList}>
                {filteredFAQs.map((item, index) => {
                    const globalIndex = FAQ_DATA.indexOf(item);
                    const isOpen = openItems.has(globalIndex);
                    
                    return (
                        <div key={globalIndex} className={styles.faqItem}>
                            <button 
                                className={styles.faqQuestion}
                                onClick={() => toggleItem(globalIndex)}
                            >
                                <span>{item.question}</span>
                                <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>
                                    ▼
                                </span>
                            </button>
                            {isOpen && (
                                <div className={styles.faqAnswer}>
                                    <p>{item.answer}</p>
                                    <button 
                                        className={styles.askButton}
                                        onClick={() => onQuestionClick(item.question)}
                                    >
                                        Ask this question
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
