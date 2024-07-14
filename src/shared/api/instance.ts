import axios from "axios";
import Endpoints from "./endpoints.ts";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
})

const urlSckipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REGISTER, Endpoints.AUTH.LOGOUT, Endpoints.AUTH.REFRESH];

axiosInstance.interceptors.request.use(async (config)=>{
    if(config.url && urlSckipAuth.includes(config.url)){
        return config;
    }

    const accessToken = window.localStorage.getItem("access_token");
    console.log(accessToken);
    if(accessToken){
        const authorization = `Bearer ${accessToken}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.headers = {
            ...config.headers,
            "Authorization": authorization
        }
    }
    return config;
})

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         const isLoggedIn = !!store.getState().auth.authData.accessToken
//
//         if ((error.response?.status === 401) && isLoggedIn && error.request.url !== Endpoints.AUTH.LOGOUT) {
//             store.dispatch(logoutUser())
//         }
//
//         throw error
//     }
// )