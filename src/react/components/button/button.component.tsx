import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { TokensIcon } from "@radix-ui/react-icons";

const StyledButton = styled.button<ButtonComponentProps>`
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColour};
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: ${(props) => props.backgroundColour};
    opacity: 0.75;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const RotatingTokensIcon = styled(TokensIcon)`
  animation: rotate 4s linear infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export interface ButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColour: string;
  loading?: boolean;
}

export const ButtonComponent = (props: ButtonComponentProps): JSX.Element => {
  return (
    <StyledButton
      onClick={props.onClick}
      type="button"
      {...props}
      disabled={props.loading}
    >
      {props.loading ? <RotatingTokensIcon /> : props.children}
    </StyledButton>
  );
};
