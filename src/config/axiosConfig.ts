import axios, {AxiosRequestHeaders} from 'axios';
import MainStore from '../stores/MainStore';
import {DOMAIN} from "./config";

export default function axiosConfig() {
    let options: {baseURL: string, headers: AxiosRequestHeaders | undefined} = {
        baseURL: DOMAIN,
        headers: undefined
    }

    // Add token in the Authorization header
    let token = MainStore.getToken()
    if (token !== null) {
        options.headers = {'Authorization': 'Bearer ' + token}
    }

    return axios.create(options);
}