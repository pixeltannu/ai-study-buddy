import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar page={page} onNavigate={setPage} />
      <main style={{ flex: 1 }}>
        {page === "home" ? (
          <Home onNavigate={setPage} />
        ) : (
          <Dashboard uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
        )}
      </main>
    </div>
  );
}