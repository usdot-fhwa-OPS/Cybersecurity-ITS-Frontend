import  tokenManager from "./AxiosRefreshToken";

let tokens = {
    accessToken: "",
    refreshToken: "",
    idToken: ""
}

let instance;

class tokenStorage {

    constructor() {
        if (instance) {
            throw new Error("You can only create one instance of TokenStorage.");
        }
        instance = this;
    }

    getAccessToken = () => {
        return tokens.accessToken;
    }

    getRefreshToken = () => {
        return tokens.refreshToken;
    }

    getIdToken = () => {
        return tokens.idToken;
    }

    setJWTTokens = (newAccessToken, newRefreshToken, newIdToken) => {
        const jwtJSON = JSON.parse(window.atob(newIdToken.split('.')[1]));
        const expiresAt = jwtJSON.exp;

        tokenManager.refreshTokenCheck(expiresAt);

        tokens.accessToken = newAccessToken;
        tokens.refreshToken = newRefreshToken;
        tokens.idToken = newIdToken;
    };

    setJWTRefreshTokens = (newAccessToken, newIdToken) => {
        const jwtJSON = JSON.parse(window.atob(newIdToken.split('.')[1]));
        const expiresAt = jwtJSON.exp;

        tokenManager.refreshTokenCheck(expiresAt);

        tokens.accessToken = newAccessToken;
        tokens.idToken = newIdToken;
    };

    deleteTokens = () => {
        tokens.accessToken = null;
        tokens.refreshToken = null;
        tokens.idToken = null;

        tokenManager.refreshTokenClean();
    };
};

const singletonTokenStorage = Object.freeze(new tokenStorage());

export default singletonTokenStorage;
