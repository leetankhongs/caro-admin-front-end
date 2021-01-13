import axios from 'axios';
import * as Config from '../constant/config'

const callAuthenticationAPI = (endpoint, contentHeader) => {
    return axios.get(Config.API_URL + '/' + endpoint, {
        headers: {
            'Authorization': 'Bearer ' + contentHeader
        }
    });
}

export default callAuthenticationAPI;