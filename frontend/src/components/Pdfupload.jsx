import { useState, useRef } from "react";
import { uploadPdf } from "../services/api";
import "./PdfUpload.css";

export default function PdfUpload({ onUploaded }) {
  const [dragging, setDragging] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file || file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await uploadPdf(file);
      onUploaded(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="upload-wrap">
      <div
        className={`upload-zone ${dragging ? "drag" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !loading && inputRef.current.click()}
      >
        {loading ? (
          <div className="upload-loading">
            <span className="spinner" />
            <p>Uploading…</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">📄</div>
            <p className="upload-title">Drop your PDF here</p>
            <p className="upload-sub">or click to browse · max 20 MB</p>
          </>
        )}
      </div>
      {error && <p className="upload-error">⚠️ {error}</p>}
      <input ref={inputRef} type="file" accept="application/pdf"
        style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
}