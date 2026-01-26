import { useMsal } from "@azure/msal-react";
import { Pivot, PivotItem } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ChatAppResponse, getHeaders } from "../../api";
import { getToken, useLogin } from "../../authConfig";
import { MarkdownViewer } from "../MarkdownViewer";
import { SupportingContent } from "../SupportingContent";
import styles from "./AnalysisPanel.module.css";
import { AnalysisPanelTabs } from "./AnalysisPanelTabs";
import { ThoughtProcess } from "./ThoughtProcess";

interface Props {
    className: string;
    activeTab: AnalysisPanelTabs;
    onActiveTabChanged: (tab: AnalysisPanelTabs) => void;
    activeCitation: string | undefined;
    citationHeight: string;
    answer: ChatAppResponse;
    onCitationClicked?: (citationFilePath: string) => void;
}

const pivotItemDisabledStyle = { disabled: true, style: { color: "grey" } };

export const AnalysisPanel = ({ answer, activeTab, activeCitation, citationHeight, className, onActiveTabChanged, onCitationClicked }: Props) => {
    const isDisabledThoughtProcessTab: boolean = !answer.context.thoughts;
    const dataPoints = answer.context.data_points;
    const hasSupportingContent = Boolean(
        dataPoints &&
            ((dataPoints.text && dataPoints.text.length > 0) ||
                (dataPoints.images && dataPoints.images.length > 0) ||
                (dataPoints.external_results_metadata && dataPoints.external_results_metadata.length > 0))
    );
    const isDisabledSupportingContentTab: boolean = !hasSupportingContent;
    const isDisabledCitationTab: boolean = !activeCitation;
    const [citation, setCitation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const client = useLogin ? useMsal().instance : undefined;
    const { t } = useTranslation();

    const fetchCitation = async () => {
        if (!activeCitation) {
            setCitation("");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const token = client ? await getToken(client) : undefined;
            // Get hash from the URL as it may contain #page=N
            // which helps browser PDF renderer jump to correct page N
            const hashIndex = activeCitation.indexOf("#");
            const originalHash = hashIndex >= 0 ? activeCitation.substring(hashIndex + 1) : "";
            // Strip hash from fetch URL since browsers don't send fragments to server
            const fetchUrl = hashIndex >= 0 ? activeCitation.substring(0, hashIndex) : activeCitation;

            const response = await fetch(fetchUrl, {
                method: "GET",
                headers: await getHeaders(token)
            });

            if (!response.ok) {
                console.error("Citation fetch failed:", response.status, response.statusText);
                setError(`Failed to load citation: ${response.status}`);
                setCitation("");
                return;
            }

            const citationContent = await response.blob();
            console.log("Citation blob type:", citationContent.type, "size:", citationContent.size);

            if (citationContent.size === 0) {
                setError("Citation file is empty");
                setCitation("");
                return;
            }

            let citationObjectUrl = URL.createObjectURL(citationContent);
            // Add hash back to the new blob URL
            if (originalHash) {
                citationObjectUrl += "#" + originalHash;
            }
            setCitation(citationObjectUrl);
        } catch (err) {
            console.error("Error fetching citation:", err);
            setError("Error loading citation");
            setCitation("");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCitation();
    }, [activeCitation]);

    const renderFileViewer = () => {
        if (!activeCitation) {
            return null;
        }

        if (isLoading) {
            return <div style={{ padding: "20px", textAlign: "center" }}>Loading citation...</div>;
        }

        if (error) {
            return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>{error}</div>;
        }

        if (!citation) {
            return <div style={{ padding: "20px", textAlign: "center" }}>No citation content available</div>;
        }

        // Extract file extension, stripping any hash fragment
        const hashIndex = activeCitation.indexOf("#");
        const pathWithoutHash = hashIndex >= 0 ? activeCitation.substring(0, hashIndex) : activeCitation;
        const fileExtension = pathWithoutHash.split(".").pop()?.toLowerCase();

        switch (fileExtension) {
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return <img src={citation} className={styles.citationImg} alt="Citation Image" />;
            case "md":
                return <MarkdownViewer src={activeCitation} />;
            default:
                return <iframe title="Citation" src={citation} width="100%" height={citationHeight} />;
        }
    };

    return (
        <Pivot
            className={className}
            selectedKey={activeTab}
            onLinkClick={pivotItem => pivotItem && onActiveTabChanged(pivotItem.props.itemKey! as AnalysisPanelTabs)}
        >
            <PivotItem
                itemKey={AnalysisPanelTabs.ThoughtProcessTab}
                headerText={t("headerTexts.thoughtProcess")}
                headerButtonProps={isDisabledThoughtProcessTab ? pivotItemDisabledStyle : undefined}
            >
                <ThoughtProcess thoughts={answer.context.thoughts || []} onCitationClicked={onCitationClicked} />
            </PivotItem>
            <PivotItem
                itemKey={AnalysisPanelTabs.SupportingContentTab}
                headerText={t("headerTexts.supportingContent")}
                headerButtonProps={isDisabledSupportingContentTab ? pivotItemDisabledStyle : undefined}
            >
                <SupportingContent supportingContent={answer.context.data_points} />
            </PivotItem>
            <PivotItem
                itemKey={AnalysisPanelTabs.CitationTab}
                headerText={t("headerTexts.citation")}
                headerButtonProps={isDisabledCitationTab ? pivotItemDisabledStyle : undefined}
            >
                {renderFileViewer()}
            </PivotItem>
        </Pivot>
    );
};
