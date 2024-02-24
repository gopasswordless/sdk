import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";

const StyledAnchor = styled.a<LinkComponentProps>`
  text-decoration: none;
  color: ${(props) => props.color};
`;

export interface LinkComponentProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color: string;
}

export const LinkComponent = (props: LinkComponentProps): JSX.Element => {
  return <StyledAnchor {...props} />;
};
