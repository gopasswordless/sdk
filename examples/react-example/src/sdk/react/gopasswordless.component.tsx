import { ReactNode, useEffect, useState } from "react";
import "./gopasswordless.component.css";
import { VerificationCodeInput } from "./components/verification-code-input/verification-code-input.component";
import { GoPasswordlessInputComponent } from "./components/input/input.component";
import { beginRegistration, completeRegistration, login } from "../browser";

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

  const [username, setUsername] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  useEffect(() => {
    setCurrentScreen(screen);
  }, [screen]);

  const switchScreen = ({ screen }: { screen: GoPasswordlessScreen }) => {
    setCurrentScreen(screen);
  };

  const handleSubmit = async () => {
    switch (screen) {
      case "signup":
        const signupToken = await beginRegistration(
          "c812b3f8-d945-41d8-bc87-bc9498022bf2",
          username
        );
        localStorage.setItem("gopasswordlessSignupToken", signupToken);
        setCurrentScreen("verify");
        break;
      case "verify":
        const resp = await completeRegistration(
          "c812b3f8-d945-41d8-bc87-bc9498022bf2",
          username,
          verificationCode,
          localStorage.getItem("gopasswordlessSignupToken")!
        );
        localStorage.setItem("gopasswordlessAccessToken", resp.accessToken);
        break;
      case "login":
        const loginResp = await login(
          "c812b3f8-d945-41d8-bc87-bc9498022bf2",
          username
        );
        localStorage.setItem("loginResp", loginResp.accessToken);
        break;
      default:
        break;
    }
  };

  switch (currentScreen) {
    case "signup":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3>Signup to {appName}</h3>
          <GoPasswordlessInputComponent
            placeholder="Enter email or phone number"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="GoPasswordlessButton"
            type="button"
            onClick={handleSubmit}
          >
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
          <VerificationCodeInput
            onChange={(code) => setVerificationCode(code)}
          />
          <button
            className="GoPasswordlessButton"
            type="button"
            onClick={handleSubmit}
          >
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
          <GoPasswordlessInputComponent
            placeholder="Enter email or phone number"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="GoPasswordlessButton"
            type="button"
            onClick={handleSubmit}
          >
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
