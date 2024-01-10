import React, { InputHTMLAttributes, forwardRef } from "react";
import "./input.component.css";

export interface GoPasswordlessInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  displayErrorMessage?: boolean;
}

export const GoPasswordlessInputComponent = forwardRef<
  HTMLInputElement,
  GoPasswordlessInputProps
>(({ error, displayErrorMessage = true, ...props }, ref) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        className={`GoPasswordlessInput ${
          error ? "GoPasswordlessInputError" : ""
        }`}
        {...props}
        ref={ref}
      />
      {error && displayErrorMessage && (
        <p className="GoPasswordlessErrorMessage">{error}</p>
      )}
    </div>
  );
});
