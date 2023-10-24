
const getUserFromToken = (token) => {

    if (token){

        const tokenParts = token.split(".");
        if (tokenParts.length >=1 && tokenParts[1]){            
            return JSON.parse(atob(tokenParts[1]));
        }

    }
}

export default getUserFromToken;