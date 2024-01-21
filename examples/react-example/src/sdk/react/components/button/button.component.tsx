import React, { ButtonHTMLAttributes } from "react";

export interface GoPasswordlessButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const GoPasswordlessButtonComponent = (
  props: GoPasswordlessButtonComponentProps
): JSX.Element => {
  return (
    <button {...props} className="GoPasswordlessButton">
      {props.loading && (
        <div className="GoPasswordlessLoading">
          <div className="GoPasswordlessLoadingDot" />
          <div className="GoPasswordlessLoadingDot" />
          <div className="GoPasswordlessLoadingDot" />
        </div>
      )}
      {!props.loading && props.children}
    </button>
  );
};
