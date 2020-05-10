# Okta React + Okta Hosted Login TypeScript Example

This is a partially completed TypeScript conversion of the [Okta Hosted Login](https://github.com/okta/samples-js-react/tree/master/okta-hosted-login) code sample.
This example was built with [Create React App][].
Uses a modified version of the types defined by @danursin in the [following PR](https://github.com/okta/okta-oidc-js/pull/600).
The types do not support [@okta/okta-react](https://www.npmjs.com/package/@okta/okta-react) custom Hooks.

## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Account, you can sign up for one at https://developer.okta.com/signup/.
* An Okta Application, configured for Single-Page App (SPA) mode.

## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone https://github.com/r3core/octa-hosted-login-react-typescript.git
```

Then install dependencies:

```bash
npm install
```

Now you need to gather the following information from the Okta Developer Console:

- **Client Id** - The client ID of the SPA application that you created earlier.
- **Issuer** - This is the URL of the authorization server that will perform authentication.

These values must exist as environment variables. They can be exported in the shell, or saved in a file named `.env`, at the root of this repository.

```ini
REACT_APP_ISSUER=https://yourOktaDomain.com/oauth2/default
REACT_APP_CLIENT_ID=123xxxxx123
REACT_APP_PORT=8080
```

With variables set, start the app server:

```
npm start
```

Now navigate to http://localhost:8080 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will redirect you to the Okta hosted sign-in page.

[Create React App]: https://github.com/facebook/create-react-app
[Okta React Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react
[OIDC SPA Setup Instructions]: https://developer.okta.com/docs/guides/sign-into-spa/react/before-you-begin
[PKCE Flow]: https://developer.okta.com/docs/guides/implement-auth-code-pkce
