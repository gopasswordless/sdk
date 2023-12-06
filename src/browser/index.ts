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

  if (
    registrationOptions.statusCode &&
    registrationOptions.statusCode !== 201
  ) {
    throw new Error(registrationOptions.message);
  }

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

  if (
    verificationResponse.statusCode &&
    verificationResponse.statusCode !== 200
  ) {
    throw new Error(verificationResponse.message);
  }

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

  if (
    verificationResponse.statusCode &&
    verificationResponse.statusCode !== 200
  ) {
    throw new Error(verificationResponse.message);
  }

  if (verificationResponse.success) {
    const resp = await fetch(`${uri}/auth/${appId}/registration/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signupToken,
      }),
    }).then((res) => res.json());

    if (resp.statusCode && resp.statusCode !== 200) {
      throw new Error(resp.message);
    }

    return { accessToken: resp.accessToken };
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

  if (loginOptions.statusCode) {
    throw new Error(loginOptions.message);
  }

  let attResp;

  try {
    attResp = await startAuthentication(loginOptions);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Send the login response to the server
  const resp = await fetch(`${uri}/auth/${appId}/login/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      data: attResp,
    }),
  }).then((res) => res.json());

  if (resp.statusCode) {
    throw new Error(resp.message);
  }

  return { accessToken: resp.accessToken };
};
