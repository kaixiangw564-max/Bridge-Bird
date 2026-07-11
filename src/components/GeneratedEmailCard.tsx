"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export default function GeneratedEmailCard({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  const [emailSubject, setEmailSubject] = useState(subject);
  const [emailBody, setEmailBody] = useState(body);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullEmail = `Subject: ${emailSubject}\n\n${emailBody}`;
    const ok = await copyToClipboard(fullEmail);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="email-card">
      <h2 className="email-card__title">Ready-to-send email</h2>
      <div className="email-card__field">
        <label htmlFor="email-subject" className="email-card__label">
          Subject
        </label>
        <input
          id="email-subject"
          type="text"
          className="email-card__subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
      </div>
      <div className="email-card__field">
        <label htmlFor="email-body" className="email-card__label">
          Body
        </label>
        <textarea
          id="email-body"
          className="email-card__body"
          rows={8}
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
        />
      </div>
      <button
        className="btn btn--primary"
        onClick={handleCopy}
        aria-live="polite"
      >
        {copied ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 4L6 11l-3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="5"
                width="9"
                height="9"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Copy email
          </>
        )}
      </button>
      {copied && (
        <p className="email-card__copied" role="status">
          Email copied to clipboard
        </p>
      )}
    </div>
  );
}
