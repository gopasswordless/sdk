import { GoPasswordlessModal } from "./modal";
import { useEffect, useState } from "react";

export const App = (): JSX.Element => {
  const handleRegistration = () => {
    const modal = new GoPasswordlessModal({
      appId: "b9199050-5fdc-47c5-a317-89be8fad3aa1",
      appName: "GoPasswordless Demo",
      uri: "http://localhost:8080/v1",
    });
    modal.startRegistration();
  };

  const handleLogin = () => {
    const modal = new GoPasswordlessModal({
      appId: "b9199050-5fdc-47c5-a317-89be8fad3aa1",
      appName: "GoPasswordless Demo",
      uri: "http://localhost:8080/v1",
    });
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
