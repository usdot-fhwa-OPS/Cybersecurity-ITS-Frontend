/* Copyright (C) 2024 LEIDOS.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
