const BASE = "http://localhost:8000/api";

export async function uploadPdf(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/pdf/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error((await res.json()).detail || "Upload failed");
  return res.json();
}

export async function getNotes(filename) {
  const res = await fetch(`${BASE}/pdf/notes/${encodeURIComponent(filename)}`);
  if (!res.ok) throw new Error((await res.json()).detail || "Failed to get notes");
  return res.json();
}

export async function deletePdf(filename) {
  const res = await fetch(`${BASE}/pdf/${encodeURIComponent(filename)}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
}

export async function sendChat(message, filename = "") {
  const res = await fetch(`${BASE}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, filename }),
  });
  if (!res.ok) throw new Error((await res.json()).detail || "Chat failed");
  return res.json();
}

export async function generateQuiz(filename, num_questions = 5) {
  const res = await fetch(`${BASE}/quiz/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, num_questions }),
  });
  if (!res.ok) throw new Error((await res.json()).detail || "Quiz generation failed");
  return res.json();
}