import { GoPasswordlessModal } from "@gopasswordless/sdk";
import { useEffect, useState } from "react";

export const App = (): JSX.Element => {
  const [modal, setModal] = useState<GoPasswordlessModal>();

  useEffect(() => {
    const modal = new GoPasswordlessModal({
      appId: "b9199050-5fdc-47c5-a317-89be8fad3aa1",
      appName: "GoPasswordless Demo",
      theme: "light", // 'light' or 'dark
      uri: "http://localhost:8080/v1",
      onSignupSuccess: ({ accessToken }) => {
        console.log(accessToken);
      },
    });
    setModal(modal);
  }, []);

  const handleRegistration = () => {
    console.log(modal);
    if (!modal) return;
    modal.startRegistration();
  };

  const handleLogin = () => {
    if (!modal) return;
    modal.startLogin();
  };

  return (
    <div className="App">
      <button onClick={handleRegistration}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default App;
