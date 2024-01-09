// import { GoPasswordlessModal } from "@gopasswordless/sdk";
import { useState } from "react";
import "./App.css";
import { CardComponent } from "./components/card/card.component";
import { GoPasswordlessComponent, GoPasswordlessScreen } from "./sdk";

export const App = (): JSX.Element => {
  const [screen, setScreen] = useState<GoPasswordlessScreen>("signup");

  return (
    <div className="App">
      <div className="Container">
        <CardComponent>
          <h2>Welcome to our demo!</h2>
          <p>
            Play around with our configurations to see how you can modify the
            GoPasswordless SDK.
          </p>
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as GoPasswordlessScreen)}
          >
            <option value="signup">Signup</option>
            <option value="login">Login</option>
            <option value="verify">Verify</option>
          </select>
        </CardComponent>
      </div>
      <div className="Container">
        <GoPasswordlessComponent
          appName="GoPasswordless Demo"
          appLogo="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_dark.png"
          screen={screen}
        />
      </div>
    </div>
  );
};

export default App;
