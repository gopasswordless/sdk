import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { Tokens } from "../types/index.js";

export const register = async (
  appId: string,
  username: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<Tokens> => {
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

  const verificationResponseJSON = verificationResponse as Tokens;

  return verificationResponseJSON;
};

export const login = async (
  appId: string,
  username: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<Tokens> => {
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
  const verificationResponse = await fetch(
    `${uri}/auth/${appId}/login/verify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        data: attResp,
      }),
    }
  ).then((res) => res.json());

  const verificationResponseJSON = verificationResponse as Tokens;

  return verificationResponseJSON;
};
