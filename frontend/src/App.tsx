
import { Header } from "./components/Header";
import { ChatInterface } from "./components/ChatInterface";
import { InputBox } from "./components/InputBox";
import { useChat } from "./hooks/useChat";
import "./index.css";

function App() {
    const { messages, loading, error, sendMessage, clear } = useChat();

    return (
        <div className="app">
            <Header onClear={clear} messageCount={messages.length} />

            <main className="main-content">
                {error && <div className="error-banner">{error}</div>}

                <ChatInterface messages={messages} loading={loading} />
                <InputBox onSendMessage={sendMessage} loading={loading} />
            </main>
        </div>
    );
}

export default App;
