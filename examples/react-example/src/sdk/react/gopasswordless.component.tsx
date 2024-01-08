import { useState } from "react";
import "./gopasswordless.component.css";

export interface GoPasswordlessComponentProps {
  // TODO: Load this data from the backend and only take appId as a prop
  appName: string;
  appLogo: string;
}

export const GoPasswordlessComponent = ({
  appName,
  appLogo,
}: GoPasswordlessComponentProps): JSX.Element => {
  const [screen, setScreen] = useState<"signup" | "login" | "verify">();

  return (
    <div className="GoPasswordlessWidget">
      <img
        className="GoPasswordlessLogo"
        src={appLogo}
        alt={`${appName} logo`}
      />
      <h3>Log in to {appName}</h3>
      <input
        className="GoPasswordlessInput"
        type="text"
        placeholder="Enter email or phone number"
      />
      <button className="GoPasswordlessButton" type="button">
        Continue
      </button>
      <div className="GoPasswordlessDivider" />
      <p>
        Don't have an account? <span>Signup</span>
      </p>
    </div>
  );
};
