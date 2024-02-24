import React, { InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input<{ theme: string; error: boolean }>`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) =>
    theme === "dark"
      ? "#ffffff"
      : theme === "light"
      ? "#000000"
      : "rgba(255, 255, 255, 0.7)"}; /* Assuming "glass" mode has a slightly more opaque white text */
  outline: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    theme === "dark"
      ? "rgba(255, 255, 255, 0.046)"
      : theme === "light"
      ? "rgba(0, 0, 0, 0.046)"
      : "rgba(255, 255, 255, 0.1)"}; /* Assuming "glass" mode has a slightly more opaque effect */
  backdrop-filter: blur(10px); /* This will give the blur effect */
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) =>
      theme === "dark"
        ? "#e3e3e3"
        : theme === "light"
        ? "#505050"
        : "rgba(255, 255, 255, 0.7)"}; /* Adjusted placeholder color based on mode */
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) =>
      theme === "dark"
        ? "#b3b3b3"
        : theme === "light"
        ? "#666666"
        : "rgba(255, 255, 255, 0.7)"}; /* Assuming "glass" mode has a slightly more opaque white text */
  }
  border: ${({ error }) => (error ? "1px solid red" : "none")};
`;

const StyledError = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme: "dark" | "light" | "glass";
  error?: string;
  displayErrorMessage?: boolean;
}

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ theme, error, displayErrorMessage = true, ...props }, ref) => {
    return (
      <div style={{ width: "100%" }}>
        <StyledInput theme={theme} error={!!error} {...props} ref={ref} />
        {error && displayErrorMessage && <StyledError>{error}</StyledError>}
      </div>
    );
  }
);
