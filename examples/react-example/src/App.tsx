import "./App.css";
import { register, login } from "@gopasswordless/sdk";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => register("GoPasswordless Demo")}>
          Register
        </button>
        <button onClick={() => login("GoPasswordless Demo")}>Login</button>
      </header>
    </div>
  );
}

export default App;
