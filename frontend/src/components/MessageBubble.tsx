/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Bot,
    User,
    Copy,
    CheckCheck,
    BookOpen,
    Sparkles,
    Expand,
    Shrink,
    Share,
} from "lucide-react";
import { useState, type JSX, useRef, useEffect } from "react";
import type { Message } from "../types";

interface MessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
    onCopy?: (content: string) => void;
    onShare?: (content: string) => void;
}

export function MessageBubble({
    message,
    isStreaming = false,
    onCopy,
    onShare,
}: MessageBubbleProps) {
    const isUser = message.role === "user";
    const [isCopied, setIsCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    // Detect if content overflows and needs expansion
    useEffect(() => {
        if (contentRef.current && !isUser) {
            const element = contentRef.current;
            const hasVerticalOverflow = element.scrollHeight > 400; // Increased threshold
            const hasHorizontalOverflow =
                element.scrollWidth > element.clientWidth;
            setHasOverflow(hasVerticalOverflow || hasHorizontalOverflow);
        }
    }, [message.content, isUser]);

    // Simplified verse highlighting function
    const highlightVersesAndFormat = (text: string) => {
        // Remove all ** markers first for simplicity
        const cleanText = text.replace(/\*\*/g, "");

        const verseRegex =
            /(\b(?:[1-3]?\s?[A-Z][a-z]+)\s+\d+(?::\d+(?:[,-]\d+)*)?)/g;
        const parts: (string | JSX.Element)[] = [];
        let lastIndex = 0;
        let match: any;

        while ((match = verseRegex.exec(cleanText)) !== null) {
            // Text before the verse
            if (match.index > lastIndex) {
                parts.push(cleanText.slice(lastIndex, match.index));
            }

            // Verse reference
            parts.push(
                <span
                    key={`verse-${match.index}`}
                    className="verse-reference"
                    onClick={() => handleVerseClick(match[1])}
                >
                    <BookOpen size={14} className="verse-icon" />
                    <span className="verse-text">{match[1]}</span>
                </span>
            );

            lastIndex = verseRegex.lastIndex;
        }

        // Add remaining text
        if (lastIndex < cleanText.length) {
            parts.push(cleanText.slice(lastIndex));
        }

        return parts.length > 0 ? parts : cleanText;
    };

    const handleVerseClick = (verse: string) => {
        // You can implement verse lookup functionality here
        console.log("Verse clicked:", verse);
        // Optional: Open a modal with full verse text
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setIsCopied(true);
            onCopy?.(message.content);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "OracleSage Message",
                    text: message.content,
                })
                .catch(console.error);
        } else {
            onShare?.(message.content);
        }
    };

    const shouldShowExpand = hasOverflow && !isUser;
    const displayContent = expanded ? message.content : message.content;

    return (
        <div
            className={`message-bubble ${isUser ? "user" : "assistant"} ${
                expanded ? "expanded" : ""
            } ${isStreaming ? "streaming" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Enhanced Avatar */}
            <div className="message-avatar">
                <div
                    className={`avatar-container ${
                        isUser ? "user" : "assistant"
                    }`}
                >
                    <div className="avatar-backdrop"></div>
                    <div className="avatar-icon">
                        {isUser ? (
                            <User size={20} className="avatar-svg" />
                        ) : (
                            <div className="relative">
                                <Bot size={20} className="avatar-svg" />
                                {isStreaming && (
                                    <div className="streaming-ring">
                                        <div className="ring"></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Message Content */}
            <div className="message-content-wrapper">
                <div
                    className={`message-card ${isUser ? "user" : "assistant"}`}
                >
                    <div
                        ref={contentRef}
                        className={`message-content ${
                            expanded ? "expanded" : ""
                        } ${hasOverflow ? "overflow" : ""}`}
                    >
                        <div className="message-text">
                            {isUser ? (
                                <div className="user-message">
                                    {message.content}
                                </div>
                            ) : (
                                <div className="assistant-message">
                                    {highlightVersesAndFormat(displayContent)}
                                </div>
                            )}
                        </div>

                        {/* Streaming Animation */}
                        {isStreaming && !message.content && (
                            <div className="streaming-animation">
                                <div className="wave-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                                <span className="streaming-text">
                                    OracleSage is thinking
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Message Footer */}
                    <div
                        className={`message-footer ${
                            isHovered ? "visible" : ""
                        }`}
                    >
                        <div className="footer-left">
                            <div className="message-time">
                                {new Date(message.timestamp).toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </div>
                            {!isUser && (
                                <div className="message-model">
                                    <Sparkles size={12} />
                                    <span>Llama 3.3</span>
                                </div>
                            )}
                        </div>

                        {!isUser && (
                            <div className="footer-actions">
                                {/* Expand/Collapse */}
                                {shouldShowExpand && (
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="action-btn expand-btn"
                                        title={expanded ? "Collapse" : "Expand"}
                                    >
                                        {expanded ? (
                                            <Shrink size={16} />
                                        ) : (
                                            <Expand size={16} />
                                        )}
                                    </button>
                                )}

                                {/* Share */}
                                <button
                                    onClick={handleShare}
                                    className="action-btn share-btn"
                                    title="Share message"
                                >
                                    <Share size={16} />
                                </button>

                                {/* Copy */}
                                <button
                                    onClick={handleCopy}
                                    className={`action-btn copy-btn ${
                                        isCopied ? "copied" : ""
                                    }`}
                                    title={
                                        isCopied ? "Copied!" : "Copy message"
                                    }
                                >
                                    {isCopied ? (
                                        <CheckCheck size={16} />
                                    ) : (
                                        <Copy size={16} />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Connection Line */}
                {!isUser && <div className="connection-line"></div>}
            </div>
        </div>
    );
}
