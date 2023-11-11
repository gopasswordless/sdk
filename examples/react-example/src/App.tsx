import { register, login } from "@gopasswordless/sdk";

export const App = (): JSX.Element => {
  const passwordlessRegister = async (email: string): Promise<string> => {
    const { accessToken } = await register("<your_app_id>", email);

    return accessToken;
  };

  const passwordlessLogin = async (email: string): Promise<string> => {
    const { accessToken } = await login("<your_app_id>", email);

    return accessToken;
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => passwordlessRegister("demo@gopasswordless.dev")}>
          Register
        </button>
        <button onClick={() => passwordlessLogin("demo@gopasswordless.dev")}>
          Login
        </button>
      </header>
    </div>
  );
};

export default App;
