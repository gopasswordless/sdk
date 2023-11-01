import axios from "axios";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { createRemoteJWKSet, jwtVerify } from "jose";

const uri = "http://localhost:3000/v1";
const appId = "my-app-id";

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
  const registrationOptions = await axios.post(
    `${uri}/auth/${appId}/registration/options`,
    { username }
  );

  let attResp;

  try {
    attResp = await startRegistration(registrationOptions.data);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Send the registration response to the server
  const verificationResponse = await axios.post(
    `${uri}/auth/${appId}/registration/verify`,
    attResp
  );

  const verificationResponseJSON = verificationResponse.data as Tokens;

  return verificationResponseJSON;
};

export const login = async (username: string): Promise<Tokens> => {
  // Get the login options from the server
  const loginOptions = await axios.post(`${uri}/auth/${appId}/login/options`, {
    username,
  });

  let attResp;

  try {
    attResp = await startAuthentication(loginOptions.data);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Send the login response to the server
  const verificationResponse = await axios.post(
    `${uri}/auth/${appId}/login/verify`,
    attResp
  );

  const verificationResponseJSON = verificationResponse.data as Tokens;

  return verificationResponseJSON;
};

export const validate = async (token: string): Promise<TokenClaims> => {
  const JWKS = createRemoteJWKSet(
    new URL(`${uri}/auth/${appId}/.well-known/jwks.json`)
  );

  const { payload } = await jwtVerify<TokenClaims>(token, JWKS);

  return payload;
};
