import React, { InputHTMLAttributes, forwardRef } from "react";

export interface GoPasswordlessInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const GoPasswordlessInputComponent = forwardRef<
  HTMLInputElement,
  GoPasswordlessInputProps
>((props, ref) => {
  return <input className="GoPasswordlessInput" {...props} ref={ref} />;
});
