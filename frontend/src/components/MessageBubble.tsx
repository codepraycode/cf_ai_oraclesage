
import { Bot, User } from "lucide-react";
import type { Message } from "../types";

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";

    return (
        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
            <div className="message-avatar">
                {isUser ? (
                    <User size={16} className="text-white" />
                ) : (
                    <Bot size={16} className="text-white" />
                )}
            </div>
            <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}
