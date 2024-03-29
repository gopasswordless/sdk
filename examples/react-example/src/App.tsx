import { useEffect, useState } from "react";
import "./App.css";
import {
  GoPasswordlessContextProvider,
  GoPasswordlessWidgetComponent,
} from "@gopasswordless/sdk";

const presets = [
  {
    name: "GoPasswordless Light",
    theme: "light",
    logo: "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo.png",
    colour: "#027bff",
  },
  {
    name: "GoPasswordless Dark",
    theme: "dark",
    logo: "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo-light.png",
    colour: "#027bff",
  },
  {
    name: "SpaceX",
    theme: "light",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6XOfRqvwz3RsgIsGley3e1a45vxFMOjGWZ51yyGZM&s",
    colour: "#005288",
  },
  {
    name: "SpaceX Dark",
    theme: "dark",
    logo: "https://spacex-microsite.netlify.app/images/spacex-logo-big.png",
    colour: "#10578c",
  },
  {
    name: "Tesla",
    theme: "light",
    logo: "https://1000logos.net/wp-content/uploads/2018/02/Font-Tesla-logo.jpg",
    colour: "#000000",
  },
];

export const App = (): JSX.Element => {
  const [mode, setMode] = useState<"light" | "dark" | "glass">("light");
  const [logoUrl, setLogoUrl] = useState<string>(
    "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo.png"
  );
  const [primaryColour, setPrimaryColour] = useState<string>("#027bff");
  const [showContainer, setShowContainer] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPreset, setSelectedPreset] = useState<string>(
    "GoPasswordless Light"
  );

  const selectPreset = (preset: string): void => {
    const selectedPreset = presets.find((p) => p.name === preset);
    if (selectedPreset) {
      setMode(selectedPreset.theme as "light" | "dark" | "glass");
      setLogoUrl(selectedPreset.logo);
      setPrimaryColour(selectedPreset.colour);
      setSelectedPreset(preset);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <GoPasswordlessContextProvider
      settings={{
        appId: process.env.REACT_APP_GOPASSWORDLESS_APP_ID || "",
        appName: "GoPasswordless Demo",
        appLogo: logoUrl,
        primaryColour,
        theme: mode,
        privacyUrl:
          "https://gopasswordless.s3.eu-west-2.amazonaws.com/privacy.html",
        termsUrl:
          "https://gopasswordless.s3.eu-west-2.amazonaws.com/privacy.html",
      }}
    >
      <div
        className="App"
        style={{
          backgroundColor: isMobile && showContainer ? "white" : "transparent",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "40px",
          }}
        >
          <img
            src={
              !showContainer
                ? `https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo-light.png`
                : `https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo.png`
            }
            alt="GoPasswordless Logo"
            style={{ height: "30px" }}
          />
        </div>
        <div
          className={`Toggle ${showContainer ? "ToggleMobile" : ""}`}
          style={{ display: isMobile ? "block" : "none" }}
          onClick={() => setShowContainer(!showContainer)}
        />
        <div
          className="Container Controls"
          style={{
            display: showContainer ? "flex" : "none",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "white",
            padding: "0rem 2rem",
            justifyContent: isMobile ? "start" : "center",
            alignItems: "start",
            maxWidth: isMobile ? "100%" : "calc(100vw - 4rem)",
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? "50px" : 0,
            left: 0,
            zIndex: 1000,
            paddingTop: isMobile ? "2rem" : "0rem",
          }}
        >
          <h2>See how your app could look with GoPasswordless</h2>
          <p>
            Play around with our configurations to see how you can customise the
            login box.
          </p>
          <h4>Presets</h4>
          <select
            value={selectedPreset}
            onChange={(e) => selectPreset(e.target.value)}
          >
            {presets.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
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
          <h4>Logo URL</h4>
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
          <h4>Primary Colour</h4>
          <input
            type="text"
            value={primaryColour}
            onChange={(e) => setPrimaryColour(e.target.value)}
          />
        </div>
        <div className="Container">
          <GoPasswordlessWidgetComponent />
        </div>
      </div>
    </GoPasswordlessContextProvider>
  );
};

export default App;
