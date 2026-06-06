import "./Navbar.css";

export default function Navbar({ page, onNavigate }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => onNavigate("home")}>
          <span className="nav-logo">✦</span>
          AI StudyBuddy
        </button>
        <nav className="nav-links">
          <button className={`nav-btn ${page === "home" ? "active" : ""}`} onClick={() => onNavigate("home")}>Home</button>
          <button className={`nav-btn ${page === "dashboard" ? "active" : ""}`} onClick={() => onNavigate("dashboard")}>Dashboard</button>
        </nav>
        <button className="nav-cta" onClick={() => onNavigate("dashboard")}>Get Started →</button>
      </div>
    </header>
  );
}