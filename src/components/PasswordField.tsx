"use client";

import { useState } from "react";

/** A password box with a Show button, so people can check what they typed. */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  minLength,
  hint,
  extra,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
  hint?: string;
  /** Shown at the end of the label row, such as a "Forgot password?" link. */
  extra?: React.ReactNode;
}) {
  const [shown, setShown] = useState(false);
  return (
    <div>
      <div className="row spread" style={{ alignItems: "baseline" }}>
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <div className="password-field">
        <input
          id={id}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoCapitalize="none"
          spellCheck={false}
          minLength={minLength}
          required
        />
        <button type="button" className="link-button small" onClick={() => setShown(!shown)} aria-pressed={shown} aria-controls={id}>
          {shown ? "Hide" : "Show"}
        </button>
      </div>
      {hint && <div className="small muted">{hint}</div>}
    </div>
  );
}
