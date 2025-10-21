import { MessageBubble } from "./MessageBubble";
import { BookOpen, Sparkles, MessageCircle, Shield } from "lucide-react";
import type { Message } from "../types";

interface ChatInterfaceProps {
    messages: Message[];
    loading: boolean;
    streamingMessage?: string;
}

export function ChatInterface({
    messages,
    loading,
    streamingMessage,
}: ChatInterfaceProps) {
    const handleCopyMessage = (content: string) => {
        console.log("Message copied:", content);
    };

    // const exampleQuestions = [
    //     {
    //         question: "Who was the mother of Moses?",
    //         icon: "👩‍👦",
    //     },
    //     {
    //         question: "What does 'Talitha cumi' mean?",
    //         icon: "💬",
    //     },
    //     {
    //         question: "Who did Jesus raise from the dead?",
    //         icon: "✨",
    //     },
    //     {
    //         question: "What are the fruits of the Spirit?",
    //         icon: "🍎",
    //     },
    // ];

    const features = [
        {
            icon: <BookOpen size={20} />,
            title: "Scriptural Accuracy",
            description:
                "Answers grounded in biblical text with proper references",
        },
        {
            icon: <Sparkles size={20} />,
            title: "AI Powered",
            description: "Powered by advanced Llama 3.3 language model",
        },
        {
            icon: <MessageCircle size={20} />,
            title: "Conversational Memory",
            description: "Remembers context from previous messages",
        },
        {
            icon: <Shield size={20} />,
            title: "Respectful Tone",
            description: "Maintains reverence for sacred texts",
        },
    ];

    if (messages.length === 0 && !loading) {
        return (
            <div className="empty-chat">
                <div className="empty-header">
                    <div className="empty-icon">
                        <div className="icon-wrapper">
                            <BookOpen size={32} />
                        </div>
                    </div>
                    <h2>Welcome to OracleSage</h2>
                    <p className="empty-subtitle">
                        Your AI companion for exploring Scripture. Ask anything
                        about the Bible and get thoughtful,
                        scripturally-grounded answers with proper references.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-content">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Example Questions */}
                {/* <div className="examples-section">
                    <div className="examples-header">
                        <Zap size={20} />
                        <h3>Try asking me...</h3>
                    </div>
                    <div className="examples-grid">
                        {exampleQuestions.map((example, index) => (
                            <div key={index} className="example-card">
                                <span className="example-icon">
                                    {example.icon}
                                </span>
                                <span className="example-text">
                                    {example.question}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Quick Tips */}
                <div className="tips-section">
                    <div className="tips-header">
                        <Sparkles size={18} />
                        <h4>Tips for best results</h4>
                    </div>
                    <div className="tips-list">
                        <div className="tip-item">
                            <div className="tip-bullet">•</div>
                            <span>
                                Ask specific questions for more precise answers
                            </span>
                        </div>
                        <div className="tip-item">
                            <div className="tip-bullet">•</div>
                            <span>
                                Follow up with related questions for deeper
                                understanding
                            </span>
                        </div>
                        <div className="tip-item">
                            <div className="tip-bullet">•</div>
                            <span>
                                Look for verse references to explore further in
                                your Bible
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-interface">
            {/* Session Info Header */}
            {messages.length > 0 && (
                <div className="session-info">
                    <div className="session-badge">
                        <Sparkles size={14} />
                        <span>New Session Started</span>
                    </div>
                    <div className="session-stats">
                        <span>
                            {messages.filter((m) => m.role === "user").length}{" "}
                            questions asked
                        </span>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="messages-container">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.timestamp}
                        message={message}
                        onCopy={handleCopyMessage}
                    />
                ))}
                {loading && streamingMessage && (
                    <MessageBubble
                        message={{
                            role: "assistant",
                            content: streamingMessage,
                            timestamp: Date.now(),
                        }}
                        isStreaming={true}
                    />
                )}
            </div>
        </div>
    );
}
