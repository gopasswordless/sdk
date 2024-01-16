# GoPasswordless SDK

GoPasswordless SDK

[![npm version](https://badge.fury.io/js/%40gopasswordless%2Fsdk.svg)](https://badge.fury.io/js/%40gopasswordless%2Fsdk)

## Overview

The GoPasswordless SDK is a library for implementing passwordless user authentication in javacript/typescript web applications. It provides a modal interface for users to sign up and log in without traditional passwords. The library is built on top of the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) and is compatible with most modern browsers. Lower level functions are also exposed allowing implementation of flows with a custom UI.

## Features

- **Passwordless Authentication**: Allows users to sign up and log in without traditional passwords.
- **Customizable Modal Interface**: Easily integrated into existing web applications, providing a user-friendly modal for authentication processes.
- **Event Callbacks**: Handlers for successful signups and logins, providing access tokens for further actions.

## Getting Started

### Installation

Using npm:

```bash
npm install --save @gopasswordless/sdk
```

Using yarn:

```bash
yarn add @gopasswordless/sdk
```

## Usage

### GoPasswordless Configuration

Create an app and get your app ID from [GoPasswordless](https://gopasswordless.dev) (free).

### In React Apps

#### Import the `GoPasswordlessComponent`:

```typescript
import { GoPasswordlessComponent } from "@gopasswordless/sdk";
```

#### Use the `GoPasswordlessComponent` in your app:

```typescript
<GoPasswordlessComponent
  appId="YOUR_GOPASSWORDLESS_APP_ID"
  appName="YOUR_APP_NAME"
  appLogo="YOUR_APP_LOGO_URL"
  screen="signup"
  onSignupCompleted={({ accessToken }) => handleSuccess(accessToken)}
  onLoginSuccess={({ accessToken }) => handleSuccess(accessToken)}
/>
```

### Other JavaScript/Typescript Apps

#### Import the library functions into your project

The functions will handle all of the `WebAuthn` requests (clientside Passkey generation) and `GoPasswordless` API calls for you.

```javascript
import {
  beginRegistration,
  completeRegistration,
  login,
  resendVerificationCode,
} from "@gopasswordless/sdk";
```

#### User Signup

You can get a signup token for a user by passing your GoPasswordless App Id and the user's username to the `beginRegistration` function.

```javascript
const signupToken = await beginRegistration(
  "<YOUR_GOPASSWORDLESS_APP_ID>",
  "<USERNAME>"
);
```

The user will receive a verification code via email or SMS. Have the user input this code and then call the `completeRegistration` function with the verification code and the signup token from the previous step.

```javascript
const { accessToken } = await completeRegistration(
  "<YOUR_GOPASSWORDLESS_APP_ID>",
  "<USERNAME>",
  "<VERIFICATION_CODE>",
  "<SIGNUP_TOKEN>"
);
```

#### User Login

You can get an access token for a user by passing your GoPasswordless App Id and the user's username to the `login` function.

```javascript
const { accessToken } = await login(
  "<YOUR_GOPASSWORDLESS_APP_ID>",
  "<USERNAME>"
);
```

### Validate the Access Token (Serverside)

Import the validate function.

```javascript
import { validate } from "@gopasswordless/sdk";
```

Call the `validate` function with your GoPasswordless App Id and the access token to get the user's claims. The `validate` function will return the user's claims if the token is valid, otherwise it will throw an error.

```javascript
const userClaims = await validate("<YOUR_GOPASSWORDLESS_APP_ID>", "<TOKEN>");
```

## Licence

This project is licensed under the MIT license. See the LICENSE file for more info.
