import api from '../config/AxiosConfig'

import { defineCancelApiObject } from '../config/AxiosUtil';
import tokens from '../config/AxiosStore';

const BASE_USER_URL="/user"
const BASE_DATA_URL="/data"

export const UserApi = {
  login: async function (userName, password, cancel = false) {
    const response = await api.request({
      url: BASE_USER_URL + '/login',
      method: "POST",
      data: {username: userName, password:password},      
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    const rcvdAccessToken = response.data.AuthenticationResult.IdToken;
    const rcvdRefreshToken = response.data.AuthenticationResult.RefreshToken;
    const rcvdIDToken = response.data.AuthenticationResult.IdToken;

    tokens.setJWTTokens(rcvdAccessToken, rcvdRefreshToken, rcvdIDToken);
    localStorage.setItem("username", userName);

    // returning the product returned by the API

    return response.data ? response.data : response;
  },
  logout: async function() {
    const username = localStorage.getItem("username");
    const response = await api.request({
      url: BASE_USER_URL + '/logout',
      method: "POST",
      data: {username: username}
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });
    tokens.deleteTokens();
    localStorage.removeItem("username");

    return response.data ? response.data : response;
  },
  getUserList: async function() {
    console.log(BASE_USER_URL + '/getuserlist');

    const response = await api.request({
      url: BASE_USER_URL + '/getuserlist',
      method: "GET",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    }).catch(function (error) {
      if (error) {
        console.log(error)
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  createUser: async function(userName, accountPassword, attrArray) {
    console.log(BASE_USER_URL + '/createuser');

    const body = {
      "username": userName,
      "password": accountPassword,
      "attributes": attrArray
    }

    console.log(body)

    console.log("Before create")
    const response = await api.request({
      url: BASE_USER_URL + '/createuser',
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      
      console.log("Original Error Response: " )
      console.log(error)

      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    console.log("Original Response: " )
    console.log(response)

    return response.data ? response.data : response;
  },
  enableUser: async function(userName, enable) {
    
    const body = {
      "username": userName,
      "enabled": enable
    }

    console.log(body)
    const response = await api.request({
      url: BASE_USER_URL + '/enableuser',
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  setAdmin: async function(userName, enable) {
    
    const body = {
      "username": userName,
      "admin": enable
    }

    console.log(body)
    const response = await api.request({
      url: BASE_USER_URL + '/usersetadmin',
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  setUserAdmin: async function(userName, enable) {
    
    const body = {
      "username": userName,
      "admin": enable
    }

    console.log(body)
    const response = await api.request({
      url: BASE_USER_URL + '/usersetadmin',
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  deleteUser: async function(userName) {
    console.log(BASE_USER_URL + '/deleteuser');

    const body = {
      "username": userName
    }

    console.log(body)

    const response = await api.request({
      url: BASE_USER_URL + '/deleteuser',
      method: "DELETE",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    console.log(response)

    return response.data ? response.data : response;
  },
  modifyAttributes: async function(userName, attributeList) {
    console.log(BASE_USER_URL + '/modifyattributes');

    const body = {
      "username": userName,
      "attributes": attributeList
    }

    console.log(body)

    const response = await api.request({
      url: BASE_USER_URL + '/modifyattributes',
      method: "PATCH",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  getUserPermissions: async function(userName) {
    console.log(BASE_DATA_URL + '/getuserpermissions');

    const body = {
      "username": userName
    }

    console.log(body)

    const response = await api.request({
      url: BASE_DATA_URL + '/getuserpermissions',
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: body
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
} 
// defining the cancel API object for UserApi
const cancelApiObject = defineCancelApiObject(UserApi)