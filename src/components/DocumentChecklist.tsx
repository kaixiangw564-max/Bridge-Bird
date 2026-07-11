"use client";

import { useState } from "react";

export default function DocumentChecklist({
  documents,
}: {
  documents: string[];
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!documents || documents.length === 0) return null;

  const completed = documents.filter((_, i) => checked[i]).length;

  return (
    <div className="doc-checklist">
      <div className="doc-checklist__header">
        <h2 className="doc-checklist__title">Required documents</h2>
        <span className="doc-checklist__progress">
          {completed}/{documents.length}
        </span>
      </div>
      <ul className="doc-checklist__list">
        {documents.map((doc, i) => (
          <li key={i} className="doc-checklist__item">
            <label className="doc-checklist__label">
              <input
                type="checkbox"
                checked={checked[i] || false}
                onChange={() => toggle(i)}
                className="doc-checklist__checkbox"
              />
              <span
                className={`doc-checklist__text ${checked[i] ? "doc-checklist__text--done" : ""}`}
              >
                {doc}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
