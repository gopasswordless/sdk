import { createRemoteJWKSet, jwtVerify } from "jose";
import { TokenClaims } from "../types/index.js";

export const validate = async (
  appId: string,
  token: string,
  uri: string = "https://api.gopasswordless.dev/v1"
): Promise<TokenClaims> => {
  const JWKS = createRemoteJWKSet(
    new URL(`${uri}/auth/${appId}/.well-known/jwks.json`)
  );

  const { payload } = await jwtVerify<TokenClaims>(token, JWKS);

  return payload;
};
