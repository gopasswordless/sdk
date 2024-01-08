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
