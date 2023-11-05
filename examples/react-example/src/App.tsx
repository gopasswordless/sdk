import "./App.css";
import { register, login } from "@gopasswordless/sdk";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() =>
            register(
              "b9199050-5fdc-47c5-a317-89be8fad3aa1",
              "GoPasswordless Demo",
              "http://localhost:8080/v1"
            )
          }
        >
          Register
        </button>
        <button
          onClick={() =>
            login(
              "b9199050-5fdc-47c5-a317-89be8fad3aa1",
              "GoPasswordless Demo",
              "http://localhost:8080/v1"
            )
          }
        >
          Login
        </button>
      </header>
    </div>
  );
}

export default App;
