import axios, {AxiosRequestHeaders} from 'axios';
import MainStore from '../stores/MainStore';
import {URL} from "./config";

export default function axiosConfig() {
    let options: {baseURL: string, headers: AxiosRequestHeaders | undefined} = {
        baseURL: URL,
        headers: undefined
    }

    // Add token in the Authorization header
    let token = MainStore.getToken()
    if (token !== null) {
        options.headers = {'Authorization': 'Bearer ' + token}
    }

    return axios.create(options);
}