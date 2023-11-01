import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { createRemoteJWKSet, jwtVerify } from "jose";

const uri = "http://localhost:3000/v1";
const appId = "b9199050-5fdc-47c5-a317-89be8fad3aa1";

export type Tokens = {
  accessToken: string;
};

export type TokenClaims = {
  sub: string;
  username: string;
  aud: string;
  iat: number;
  exp: number;
};

export const register = async (username: string): Promise<Tokens> => {
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
    console.log(attResp);
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
      body: JSON.stringify(attResp),
    }
  ).then((res) => res.json());

  const verificationResponseJSON = verificationResponse as Tokens;

  return verificationResponseJSON;
};

export const login = async (username: string): Promise<Tokens> => {
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
      body: JSON.stringify(attResp),
    }
  ).then((res) => res.json());

  const verificationResponseJSON = verificationResponse as Tokens;

  return verificationResponseJSON;
};

export const validate = async (token: string): Promise<TokenClaims> => {
  const JWKS = createRemoteJWKSet(
    new URL(`${uri}/auth/${appId}/.well-known/jwks.json`)
  );

  const { payload } = await jwtVerify<TokenClaims>(token, JWKS);

  return payload;
};
