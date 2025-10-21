
import { BookOpen, Github, Trash2 } from "lucide-react";

interface HeaderProps {
    onClear: () => void;
    messageCount: number;
}

export function Header({ onClear, messageCount }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <div className="logo-icon">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1>OracleSage</h1>
                        <p>AI-Powered Biblical Insights</p>
                    </div>
                </div>

                <div className="header-actions">
                    {messageCount > 0 && (
                        <button onClick={onClear} className="clear-button">
                            <Trash2 size={16} />
                            Clear Chat
                        </button>
                    )}

                    <a
                        href="https://github.com/codepraycode/cf_ai_oraclesage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-button"
                    >
                        <Github size={16} />
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}
