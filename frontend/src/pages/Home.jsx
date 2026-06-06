import "./Home.css";

const FEATURES = [
  { icon: "📄", title: "Upload PDF", desc: "Upload any textbook, notes, or paper and let AI read it for you." },
  { icon: "💬", title: "Chat with AI", desc: "Ask questions about your document or any topic. Get instant answers." },
  { icon: "📝", title: "Generate Notes", desc: "Auto-create structured study notes with headings and key points." },
  { icon: "🧠", title: "Take a Quiz", desc: "Test your knowledge with AI-generated multiple-choice questions." },
];

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">Powered by Google Gemini</div>
        <h1 className="hero-title">Your AI-Powered<br /><span className="hero-accent">Study Companion</span></h1>
        <p className="hero-sub">Upload any PDF, chat with it, generate notes, and take quizzes — all powered by AI.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => onNavigate("dashboard")}>Start Studying →</button>
          <button className="btn-secondary" onClick={() => onNavigate("dashboard")}>Upload a PDF</button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Everything you need to study better</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to study smarter?</h2>
        <p>Upload your first PDF and let AI do the heavy lifting.</p>
        <button className="btn-primary" onClick={() => onNavigate("dashboard")}>Open Dashboard →</button>
      </section>
    </div>
  );
}