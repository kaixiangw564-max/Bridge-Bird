"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import { saveResult } from "@/lib/storage";
import { EXAMPLE_MESSAGE } from "@/lib/analyzer";
import { Language } from "@/types/analysis";

export default function AnalyzeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<Language>("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (searchParams.get("load") === "example") {
      setMessage(EXAMPLE_MESSAGE);
    }
  }, [searchParams]);

  const loadExample = () => {
    setMessage(EXAMPLE_MESSAGE);
    setError("");
    setValidationError("");
  };

  const handleSubmit = async () => {
    setValidationError("");
    setError("");

    if (!message.trim()) {
      setValidationError("Please paste a school message before analyzing.");
      return;
    }

    if (message.trim().length < 10) {
      setValidationError(
        "Message is too short. Please paste a complete school message (at least 10 characters)."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), language }),
      });

      const data = (await res.json()) as Record<string, unknown>;

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        setLoading(false);
        return;
      }

      saveResult(data as never);
      router.push("/result");
    } catch {
      setError(
        "Could not reach the analysis service. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="page-content">
          <LoadingAnalysis />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="analyze-page__header">
          <h1 className="analyze-page__title">Analyze a message</h1>
          <p className="analyze-page__desc">
            Paste a school email, notice, or announcement. Bridge Bird will
            extract deadlines, identify required documents, and create your
            personalized action plan.
          </p>
        </div>

        <div className="analyze-form">
          <label htmlFor="message-input" className="analyze-form__label">
            School message
          </label>
          <textarea
            id="message-input"
            className={`analyze-form__textarea ${validationError ? "analyze-form__textarea--error" : ""}`}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setValidationError("");
            }}
            placeholder="Paste your school email or notice here..."
            aria-describedby="char-count"
          />
          <div className="analyze-form__footer">
            <span id="char-count" className="analyze-form__char-count">
              {message.length} characters
            </span>
            <div className="analyze-form__options">
              <select
                className="analyze-form__select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                aria-label="Select language"
              >
                <option value="English">English</option>
                <option value="中文">中文</option>
                <option value="Español">Español</option>
              </select>
              <button
                type="button"
                className="btn btn--outline"
                onClick={loadExample}
              >
                Load Example
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleSubmit}
              >
                Analyze Message
              </button>
            </div>
          </div>
          {validationError && (
            <p className="analyze-form__error" role="alert">
              {validationError}
            </p>
          )}
          {error && (
            <div className="api-error" role="alert">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" stroke="var(--color-danger)" strokeWidth="1.5" />
                <path d="M9 5v4M9 12h.01" stroke="var(--color-danger)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="api-error__text">{error}</span>
            </div>
          )}

          <div className="file-upload-placeholder">
            <p className="file-upload-placeholder__text">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M15 11v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3M9 3v8M6 6l3-3 3 3"
                  stroke="var(--color-text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload a screenshot or PDF
              <span className="file-upload-placeholder__badge">Coming soon</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
