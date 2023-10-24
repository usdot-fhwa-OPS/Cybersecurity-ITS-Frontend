import api from '../config/AxiosConfig'

import { defineCancelApiObject } from '../config/AxiosUtil';

const BASE_DATA_URL="/data"

export const DeviceApi = {
  getAllDevices: async function() {
    console.log(BASE_DATA_URL + '/requestall');

    const body = {}

    console.log(body)

    const response = await api.request({
      url: BASE_DATA_URL + '/requestall',
      method: "GET",
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
  putDevice: async function(deviceList) {
    console.log(BASE_DATA_URL + '/putlist');

    console.log(deviceList)

    const response = await api.request({
      url: BASE_DATA_URL + '/putlist',
      method: "PUT",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: deviceList
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
  deleteDevice: async function(deviceList) {
    console.log(BASE_DATA_URL + '/deletelist');

    deviceList = {
      "devicelist": deviceList
    }

    console.log(deviceList)

    const response = await api.request({
      url: BASE_DATA_URL + '/deletelist',
      method: "DELETE",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
      data: deviceList
    }).catch(function (error) {
      if (error) {
        return error.data.Message ? error.data.Message : error.status;
      }
    });

    return response.data ? response.data : response;
  },
} 
// defining the cancel API object for UserApi
const cancelApiObject = defineCancelApiObject(DeviceApi)