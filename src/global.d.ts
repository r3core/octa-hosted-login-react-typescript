declare namespace NodeJS
{
    export interface ProcessEnv
    {
        NODE_ENV: "development" | "production" | "test";
        REACT_APP_CLIENT_ID: string;
        REACT_APP_ISSUER: string;
        REACT_APP_PORT: number;
        REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK: boolean;
        // ...
    }
}

// Uses the experimental types defined in https://github.com/okta/okta-oidc-js/pull/600#issuecomment-583616006
// Should not be considered as final.
// Does not include support for hooks.
declare module "@okta/okta-react" {
    import * as React from "react";
    import { RouteComponentProps } from "react-router-dom";

    export interface OidcConfig {
        issuer: string;
        baseUrl?: string;
        redirectUri: string;
        clientId: string;
        pkce: boolean;
        scopes: string | string[];
        disableHttpsCheck?: boolean;
    }

    export interface WithOktaAuthProps {
        authService: AuthService;
        authState: AuthState
    }

    export function withOktaAuth<P extends WithOktaAuthProps, C extends React.ComponentType<P>>(
        component: C & React.ComponentType<P>
    ): React.ComponentClass;

    export interface SecurityProps extends Partial<RouteComponentProps>, Partial<OidcConfig> {
        onAuthRequired?: (params: { history: any }) => void;
        authService?: AuthService;
    }

    export class Security extends React.Component<SecurityProps, any> {}

    export class SecureRoute extends React.Component<any, any> {}

    export interface LoginCallbackProps extends Partial<WithAuthProps> {}

    export class LoginCallback extends React.Component<LoginCallbackProps, any> {}

    export interface User {
        sub: string;
        name: string;
        locale: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        zoneinfo: string;
        updated_at: number;
        [key: string]: any;
    }

    export interface AuthState {
        isPending: boolean,
        isAuthenticated: boolean | null,
        idToken: string | null,
        accessToken: string | null,
    }

    export class AuthService {
        constructor(config: OidcConfig);

        getTokenManager(): any;
        handleAuthentication(): Promise<void | null>;
        getUser(): Promise<User | undefined>;
        login(fromUri: string, additionalParams?: any): Promise<void>;
        logout(options?: any): Promise<void>;
        setFromUri(fromUri: string): void;
        getFromUri(): any;
    }
}