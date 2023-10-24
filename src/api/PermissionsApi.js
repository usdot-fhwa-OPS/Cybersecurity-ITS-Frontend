import api from '../config/AxiosConfig'

import { defineCancelApiObject } from '../config/AxiosUtil';

const BASE_DATA_URL="/data"

export const PermissionsApi = {
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
  addUserPermission: async function(userName, permission) {
    console.log(BASE_DATA_URL + '/adduserlist');
    
    const body = {
      "userlist": [
        {
          "username": userName,
          "permissions": permission
        }
      ]
    }

    console.log(body)

    const response = await api.request({
      url: BASE_DATA_URL + '/adduserlist',
      method: "PUT",
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
  removeUserPermission: async function(userName, permission) {
    console.log(BASE_DATA_URL + '/deleteuserlist');
    
    const body = {
      "userlist": [
        {
          "username": userName,
          "permissions": [
            permission
            ]
        }
      ]
    }

    console.log(body)

    const response = await api.request({
      url: BASE_DATA_URL + '/deleteuserlist',
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

    return response.data ? response.data : response;
  },
} 
// defining the cancel API object for UserApi
const cancelApiObject = defineCancelApiObject(PermissionsApi)