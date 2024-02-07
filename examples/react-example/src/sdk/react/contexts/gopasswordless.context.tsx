import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  beginRegistration,
  completeRegistration,
  login as baseLogin,
  resendVerificationCode,
} from "../../browser";

export interface GoPasswordlessSettings {
  appId: string;
  appLogo: string;
  appName: string;
  theme: "light" | "dark" | "glass";
  primaryColour: string;
  apiUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
}

export interface GoPasswordlessContextType {
  settings: GoPasswordlessSettings;
  currentScreen: "login" | "passkey" | "verify" | "complete";
  token: string | undefined;
  username: string | undefined;
  signupToken: string | undefined;
  error: string | undefined;
  loading: boolean;
  register: (args: { username: string }) => Promise<void>;
  verify: (args: { code: string }) => Promise<void>;
  login: (args: { username: string }) => Promise<void>;
  loginOrRegister: (args: { username: string }) => Promise<void>;
  resendCode: () => Promise<void>;
  logout: () => void;
}

export const GoPasswordlessContext = createContext<
  GoPasswordlessContextType | undefined
>(undefined);

export const GoPasswordlessContextProvider = ({
  settings,
  children,
}: {
  settings: GoPasswordlessSettings;
  children: ReactNode | ReactNode[];
}) => {
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "passkey" | "verify" | "complete"
  >("login");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [signupToken, setSignupToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("gopasswordlessAccessToken", token);
      setCurrentScreen("complete");
      setSignupToken(undefined);
      localStorage.removeItem("goPasswordlessSignupToken");
    }
  }, [token]);

  useEffect(() => {
    if (signupToken) {
      localStorage.setItem("gopasswordlessSignupToken", signupToken);
      setCurrentScreen("verify");
    }
  }, [signupToken]);

  useEffect(() => {
    if (username) {
      localStorage.setItem("gopasswordlessUsername", username);
    }
  }, [username]);

  useEffect(() => {
    if (localStorage.getItem("gopasswordlessAccessToken")) {
      setToken(localStorage.getItem("gopasswordlessAccessToken") || undefined);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("gopasswordlessSignupToken")) {
      setSignupToken(
        localStorage.getItem("gopasswordlessSignupToken") || undefined
      );
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("gopasswordlessUsername")) {
      setUsername(localStorage.getItem("gopasswordlessUsername") || undefined);
    }
  }, []);

  const register = async ({ username }: { username: string }) => {
    setLoading(true);

    try {
      const resp = await beginRegistration(
        settings.appId,
        username,
        settings.apiUrl
      );
      setSignupToken(resp);
      setUsername(username);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verify = async ({ code }: { code: string }) => {
    setLoading(true);

    try {
      const resp = await completeRegistration(
        settings.appId,
        username || "",
        code,
        signupToken || "",
        settings.apiUrl
      );
      setToken(resp.accessToken);
      setSignupToken(undefined);
      localStorage.removeItem("goPasswordlessSignupToken");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ username }: { username: string }) => {
    try {
      const resp = await baseLogin(settings.appId, username, settings.apiUrl);
      setToken(resp.accessToken);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong, please try again later.");
      }
    }
  };

  const loginOrRegister = async ({ username }: { username: string }) => {
    setLoading(true);

    try {
      setCurrentScreen("passkey");
      const resp = await baseLogin(settings.appId, username, settings.apiUrl);
      setToken(resp.accessToken);
    } catch (e) {
      if (e instanceof Error) {
        try {
          const resp = await beginRegistration(
            settings.appId,
            username,
            settings.apiUrl
          );
          setSignupToken(resp);
          setUsername(username);
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("Oops! Something went wrong, please try again later.");
          }
          setCurrentScreen("login");
        }
      } else {
        setError("Oops! Something went wrong, please try again later.");
        setCurrentScreen("login");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);

    try {
      await resendVerificationCode(
        settings.appId,
        username || "",
        settings.apiUrl
      );
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Oops! Something went wrong, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(undefined);
    localStorage.removeItem("gopasswordlessAccessToken");
    setCurrentScreen("login");
  };

  const contextValue: GoPasswordlessContextType = {
    settings,
    currentScreen,
    token,
    username,
    signupToken,
    error,
    loading,
    register,
    verify,
    login,
    loginOrRegister,
    resendCode,
    logout,
  };

  return (
    <GoPasswordlessContext.Provider value={contextValue}>
      {children}
    </GoPasswordlessContext.Provider>
  );
};

export const useGoPasswordlessContext = () => {
  const context = useContext(GoPasswordlessContext);
  if (!context) {
    throw new Error(
      "useGoPasswordlessContext must be used within a GoPasswordlessContextProvider"
    );
  }
  return context;
};
