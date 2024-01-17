import React, { ReactNode, useEffect, useState } from "react";
import { VerificationCodeInput } from "./components/verification-code-input/verification-code-input.component";
import { GoPasswordlessInputComponent } from "./components/input/input.component";
import {
  beginRegistration,
  completeRegistration,
  login,
  resendVerificationCode,
} from "../browser";
import { GoPasswordlessButtonComponent } from "./components/button/button.component";
import root from "react-shadow";

export type GoPasswordlessScreen = "signup" | "login" | "verify" | "profile";

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
    <root.div>
      <style>
        {`
          .GoPasswordlessLogo {
            width: 50%;
          }
          
          .GoPasswordlessWidget {
            border: 1px solid #ddd;
            padding: 15px 40px;
            margin: 10px;
            border-radius: 10px;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 360px;
            height: 500px;
            gap: 20px;
            text-align: center;
            box-sizing: border-box;
          }
          
          .GoPasswordlessDivider {
            height: 1px;
            border-top: 1px solid #ddd;
            margin: 10px 0;
            width: 100%;
          }
          
          .GoPasswordlessLink {
            color: #007bff;
          }
          
          .GoPasswordlessLink:hover {
            cursor: pointer;
          }
          
          .GoPasswordlessInput {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
            outline: none;
            transition: border-color 0.3s ease;
            width: 100%;
            box-sizing: border-box;
          }
          
          .GoPasswordlessInputError {
            border-color: red;
            background-color: rgb(255, 216, 216);
          }
          
          .GoPasswordlessErrorMessage {
            color: red;
            font-size: 12px;
            margin-top: 5px;
          }    

          .GoPasswordlessVerificationCodeInput {
            display: flex;
            gap: 5px;
          }
           
          .GoPasswordlessButton {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            border: none;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition: background-color 0.3s ease;
          }
          
          .GoPasswordlessLoading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 18.5px;
          }
          
          .GoPasswordlessLoadingDot {
            width: 5px;
            height: 5px;
            border: 2px solid white;
            border-radius: 50%;
            float: left;
            margin: 0 5px;
            transform: scale(0);
            animation: fx 1000ms ease infinite;
          }
          
          .GoPasswordlessLoadingDot:nth-child(2) {
            animation: fx 1000ms ease infinite;
            animation-delay: 300ms;
          }
          
          .GoPasswordlessLoadingDot:nth-child(3) {
            animation: fx 1000ms ease infinite;
            animation-delay: 600ms;
          }
          
          @keyframes fx {
            50% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }          
        `}
      </style>

      <div className="GoPasswordlessWidget">
        <img
          className="GoPasswordlessLogo"
          src={appLogo}
          alt={`${appName} logo`}
        />
        {children}
      </div>
    </root.div>
  );
};

export interface GoPasswordlessComponentProps {
  // TODO: Load this data from the backend and only take appId as a prop
  appId: string;
  appName: string;
  appLogo: string;
  screen: GoPasswordlessScreen;
  apiUrl: string;
  onSignupStarted?: ({ signupToken }: { signupToken: string }) => void;
  onSignupCompleted?: ({ accessToken }: { accessToken: string }) => void;
  onLoginSuccess?: ({ accessToken }: { accessToken: string }) => void;
}

export const GoPasswordlessComponent = ({
  appId,
  appName,
  appLogo,
  screen,
  apiUrl = "https://api.gopasswordless.dev/v1",
  onSignupStarted,
  onSignupCompleted,
  onLoginSuccess,
}: GoPasswordlessComponentProps): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<
    "signup" | "login" | "verify" | "profile"
  >(screen);
  const [username, setUsername] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [verificationCodeResent, setVerificationCodeResent] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentScreen(screen);
  }, [screen]);

  const switchScreen = ({ screen }: { screen: GoPasswordlessScreen }) => {
    setCurrentScreen(screen);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(undefined);

    switch (currentScreen) {
      case "signup":
        try {
          const signupToken = await beginRegistration(appId, username, apiUrl);
          // Store the signup token and username in localStorage incase the user closes the tab
          // before completing the verification
          localStorage.setItem("gopasswordlessSignupToken", signupToken);
          localStorage.setItem("gopasswordlessUsername", username);
          setCurrentScreen("verify");
          onSignupStarted?.({ signupToken });
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("Oops! Something went wrong, please try again later.");
          }
        }
        break;
      case "verify":
        try {
          const resp = await completeRegistration(
            appId,
            username !== ""
              ? username
              : localStorage.getItem("gopasswordlessUsername")!,
            verificationCode,
            localStorage.getItem("gopasswordlessSignupToken")!,
            apiUrl
          );
          localStorage.setItem("gopasswordlessAccessToken", resp.accessToken);
          onSignupCompleted?.({ accessToken: resp.accessToken });
          setCurrentScreen("profile");
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("Oops! Something went wrong, please try again later.");
          }
        }
        break;
      case "login":
        try {
          const loginResp = await login(appId, username, apiUrl);
          localStorage.setItem(
            "gopasswordlessAccessToken",
            loginResp.accessToken
          );
          onLoginSuccess?.({ accessToken: loginResp.accessToken });
          setCurrentScreen("profile");
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("Oops! Something went wrong, please try again later.");
          }
        }
        break;
      case "profile":
        break;
      default:
        break;
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("gopasswordlessAccessToken");
    switchScreen({ screen: "login" });
  };

  const handleResendVerificationCode = async () => {
    try {
      await resendVerificationCode(appId, username, apiUrl);
      setVerificationCodeResent(true);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong, please try again later.");
      }
    }
  };

  switch (currentScreen) {
    case "signup":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <h3 style={{ fontWeight: "normal" }}>Signup to {appName}</h3>
          <GoPasswordlessInputComponent
            placeholder="Enter email or phone number"
            onChange={(e) => setUsername(e.target.value)}
            error={error}
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
            error={error}
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
            <span
              className="GoPasswordlessLink"
              onClick={handleResendVerificationCode}
            >
              Resend
            </span>
            {verificationCodeResent && (
              <>
                <br />
                <span>Code resent successfully!</span>
              </>
            )}
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
            error={error}
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
    case "profile":
      return (
        <GoPasswordlessBaseComponent appLogo={appLogo} appName={appName}>
          <span className="GoPasswordlessLink" onClick={handleLogout}>
            Logout
          </span>
        </GoPasswordlessBaseComponent>
      );
    default:
      return <></>;
  }
};
