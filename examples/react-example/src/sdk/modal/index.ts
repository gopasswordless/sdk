import {
  beginRegistration,
  completeRegistration,
  login,
} from "../browser/index";
import {
  Theme,
  closedModalStyle,
  modalButtonStyle,
  modalButtonStyleLoading,
  modalContentStyle,
  modalInputStyle,
  modalLinkStyle,
  modalStyle,
} from "./styles";

interface GoPasswordlessModalState {
  step: "entry" | "verify" | "complete";
  theme: Theme;
  logoUri: string;
  appId: string;
  appName: string;
  uri: string;
  isLoading: boolean;
  username?: string;
  signupToken?: string;
  accessToken?: string;
}

export interface GoPasswordlessModalOptions {
  appId: string;
  appName: string; // TODO: fetch this from the server
  theme?: Theme;
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
    theme: "light",
    logoUri: "",
    isLoading: false,
  };
  private contentStyle = modalContentStyle({ theme: "light" });
  private inputStyle = modalInputStyle({ theme: "light" });
  private buttonStyle = modalButtonStyle({ theme: "light" });
  private linkStyle = modalLinkStyle({ theme: "light" });

  private modal: HTMLElement | null = null;
  private shadowRoot: ShadowRoot | null = null;

  private onSignupSuccess?: ({ accessToken }: { accessToken: string }) => void;
  private onLoginSuccess?: ({ accessToken }: { accessToken: string }) => void;

  constructor({
    appId,
    appName,
    theme = "light",
    uri,
    onLoginSuccess,
    onSignupSuccess,
  }: GoPasswordlessModalOptions) {
    // this.createModal();
    this.state.appId = appId;
    this.state.appName = appName;
    this.state.theme = theme;
    this.state.uri = uri || "https://api.gopasswordless.dev/v1";
    this.onLoginSuccess = onLoginSuccess;
    this.onSignupSuccess = onSignupSuccess;

    if (this.state.theme !== "light") {
      this.contentStyle = modalContentStyle({ theme: this.state.theme });
      this.inputStyle = modalInputStyle({ theme: this.state.theme });
      this.buttonStyle = modalButtonStyle({ theme: this.state.theme });
      this.linkStyle = modalLinkStyle({ theme: this.state.theme });
    }

    // set logo uri based on theme
    this.state.logoUri =
      this.state.theme === "light"
        ? "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_dark.png"
        : "https://gopasswordless.s3.eu-west-2.amazonaws.com/images/logo_vertical_light.png";
  }

  private createModal() {
    if (document.getElementById("go-passwordless-modal")) return;

    this.modal = document.createElement("div");
    this.modal.id = "go-passwordless-modal";

    this.shadowRoot = this.modal.attachShadow({ mode: "open" });

    // Use a style element to add styles to the shadow DOM
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      ${modalStyle}
      ${this.contentStyle}
      ${this.inputStyle}
      ${this.buttonStyle}
      ${this.linkStyle}
    `;
    this.shadowRoot.appendChild(styleEl);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    this.applyStyles(modalContent, this.contentStyle);

    const modalBody = document.createElement("div");
    modalBody.id = "modal-body";

    modalContent.appendChild(modalBody);
    this.shadowRoot.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  private applyStyles(element: HTMLElement, style: { [key: string]: string }) {
    for (let key in style) {
      element.style[key as any] = style[key];
    }
  }

  private async handleRegistrationSubmit() {
    if (!this.modal) return;

    // Access shadow root
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    // set the button loading style on all buttons
    const buttons = shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      this.applyStyles(
        button,
        modalButtonStyleLoading({ theme: this.state.theme })
      );
    });

    const usernameInput = shadowRoot.querySelector(
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
      const modalBody = shadowRoot.querySelector("#modal-body");
      if (!modalBody) return;
      modalBody.innerHTML = `
        <div>
          <img width="40%" src="${this.state.logoUri}" alt="Go Passwordless Logo" />
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
      const submitButton = shadowRoot.querySelector("#submit") as HTMLElement;
      if (submitButton) {
        this.applyStyles(submitButton, this.buttonStyle);

        submitButton.addEventListener(
          "click",
          this.handleVerificationSubmit.bind(this)
        );
      }

      const otpDigitInputs = shadowRoot.querySelectorAll("input");
      otpDigitInputs.forEach((input, index) => {
        this.applyStyles(input, { ...this.inputStyle, width: "30px" });
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          const nextSibling = target.nextElementSibling as HTMLInputElement;
          if (target.value.length === 1 && nextSibling) {
            nextSibling.focus();
          }
        });
      });

      const resend = shadowRoot.querySelector("#resend") as HTMLElement;
      if (resend) {
        this.applyStyles(resend, this.linkStyle);
      }
    }
  }

  private async handleVerificationSubmit() {
    if (!this.modal) return;

    // Access shadow root
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    // Add loading style to all buttons
    const buttons = shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      this.applyStyles(
        button,
        modalButtonStyleLoading({ theme: this.state.theme })
      );
    });

    const username = this.state.username;

    if (!username) return;

    // Get the code by reading each input value and concatenating
    const code = Array.from(shadowRoot.querySelectorAll("input"))
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
    this.applyStyles(this.modal, closedModalStyle);
  }

  private async handleLoginSubmit() {
    if (!this.modal) return;

    // Access shadow root
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    // Add loading style to all buttons
    const buttons = shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      this.applyStyles(
        button,
        modalButtonStyleLoading({ theme: this.state.theme })
      );
    });

    const usernameInput = shadowRoot.querySelector(
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
      this.applyStyles(this.modal, closedModalStyle);
    }
  }

  startRegistration() {
    this.createModal();
    if (!this.modal) return;

    // Access shadow root
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    const modalBody = shadowRoot.querySelector("#modal-body");
    if (!modalBody) return;

    this.state.isLoading = false;

    modalBody.innerHTML = `
      <div>
        <img width="40%" src="${this.state.logoUri}" alt="Go Passwordless Logo" />
        <p>Signup to ${this.state.appName}</p>
        <input type="text" id="username" placeholder="Email or phone number" />
        <button id="submit">Continue</button>
        <p>Already have an account? <span id="signup">Login</a></p>
      </div>`;

    // Apply styles to input and button
    const usernameInput = shadowRoot.querySelector("#username") as HTMLElement;
    const submitButton = shadowRoot.querySelector("#submit") as HTMLElement;
    const signup = shadowRoot.querySelector("#signup") as HTMLElement;
    if (usernameInput) {
      this.applyStyles(usernameInput, this.inputStyle);
    }
    if (submitButton) {
      this.applyStyles(submitButton, this.buttonStyle);

      submitButton.addEventListener(
        "click",
        this.handleRegistrationSubmit.bind(this)
      );
    }
    if (signup) {
      this.applyStyles(signup, this.linkStyle);

      signup.addEventListener("click", () => {
        this.startLogin();
      });
    }
  }

  startLogin() {
    this.createModal();
    if (!this.modal) return;

    // Access shadow root
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    const modalBody = shadowRoot.querySelector("#modal-body");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div>
        <img width="40%" src="${this.state.logoUri}" alt="Go Passwordless Logo" />
        <p>Login to ${this.state.appName}</p>
        <input type="text" id="username" placeholder="Email or phone number" />
        <button id="submit">Continue</button>
        <p>Don't have an account? <span id="signup">Sign up</a></p>
      </div>`;

    // Apply styles to input and button
    const usernameInput = shadowRoot.querySelector("#username") as HTMLElement;

    const submitButton = shadowRoot.querySelector("#submit") as HTMLElement;
    const signup = shadowRoot.querySelector("#signup") as HTMLElement;
    if (usernameInput) {
      this.applyStyles(usernameInput, this.inputStyle);
    }
    if (submitButton) {
      this.applyStyles(submitButton, this.buttonStyle);
      submitButton.addEventListener("click", this.handleLoginSubmit.bind(this));
    }
    if (signup) {
      this.applyStyles(signup, this.linkStyle);

      signup.addEventListener("click", () => {
        this.startRegistration();
      });
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.remove();
  }
}
