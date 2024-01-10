import { ReactNode, useEffect, useState } from "react";
import "./gopasswordless.component.css";
import { VerificationCodeInput } from "./components/verification-code-input/verification-code-input.component";
import { GoPasswordlessInputComponent } from "./components/input/input.component";

export type GoPasswordlessScreen = "signup" | "login" | "verify";

export interface GoPasswordlessBaseComponentProps {
  appName: string;
  appLogo: string;
  children: ReactNode | ReactNode[];
}

export const GoPasswordlessBaseComponent = ({
  appName,
  appLogo,
  children,
}: GoPasswordlessBaseComponentProps): JSX.Element => {
  return (
    <div className="GoPasswordlessWidget">
      <img
        className="GoPasswordlessLogo"
        src={appLogo}
        alt={`${appName} logo`}
      />
      {children}
    </div>
  );
};

export interface GoPasswordlessComponentProps {
  // TODO: Load this data from the backend and only take appId as a prop
  appId: string;
  appName: string;
  appLogo: string;
  screen: GoPasswordlessScreen;
}

export const GoPasswordlessComponent = ({
  appName,
  appLogo,
  screen,
}: GoPasswordlessComponentProps): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<
    "signup" | "login" | "verify"
  >(screen);

  useEffect(() => {
    setCurrentScreen(screen);
  }, [screen]);

  const switchScreen = ({ screen }: { screen: GoPasswordlessScreen }) => {
    setCurrentScreen(screen);
  };

  switch (currentScreen) {
    case "signup":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3>Signup to {appName}</h3>
          <GoPasswordlessInputComponent placeholder="Enter email or phone number " />
          <button className="GoPasswordlessButton" type="button">
            Continue
          </button>
          <div className="GoPasswordlessDivider" />
          <p>
            Already have an account?{" "}
            <span
              className="GoPasswordlessLink"
              onClick={() => switchScreen({ screen: "login" })}
            >
              Login
            </span>
          </p>
        </GoPasswordlessBaseComponent>
      );
    case "verify":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3>Verify your {appName} account</h3>
          <VerificationCodeInput />
          <button className="GoPasswordlessButton" type="button">
            Verify
          </button>
          <div className="GoPasswordlessDivider" />
          <p>
            Didn't receive a code?{" "}
            <span className="GoPasswordlessLink">Resend</span>
          </p>
        </GoPasswordlessBaseComponent>
      );
    case "login":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3>Log in to {appName}</h3>
          <GoPasswordlessInputComponent placeholder="Enter email or phone number" />
          <button className="GoPasswordlessButton" type="button">
            Continue
          </button>
          <div className="GoPasswordlessDivider" />
          <p>
            Don't have an account?{" "}
            <span
              className="GoPasswordlessLink"
              onClick={() => switchScreen({ screen: "signup" })}
            >
              Signup
            </span>
          </p>
        </GoPasswordlessBaseComponent>
      );
    default:
      return <></>;
  }
};
