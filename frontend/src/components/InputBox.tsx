import { Send } from "lucide-react";
import { useState } from "react";

interface InputBoxProps {
    onSendMessage: (message: string) => void;
    loading: boolean;
}

export function InputBox({ onSendMessage, loading }: InputBoxProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            onSendMessage(input);
            setInput("");
        }
    };

    const exampleQuestions = [
        "Who was the mother of Moses?",
        "What does 'Talitha cumi' mean?",
        "Who did Jesus raise from the dead?",
        "What are the fruits of the Spirit?",
    ];

    return (
        <div className="input-container">
            {!loading && (
                <div className="example-questions">
                    <p>Try asking:</p>
                    <div className="question-chips">
                        {exampleQuestions.map((question, index) => (
                            <button
                                key={index}
                                className="question-chip"
                                onClick={() => setInput(question)}
                                type="button"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="input-form">
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about the Bible..."
                        disabled={loading}
                        className="message-input"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="send-button"
                    >
                        {loading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
