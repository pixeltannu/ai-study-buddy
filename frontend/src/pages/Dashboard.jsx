import { useState } from "react";
import PdfUpload from "../components/PdfUpload";
import ChatBox   from "../components/ChatBox";
import NotesCard from "../components/NotesCard";
import QuizCard  from "../components/QuizCard";
import { deletePdf } from "../services/api";
import "./Dashboard.css";

const TABS = ["Chat", "Notes", "Quiz"];

export default function Dashboard({ uploadedFile, setUploadedFile }) {
  const [tab, setTab] = useState("Chat");

  async function handleRemove() {
    if (!uploadedFile) return;
    try { await deletePdf(uploadedFile.filename); } catch (_) {}
    setUploadedFile(null);
  }

  const filename = uploadedFile?.filename || "";

  return (
    <div className="dashboard">
      <div className="dash-inner">
        <aside className="dash-sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label">Document</p>
            {uploadedFile ? (
              <div className="pdf-info">
                <div className="pdf-info-top">
                  <span className="pdf-icon">📄</span>
                  <div className="pdf-meta">
                    <p className="pdf-name" title={filename}>{filename}</p>
                    {uploadedFile.metadata?.pages && <p className="pdf-pages">{uploadedFile.metadata.pages} pages</p>}
                  </div>
                </div>
                <button className="btn-remove" onClick={handleRemove}>Remove</button>
              </div>
            ) : (
              <PdfUpload onUploaded={setUploadedFile} />
            )}
          </div>
          <div className="sidebar-section">
            <p className="sidebar-label">Tools</p>
            <nav className="sidebar-nav">
              {TABS.map((t) => (
                <button key={t} className={`sidebar-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                  <span>{t === "Chat" ? "💬" : t === "Notes" ? "📝" : "🧠"}</span> {t}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="dash-main">
          {!uploadedFile && (
            <div className="dash-hint">
              <span style={{ color: "var(--accent)" }}>←</span> Upload a PDF to unlock all features, or start chatting directly.
            </div>
          )}
          {tab === "Chat"  && <ChatBox   filename={filename} />}
          {tab === "Notes" && <NotesCard filename={filename} />}
          {tab === "Quiz"  && <QuizCard  filename={filename} />}
        </main>
      </div>
    </div>
  );
}