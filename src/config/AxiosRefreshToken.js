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
