import { HTMLAttributes, ReactNode } from "react";
import "./card.component.css";

export interface CardComponentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactNode[];
  height?: string;
}

export const CardComponent = ({
  children,
  height,
  ...rest
}: CardComponentProps): JSX.Element => {
  return (
    <div className="Card" {...rest} style={{ height: height }}>
      {children}
    </div>
  );
};
