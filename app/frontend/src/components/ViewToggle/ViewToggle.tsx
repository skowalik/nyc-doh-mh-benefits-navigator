import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ViewToggle.module.css";

export type ViewMode = "assister" | "public";

interface Props {
    onViewChange?: (view: ViewMode) => void;
}

const STORAGE_KEY = "nyc-benefits-view-mode";

export const ViewToggle = ({ onViewChange }: Props) => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as ViewMode) || "assister";
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, viewMode);
        onViewChange?.(viewMode);
    }, [viewMode, onViewChange]);

    const handleToggle = () => {
        setViewMode(prev => (prev === "assister" ? "public" : "assister"));
    };

    return (
        <div className={styles.toggleContainer}>
            <span className={`${styles.label} ${viewMode === "assister" ? styles.activeLabel : ""}`}>
                {t("viewToggle.assister")}
            </span>
            <button
                className={styles.toggle}
                onClick={handleToggle}
                aria-label={t("viewToggle.switchView")}
                title={t("viewToggle.switchView")}
            >
                <span className={`${styles.slider} ${viewMode === "public" ? styles.sliderRight : ""}`} />
            </button>
            <span className={`${styles.label} ${viewMode === "public" ? styles.activeLabel : ""}`}>
                {t("viewToggle.public")}
            </span>
        </div>
    );
};

export const useViewMode = (): [ViewMode, (view: ViewMode) => void] => {
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as ViewMode) || "assister";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            setViewMode((stored as ViewMode) || "assister");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const updateViewMode = (view: ViewMode) => {
        localStorage.setItem(STORAGE_KEY, view);
        setViewMode(view);
    };

    return [viewMode, updateViewMode];
};
