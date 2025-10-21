// src/components/ChatInterface.tsx
import { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "../types";
import { Bot } from "lucide-react";
import { LoadingDots } from "./Loader/LoadingDots";

interface ChatInterfaceProps {
    messages: Message[];
    loading: boolean;
}

export function ChatInterface({ messages, loading }: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    if (messages.length === 0) {
        return (
            <div className="empty-chat">
                <div className="empty-icon">🕊️</div>
                <h2>Welcome to OracleSage</h2>
                <p>
                    Ask me anything about the Bible and I'll provide
                    scripturally-grounded answers with references.
                </p>
                <div className="features">
                    <div className="feature">
                        <span className="feature-icon">📖</span>
                        <span>Biblical Accuracy</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🎯</span>
                        <span>Verse References</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">💬</span>
                        <span>Conversational Memory</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-interface">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                ))}
                {loading && (
                    <div className="loading-message">
                        <div className="message-avatar">
                            <Bot size={16} className="text-white" />
                        </div>
                        <div className="message-content">
                            <LoadingDots />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
