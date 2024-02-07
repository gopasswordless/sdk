import React, {
  createRef,
  useState,
  useEffect,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import { GoPasswordlessInputComponent } from "../input/input.component";

export interface VerificationCodeInputProps {
  onChange: (verificationCode: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  error?: string;
}

export const VerificationCodeInput = ({
  onChange,
  onKeyDown,
  error,
}: VerificationCodeInputProps): JSX.Element => {
  const [code, setCode] = useState<string[]>(Array(6).fill("")); // Initialize an array of 6 empty strings
  const inputRefs = Array.from({ length: 6 }, () =>
    createRef<HTMLInputElement>()
  ); // Create refs for each input

  useEffect(() => {
    onChange(code.join(""));
  }, [code]);

  const focusNext = (index: number, value: string) => {
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (pastedData.length === 6) {
      setCode(pastedData.split(""));
    }
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode((prevCode) => [
      ...prevCode.slice(0, index),
      value,
      ...prevCode.slice(index + 1),
    ]);
    focusNext(index, value);
  };

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <div>
      <div
        onPaste={handlePaste}
        className="GoPasswordlessVerificationCodeInput"
      >
        {code.map((digit, index) => (
          <GoPasswordlessInputComponent
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e: any) => handleChange(index, e)}
            onKeyDown={onKeyDown}
            error={error}
            displayErrorMessage={false}
          />
        ))}
      </div>
      {error && <p className="GoPasswordlessErrorMessage">{error}</p>}
    </div>
  );
};
