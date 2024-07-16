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
import axios from 'axios';

const BASE_URL = 'https://feqgku27k5.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create(
    {
        headers: [{key:'value'}],
        baseURL: BASE_URL,
    });

const errorHandler = (error) => {
  const statusCode = error.response ? error.response.status : null;
  
    // logging only errors that are not 401
    if (statusCode) {
        console.error("Error while posting:", error);
        return Promise.reject(error['response'])
    }
    return Promise.reject('500')
}

api.interceptors.request.use(
    async (config) => {
        const currAccessToken = tokens.getIdToken();

        if (currAccessToken) {
            
            config.headers = {
                ...config.headers,
                Authorization: `${tokens.getIdToken()}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(undefined, (error) => {

    return errorHandler(error)
  })


export default api;