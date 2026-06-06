import { useState } from "react";
import { generateQuiz } from "../services/api";
import "./QuizCard.css";

export default function QuizCard({ filename }) {
  const [questions, setQuestions] = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [selected,  setSelected]  = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [numQ,      setNumQ]      = useState(5);

  async function handleGenerate() {
    if (!filename) return;
    setLoading(true); setError(""); setSelected({}); setSubmitted(false); setQuestions([]);
    try {
      const data = await generateQuiz(filename, numQ);
      setQuestions(data.questions);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function pick(qi, option) {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qi]: option }));
  }

  function submit() {
    if (Object.keys(selected).length < questions.length) {
      alert("Please answer all questions."); return;
    }
    setSubmitted(true);
  }

  function reset() { setSelected({}); setSubmitted(false); setQuestions([]); }

  const score = submitted ? questions.filter((q, i) => selected[i] === q.answer).length : 0;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div className="quiz-title"><span>🧠</span><h3>AI Quiz Generator</h3></div>
        <div className="quiz-controls">
          <div className="quiz-num-wrap">
            <label className="quiz-num-label">Questions:</label>
            <select className="quiz-select" value={numQ} onChange={(e) => setNumQ(Number(e.target.value))} disabled={loading}>
              {[3, 5, 8, 10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button className="btn-quiz" onClick={handleGenerate} disabled={!filename || loading}>
            {loading ? "Generating…" : questions.length ? "New Quiz" : "Generate Quiz"}
          </button>
        </div>
      </div>

      {!filename && <div className="quiz-empty"><p>Upload a PDF first to generate a quiz.</p></div>}
      {filename && !questions.length && !loading && (
        <div className="quiz-empty"><p>Click <strong>Generate Quiz</strong> to create an AI quiz from your PDF.</p></div>
      )}
      {loading && <div className="quiz-loading"><span className="spinner" /><p>Generating {numQ} questions…</p></div>}
      {error && <p className="quiz-error">⚠️ {error}</p>}

      {submitted && (
        <div className="quiz-score">
          <span className="score-num">{score}/{questions.length}</span>
          <span className="score-label">
            {score === questions.length ? "🎉 Perfect!" : score >= questions.length / 2 ? "👍 Good job!" : "📚 Keep studying!"}
          </span>
          <button className="btn-reset" onClick={reset}>Try Again</button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="quiz-body">
          {questions.map((q, qi) => {
            const userAns = selected[qi];
            const isCorrect = submitted && userAns === q.answer;
            const isWrong   = submitted && userAns && userAns !== q.answer;
            return (
              <div key={qi} className="q-block">
                <p className="q-text"><span className="q-num">Q{qi + 1}.</span> {q.question}</p>
                <div className="q-options">
                  {q.options.map((opt, oi) => {
                    let cls = "q-opt";
                    if (submitted) { if (opt === q.answer) cls += " correct"; else if (opt === userAns) cls += " wrong"; }
                    else if (opt === userAns) cls += " picked";
                    return (
                      <button key={oi} className={cls} onClick={() => pick(qi, opt)}>
                        <span className="opt-letter">{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="q-explanation">
                    <strong>{isCorrect ? "✅ Correct! " : isWrong ? "❌ Incorrect. " : ""}</strong>
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
          {!submitted && (
            <button className="btn-submit" onClick={submit} disabled={Object.keys(selected).length < questions.length}>
              Submit Answers
            </button>
          )}
        </div>
      )}
    </div>
  );
}