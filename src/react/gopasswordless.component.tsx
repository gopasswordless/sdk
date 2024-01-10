import React, { ReactNode, useEffect, useState } from "react";
import "./gopasswordless.component.css";
import { VerificationCodeInput } from "./components/verification-code-input/verification-code-input.component";
import { GoPasswordlessInputComponent } from "./components/input/input.component";
import { beginRegistration, completeRegistration, login } from "../browser";
import { GoPasswordlessButtonComponent } from "./components/button/button.component";

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
  onSignupStarted?: ({ signupToken }: { signupToken: string }) => void;
  onSignupCompleted?: ({ accessToken }: { accessToken: string }) => void;
  onLoginSuccess?: ({ accessToken }: { accessToken: string }) => void;
}

export const GoPasswordlessComponent = ({
  appId,
  appName,
  appLogo,
  screen,
  onSignupStarted,
  onSignupCompleted,
  onLoginSuccess,
}: GoPasswordlessComponentProps): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<
    "signup" | "login" | "verify"
  >(screen);
  const [username, setUsername] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentScreen(screen);
  }, [screen]);

  const switchScreen = ({ screen }: { screen: GoPasswordlessScreen }) => {
    setCurrentScreen(screen);
  };

  const handleSubmit = async () => {
    setLoading(true);

    switch (screen) {
      case "signup":
        const signupToken = await beginRegistration(appId, username);
        // Store the signup token and username in localStorage incase the user closes the tab
        // before completing the verification
        localStorage.setItem("gopasswordlessSignupToken", signupToken);
        localStorage.setItem("gopasswordlessUsername", username);
        setCurrentScreen("verify");
        onSignupStarted?.({ signupToken });
        break;
      case "verify":
        const resp = await completeRegistration(
          appId,
          username !== ""
            ? username
            : localStorage.getItem("gopasswordlessUsername")!,
          verificationCode,
          localStorage.getItem("gopasswordlessSignupToken")!
        );
        localStorage.setItem("gopasswordlessAccessToken", resp.accessToken);
        onSignupCompleted?.({ accessToken: resp.accessToken });
        break;
      case "login":
        const loginResp = await login(appId, username);
        localStorage.setItem(
          "gopasswordlessAccessToken",
          loginResp.accessToken
        );
        onLoginSuccess?.({ accessToken: loginResp.accessToken });
        break;
      default:
        break;
    }

    setLoading(false);
  };

  switch (currentScreen) {
    case "signup":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3 style={{ fontWeight: "normal" }}>Signup to {appName}</h3>
          <GoPasswordlessInputComponent
            placeholder="Enter email or phone number"
            onChange={(e) => setUsername(e.target.value)}
          />
          <GoPasswordlessButtonComponent
            onClick={handleSubmit}
            type="button"
            loading={loading}
          >
            Continue
          </GoPasswordlessButtonComponent>
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
          <h3 style={{ fontWeight: "normal" }}>
            Verify your {appName} account
          </h3>
          <VerificationCodeInput
            onChange={(code) => setVerificationCode(code)}
          />
          <GoPasswordlessButtonComponent
            onClick={handleSubmit}
            type="button"
            loading={loading}
          >
            Verify
          </GoPasswordlessButtonComponent>
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
          <h3 style={{ fontWeight: "normal" }}>Log in to {appName}</h3>
          <GoPasswordlessInputComponent
            placeholder="Enter email or phone number"
            onChange={(e) => setUsername(e.target.value)}
          />
          <GoPasswordlessButtonComponent
            onClick={handleSubmit}
            type="button"
            loading={loading}
          >
            Continue
          </GoPasswordlessButtonComponent>
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
