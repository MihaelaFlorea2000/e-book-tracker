import axios, {AxiosRequestHeaders} from 'axios';
import {URL} from "./config";

export default function axiosConfig() {
    let options: {baseURL: string, headers: AxiosRequestHeaders | undefined} = {
        baseURL: URL,
        headers: undefined
    }
    return axios.create(options);
}