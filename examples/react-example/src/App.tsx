// import { GoPasswordlessModal } from "@gopasswordless/sdk";
import { useState } from "react";
import "./App.css";
import { CardComponent } from "./components/card/card.component";
import {
  GoPasswordlessComponent,
  GoPasswordlessScreen,
} from "@gopasswordless/sdk";

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
          <h4>Screen</h4>
          <select
            value={screen}
            onChange={(e) => setScreen(e.target.value as GoPasswordlessScreen)}
          >
            <option value="signup">Signup</option>
            <option value="login">Login</option>
            <option value="verify">Verify</option>
            <option value="profile">Profile</option>
          </select>
          <h4>Implementation Code</h4>
          <pre>
            <code>
              {`<GoPasswordlessComponent
  appId="YOUR_APP_ID"
  onSignupStarted={(signupToken) => handleSignupStarted()}
  onSignupCompleted={(accessToken) => handleSignupCompleted()}
  onLoginSuccess={(accessToken) => handleLoginSuccess()}
  screen={'${screen}'}
/>`}
            </code>
          </pre>
        </CardComponent>
      </div>
      <div className="Container">
        <GoPasswordlessComponent
          appId={process.env.REACT_APP_GOPASSWORDLESS_APP_ID || ""}
          appName="GoPasswordless Demo"
          appLogo="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_dark.png"
          screen={screen}
        />
      </div>
    </div>
  );
};

export default App;
