import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

export const beginRegistration = async (
  appId: string,
  username: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<string> => {
  // Get the registration options from the server
  const registrationOptions = await fetch(
    `${uri}/auth/${appId}/registration/options`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    }
  ).then((res) => res.json());

  let attResp;

  try {
    attResp = await startRegistration(registrationOptions);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Send the registration response to the server
  const verificationResponse = await fetch(
    `${uri}/auth/${appId}/registration/verify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        data: attResp,
      }),
    }
  ).then((res) => res.json());

  if (verificationResponse.signupToken) {
    return verificationResponse.signupToken;
  } else {
    throw new Error("Registration failed");
  }
};

export const completeRegistration = async (
  appId: string,
  username: string,
  code: string,
  signupToken: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<{ accessToken: string }> => {
  const verificationResponse = await fetch(`${uri}/auth/${appId}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      otp: code,
    }),
  }).then((res) => res.json());

  if (verificationResponse.success) {
    const { accessToken } = await fetch(
      `${uri}/auth/${appId}/registration/complete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signupToken,
        }),
      }
    ).then((res) => res.json());

    return { accessToken };
  } else {
    throw new Error("Verification failed");
  }
};

export const login = async (
  appId: string,
  username: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<{ accessToken: string }> => {
  // Get the login options from the server
  const loginOptions = await fetch(`${uri}/auth/${appId}/login/options`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  }).then((res) => res.json());

  let attResp;

  try {
    attResp = await startAuthentication(loginOptions);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Send the login response to the server
  const { accessToken } = await fetch(`${uri}/auth/${appId}/login/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      data: attResp,
    }),
  }).then((res) => res.json());

  return { accessToken };
};

interface GoPasswordlessModalState {
  step: "entry" | "verify" | "complete";
  appId: string;
  appName: string;
  uri: string;
  username?: string;
  signupToken?: string;
  accessToken?: string;
}

const modalStyle = {
  display: "none",
  position: "fixed",
  zIndex: "1000",
  left: "0",
  top: "0",
  width: "100%",
  overflow: "auto",
};

const modalContentStyle = {
  backgroundColor: "rgb(0 0 0 / 50%)",
  margin: "10% auto",
  border: "1px solid #ffffff30",
  width: "300px",
  height: "300px",
  padding: "50px 25px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  animationName: "animatetop",
  animationDuration: "0.4s",
  borderRadius: "5px",
  color: "#ffffff90",
  textAlign: "center",
};

const inputStyle = {
  padding: "10px",
  margin: "10px 0",
  width: "calc(100%)", // Full width minus padding
  boxSizing: "border-box", // Include padding in width calculation
  borderRadius: "4px",
  border: "1px solid #555", // Subtle border
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent background
  color: "rgb(220, 220, 220)", // Text color
  fontSize: "16px", // Readable font size
};

const buttonStyle = {
  padding: "12px",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#0070f4", // A purple-like color
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  margin: "10px 0",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)", // Subtle shadow
};

export interface GoPasswordlessModalOptions {
  appId: string;
  appName: string; // TODO: fetch this from the server
  uri?: string;
  onSignupSuccess?: ({ accessToken }: { accessToken: string }) => void;
  onLoginSuccess?: ({ accessToken }: { accessToken: string }) => void;
}

export class GoPasswordlessModal {
  private state: GoPasswordlessModalState = {
    step: "entry",
    appId: "",
    appName: "",
    uri: "",
  };

  private modal: HTMLElement | null = null;
  private onSignupSuccess?: ({ accessToken }: { accessToken: string }) => void;
  private onLoginSuccess?: ({ accessToken }: { accessToken: string }) => void;

  constructor({
    appId,
    appName,
    uri,
    onLoginSuccess,
    onSignupSuccess,
  }: GoPasswordlessModalOptions) {
    this.createModal();
    this.state.appId = appId;
    this.state.appName = appName;
    this.state.uri = uri || "https://api.gopasswordless.dev/v1";
    this.onLoginSuccess = onLoginSuccess;
    this.onSignupSuccess = onSignupSuccess;
  }

  private createModal() {
    if (document.getElementById("go-passwordless-modal")) return;

    this.modal = document.createElement("div");
    this.modal.id = "go-passwordless-modal";
    this.applyStyles(this.modal, modalStyle);

    // Close modal when clicking outside of it
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        // clear from DOM
        this.modal?.remove();
        this.modal = null;
      }
    });

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    this.applyStyles(modalContent, modalContentStyle);

    const modalBody = document.createElement("div");
    modalBody.id = "modal-body";

    modalContent.appendChild(modalBody);
    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  private applyStyles(element: HTMLElement, style: { [key: string]: string }) {
    for (let key in style) {
      element.style[key as any] = style[key];
    }
  }

  private async handleRegistrationSubmit() {
    if (!this.modal) return;
    const usernameInput = this.modal.querySelector(
      "#username"
    ) as HTMLInputElement;
    if (usernameInput) {
      const username = usernameInput.value;
      this.state.username = username;

      // WebAuthn registration
      this.state.signupToken = await beginRegistration(
        this.state.appId,
        username,
        this.state.uri
      );

      // Next step is to verify email or phone number before the user can login
      this.state.step = "verify";

      if (!this.modal) return;
      const modalBody = this.modal?.querySelector("#modal-body");
      if (!modalBody) return;
      modalBody.innerHTML = `
        <div>
          <img width="40%" src="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/gopasswordless_logo_light.png" alt="Go Passwordless Logo" />
          <p>Enter your verification code to continue</p>
          <input type="text" id="1" />
          <input type="text" id="2" />
          <input type="text" id="3" />
          <input type="text" id="4" />
          <input type="text" id="5" />
          <input type="text" id="6" />
          <button id="submit">Continue</button>
          <p>Didn't get a code? <span id="resend">Resend code</a></p>
        </div>`;

      // Apply styles to input and button
      const submitButton = this.modal.querySelector("#submit") as HTMLElement;
      if (submitButton) {
        this.applyStyles(submitButton, buttonStyle);
        submitButton.addEventListener(
          "click",
          this.handleVerificationSubmit.bind(this)
        );
      }

      const otpDigitInputs = this.modal.querySelectorAll("input");
      otpDigitInputs.forEach((input, index) => {
        this.applyStyles(input, { ...inputStyle, width: "30px" });
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          const nextSibling = target.nextElementSibling as HTMLInputElement;
          if (target.value.length === 1 && nextSibling) {
            nextSibling.focus();
          }
        });
      });

      const resend = this.modal.querySelector("#resend") as HTMLElement;
      if (resend) {
        this.applyStyles(resend, {
          color: "#ffffff",
          textDecoration: "none",
          cursor: "pointer",
        });
      }
    }
  }

  private async handleVerificationSubmit() {
    if (!this.modal) return;

    const username = this.state.username;

    if (!username) return;

    // Get the code by reading each input value and concatenating
    const code = Array.from(this.modal.querySelectorAll("input"))
      .map((input) => input.value)
      .join("");

    // Submit verification code
    const { accessToken } = await completeRegistration(
      this.state.appId,
      username,
      code,
      this.state.signupToken || "",
      this.state.uri
    );

    this.state.step = "complete";

    if (this.onSignupSuccess) {
      this.onSignupSuccess({ accessToken });
    }

    this.state.accessToken = accessToken;

    // close the modal
    this.modal?.remove();
  }

  private async handleLoginSubmit() {
    if (!this.modal) return;
    const usernameInput = this.modal.querySelector(
      "#username"
    ) as HTMLInputElement;
    if (usernameInput) {
      const username = usernameInput.value;
      this.state.username = username;

      // WebAuthn login
      const { accessToken } = await login(
        this.state.appId,
        username,
        this.state.uri
      );

      this.state.step = "complete";

      if (this.onLoginSuccess) {
        this.onLoginSuccess({ accessToken });
      }

      this.state.accessToken = accessToken;

      // close the modal
      this.modal?.remove();
    }
  }

  startRegistration() {
    if (!this.modal) return;
    const modalBody = this.modal?.querySelector("#modal-body");
    if (!modalBody) return;
    modalBody.innerHTML = `
      <div>
        <img width="40%" src="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/gopasswordless_logo_light.png" alt="Go Passwordless Logo" />
        <p>Signup to ${this.state.appName}</p>
        <input type="text" id="username" placeholder="Email or phone number" />
        <button id="submit">Continue</button>
        <p>Already have an account? <span id="signup">Login</a></p>
      </div>`;
    this.modal.style.display = "block";

    // Apply styles to input and button
    const usernameInput = this.modal.querySelector("#username") as HTMLElement;
    const submitButton = this.modal.querySelector("#submit") as HTMLElement;
    const signup = this.modal.querySelector("#signup") as HTMLElement;
    if (usernameInput) {
      this.applyStyles(usernameInput, inputStyle);
    }
    if (submitButton) {
      this.applyStyles(submitButton, buttonStyle);
      submitButton.addEventListener(
        "click",
        this.handleRegistrationSubmit.bind(this)
      );
    }
    if (signup) {
      this.applyStyles(signup, {
        color: "#ffffff",
        textDecoration: "none",
        cursor: "pointer",
      });

      signup.addEventListener("click", () => {
        this.startLogin();
      });
    }
  }

  startLogin() {
    if (!this.modal) return;
    const modalBody = this.modal?.querySelector("#modal-body");
    if (!modalBody) return;
    modalBody.innerHTML = `
      <div>
        <img width="40%" src="https://gopasswordless.s3.eu-west-2.amazonaws.com/images/gopasswordless_logo_light.png" alt="Go Passwordless Logo" />
        <p>Login to ${this.state.appName}</p>
        <input type="text" id="username" placeholder="Email or phone number" />
        <button id="submit">Continue</button>
        <p>Don't have an account? <span id="signup">Sign up</a></p>
      </div>`;
    this.modal.style.display = "block";

    // Apply styles to input and button
    const usernameInput = this.modal.querySelector("#username") as HTMLElement;
    const submitButton = this.modal.querySelector("#submit") as HTMLElement;
    const signup = this.modal.querySelector("#signup") as HTMLElement;
    if (usernameInput) {
      this.applyStyles(usernameInput, inputStyle);
    }
    if (submitButton) {
      this.applyStyles(submitButton, buttonStyle);
      submitButton.addEventListener("click", this.handleLoginSubmit.bind(this));
    }
    if (signup) {
      this.applyStyles(signup, {
        color: "#ffffff",
        textDecoration: "none",
        cursor: "pointer",
      });

      signup.addEventListener("click", () => {
        this.startRegistration();
      });
    }
  }
}
