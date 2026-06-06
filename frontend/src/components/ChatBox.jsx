import { useState, useRef, useEffect } from "react";
import { sendChat } from "../services/api";
import "./ChatBox.css";

export default function ChatBox({ filename }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your AI study assistant. Ask me anything about your document or any topic." }
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const data = await sendChat(msg, filename || "");
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Error: " + e.message }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>
            <span className="bubble-label">{m.role === "ai" ? "✦ AI" : "You"}</span>
            <p className="bubble-text">{m.text}</p>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble ai">
            <span className="bubble-label">✦ AI</span>
            <p className="bubble-text typing"><span /><span /><span /></p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <textarea className="chat-input" rows={1}
          placeholder={filename ? `Ask about ${filename}…` : "Ask anything…"}
          value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
        />
        <button className="chat-send" onClick={send} disabled={!input.trim() || loading}>↑</button>
      </div>
    </div>
  );
}