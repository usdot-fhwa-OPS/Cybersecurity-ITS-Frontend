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

import tokens from "./AxiosStore";

import api  from "./AxiosConfig";

const refreshTokenManager = () => {
    let refreshTimeoutId;

    const refreshTokenCheck = async (expiration) => {    
        const expirationMS = expiration * 1000;
    
        const timeRemaining = new Date(expirationMS).getTime() - new Date().getTime();
        const timeoutTrigger = timeRemaining - 5000;
    
        refreshTimeoutId = window.setTimeout(() => {
                api.request({
                    url: "/user/refreshtoken",
                    method: "POST",
                    data: {
                        refreshtoken: tokens.getRefreshToken()
                    }
                })
                .then(res => {
                    const newToken = res.data.AuthenticationResult;
                    tokens.setJWTRefreshTokens(newToken.AccessToken, newToken.IdToken);
                }).catch(console.error);
        }, timeoutTrigger);
    };
    
    const refreshTokenClean = () => {
        if (refreshTimeoutId) {
            window.clearTimeout(refreshTimeoutId);
        }
    };
    
    return {
        refreshTokenCheck,
        refreshTokenClean
    }
};

export default refreshTokenManager();
