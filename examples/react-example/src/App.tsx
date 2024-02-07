import { useState } from "react";
import "./App.css";
import {
  GoPasswordlessContextProvider,
  GoPasswordlessWidgetComponent,
} from "./sdk/react";

export const App = (): JSX.Element => {
  const [mode, setMode] = useState<"light" | "dark" | "glass">("light");
  const [showContainer, setShowContainer] = useState(window.innerWidth > 768);

  const isMobile = window.innerWidth <= 768;

  return (
    <GoPasswordlessContextProvider
      settings={{
        appId: process.env.REACT_APP_GOPASSWORDLESS_APP_ID || "",
        appName: "GoPasswordless Demo",
        appLogo:
          mode === "dark" || mode === "glass"
            ? "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_light.png"
            : "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_dark.png",
        primaryColour: "#027bff",
        theme: mode,
        apiUrl: "http://localhost:8080/v1",
      }}
    >
      <div className="App" style={{ gap: isMobile ? "2rem" : "0" }}>
        <div
          className="Toggle"
          style={{ display: showContainer ? "none" : "block" }}
          onClick={() => setShowContainer(!showContainer)}
        />
        <div
          className="Container Controls"
          style={{
            display: showContainer ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "white",
            padding: "0 2rem",
            justifyContent: "center",
            alignItems: "start",
            maxWidth: "calc(100vw - 4rem)",
            paddingTop: isMobile ? "1rem" : "0",
          }}
        >
          {isMobile && (
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                color: "#333",
                cursor: "pointer",
              }}
              onClick={() => setShowContainer(false)}
            >
              &times;
            </button>
          )}
          <h2>Welcome to the GoPasswordless Demo!</h2>
          <p>
            Play around with our configurations to see how you can customise the
            login box.
          </p>
          <h4>Mode</h4>
          <select
            value={mode}
            onChange={(e) =>
              setMode(e.target.value as "light" | "dark" | "glass")
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="glass">Glass</option>
          </select>
        </div>
        <div className="Container">
          <GoPasswordlessWidgetComponent />
        </div>
      </div>
    </GoPasswordlessContextProvider>
  );
};

export default App;
