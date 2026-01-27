import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AssisterSidebar.module.css";

const NOTES_STORAGE_KEY = "nyc-benefits-call-notes";

export const AssisterSidebar = () => {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [callNotes, setCallNotes] = useState(() => {
        return localStorage.getItem(NOTES_STORAGE_KEY) || "";
    });
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        eligibility: true,
        documents: false,
        quickLinks: false
    });

    useEffect(() => {
        localStorage.setItem(NOTES_STORAGE_KEY, callNotes);
    }, [callNotes]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const clearNotes = () => {
        setCallNotes("");
        localStorage.removeItem(NOTES_STORAGE_KEY);
    };

    if (isCollapsed) {
        return (
            <div className={styles.collapsedSidebar}>
                <button
                    className={styles.expandButton}
                    onClick={() => setIsCollapsed(false)}
                    aria-label={t("assisterSidebar.expand")}
                >
                    ▶
                </button>
            </div>
        );
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>{t("assisterSidebar.title")}</h2>
                <button
                    className={styles.collapseButton}
                    onClick={() => setIsCollapsed(true)}
                    aria-label={t("assisterSidebar.collapse")}
                >
                    ◀
                </button>
            </div>

            {/* Call Notes Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>{t("assisterSidebar.callNotes")}</h3>
                    <button className={styles.clearButton} onClick={clearNotes}>
                        {t("assisterSidebar.clear")}
                    </button>
                </div>
                <textarea
                    className={styles.notesTextarea}
                    value={callNotes}
                    onChange={e => setCallNotes(e.target.value)}
                    placeholder={t("assisterSidebar.notesPlaceholder")}
                />
            </div>

            {/* Eligibility Quick Reference */}
            <div className={styles.section}>
                <button className={styles.sectionToggle} onClick={() => toggleSection("eligibility")}>
                    <span>{t("assisterSidebar.eligibilityTitle")}</span>
                    <span>{expandedSections.eligibility ? "−" : "+"}</span>
                </button>
                {expandedSections.eligibility && (
                    <div className={styles.sectionContent}>
                        <div className={styles.infoCard}>
                            <h4>{t("assisterSidebar.incomeGuidelines")}</h4>
                            <ul className={styles.infoList}>
                                <li>1 person: $20,783/year</li>
                                <li>2 people: $28,008/year</li>
                                <li>3 people: $35,233/year</li>
                                <li>4 people: $42,458/year</li>
                            </ul>
                            <p className={styles.infoNote}>{t("assisterSidebar.fplNote")}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Required Documents */}
            <div className={styles.section}>
                <button className={styles.sectionToggle} onClick={() => toggleSection("documents")}>
                    <span>{t("assisterSidebar.documentsTitle")}</span>
                    <span>{expandedSections.documents ? "−" : "+"}</span>
                </button>
                {expandedSections.documents && (
                    <div className={styles.sectionContent}>
                        <div className={styles.infoCard}>
                            <h4>{t("assisterSidebar.identityDocs")}</h4>
                            <ul className={styles.infoList}>
                                <li>Driver's license or state ID</li>
                                <li>Passport</li>
                                <li>Birth certificate</li>
                                <li>School ID with photo</li>
                            </ul>
                        </div>
                        <div className={styles.infoCard}>
                            <h4>{t("assisterSidebar.incomeDocs")}</h4>
                            <ul className={styles.infoList}>
                                <li>Pay stubs (last 4 weeks)</li>
                                <li>Tax return</li>
                                <li>SSI/SSDI award letter</li>
                                <li>Employer letter</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Links */}
            <div className={styles.section}>
                <button className={styles.sectionToggle} onClick={() => toggleSection("quickLinks")}>
                    <span>{t("assisterSidebar.quickLinksTitle")}</span>
                    <span>{expandedSections.quickLinks ? "−" : "+"}</span>
                </button>
                {expandedSections.quickLinks && (
                    <div className={styles.sectionContent}>
                        <a href="https://access.nyc.gov" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                            ACCESS NYC
                        </a>
                        <a href="https://www.health.ny.gov/health_care/medicaid/" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                            NY Medicaid Portal
                        </a>
                        <a href="https://www.ny.gov/services/apply-medicaid" target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                            Apply for Medicaid
                        </a>
                    </div>
                )}
            </div>
        </aside>
    );
};
