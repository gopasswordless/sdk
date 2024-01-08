import { ReactNode } from "react";
import "./card.component.css";

export interface CardComponentProps {
  children?: ReactNode | ReactNode[];
}

export const CardComponent = ({
  children,
}: CardComponentProps): JSX.Element => {
  return <div className="Card">{children}</div>;
};
