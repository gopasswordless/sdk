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

### Importing

Import the library into your project:

```javascript
import { GoPasswordlessModal } from "@gopasswordless/sdk";
```

### Instantiation

Create an instance of `GoPasswordlessModal`:

```javascript
const modal = new GoPasswordlessModal({
  appId: "YOUR_APP_ID",
  appName: "YOUR_APP_NAME",
  theme: "light", // optional, default is 'light'
  onSignupSuccess: ({ accessToken }) => {
    /* handle signup success */
  },
  onLoginSuccess: ({ accessToken }) => {
    /* handle login success */
  },
});
```

### Starting Registration and Login Process

Start a registration flow:

```javascript
modal.startRegistration();
```

Start a login flow:

```javascript
passwordlessModal.startLogin();
```

## License

This project is licensed under the MIT license. See the LICENSE file for more info.
