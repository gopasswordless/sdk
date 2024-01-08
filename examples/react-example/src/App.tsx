// import { GoPasswordlessModal } from "@gopasswordless/sdk";
import { useEffect, useState } from "react";
import "./App.css";
import { CardComponent } from "./components/card/card.component";
import { GoPasswordlessComponent } from "./sdk";

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <div className="Container">
        <CardComponent>
          <h2>Welcome to our demo!</h2>
          <p>
            Play around with our configurations to see how you can modify the
            GoPasswordless SDK.
          </p>
        </CardComponent>
      </div>
      <div className="Container">
        <GoPasswordlessComponent
          appName="GoPasswordless Demo"
          appLogo="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_dark.png"
        />
      </div>
    </div>
  );
};

export default App;
