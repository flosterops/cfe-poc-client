import axios from 'axios';

const basicAxios = axios.create({
    baseURL: 'http://localhost:3000',
    // TODO change Content Type in the late App version
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Encoding, Server, Transfer-Encoding, X-Requested-With, X-Authorization, Referer, User-Agent, Access-Control-Allow-Origin, storeToken, X-GameServer-Channel',
        'Content-Type': '*',
    },
});

export { basicAxios as request };
