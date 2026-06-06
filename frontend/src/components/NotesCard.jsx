import { useState } from "react";
import { getNotes } from "../services/api";
import "./NotesCard.css";

export default function NotesCard({ filename }) {
  const [notes,     setNotes]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [generated, setGenerated] = useState(false);

  async function handleGenerate() {
    if (!filename) return;
    setLoading(true); setError("");
    try {
      const data = await getNotes(filename);
      setNotes(data.notes); setGenerated(true);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function renderLine(line, i) {
    if (line.startsWith("### ")) return <h4 key={i} className="n-h3">{line.slice(4)}</h4>;
    if (line.startsWith("## "))  return <h3 key={i} className="n-h2">{line.slice(3)}</h3>;
    if (line.startsWith("# "))   return <h2 key={i} className="n-h1">{line.slice(2)}</h2>;
    if (line.startsWith("- ") || line.startsWith("* "))
      return <li key={i} className="n-li">{line.slice(2)}</li>;
    if (line.trim() === "") return <div key={i} style={{ height: ".45rem" }} />;
    return <p key={i} className="n-p">{line}</p>;
  }

  return (
    <div className="notes-card">
      <div className="notes-header">
        <div className="notes-title"><span>📝</span><h3>AI Study Notes</h3></div>
        <div className="notes-actions">
          {generated && <button className="btn-copy" onClick={() => navigator.clipboard.writeText(notes)}>Copy</button>}
          <button className="btn-generate" onClick={handleGenerate} disabled={!filename || loading}>
            {loading ? "Generating…" : generated ? "Regenerate" : "Generate Notes"}
          </button>
        </div>
      </div>
      {!filename && <div className="notes-empty"><p>Upload a PDF first to generate notes.</p></div>}
      {filename && !generated && !loading && (
        <div className="notes-empty"><p>Click <strong>Generate Notes</strong> to create AI-powered study notes.</p></div>
      )}
      {loading && <div className="notes-loading"><span className="spinner" /><p>Generating notes…</p></div>}
      {error && <p className="notes-error">⚠️ {error}</p>}
      {generated && notes && (
        <div className="notes-body">{notes.split("\n").map((line, i) => renderLine(line, i))}</div>
      )}
    </div>
  );
}