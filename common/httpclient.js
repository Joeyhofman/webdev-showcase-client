import axios from 'axios';

class HttpClient {

    constructor(){
        this.BASE_URL = 'https://localhost:7215';

        this.DEFAULT_HEADERS = {
            headers: {
                'Authorization': `Bearer ${getters.getAuthToken()}`,
            }
        };
    }

    async get(path, headers) {
        const config = {
            ...this.DEFAULT_HEADERS,
            ...headers
        }
        try{
            const res = await axios.get(`${this.BASE_URL}/${path}`);
            return res.data;
        }catch(errorResponse){
            if(errorResponse.status === 400){
                return errorResponse.data;
            }
        }
    }
    async post(path, headers, body) {
        const config = {
            ...this.DEFAULT_HEADERS,
            ...headers
        }
        
        try{
            const res = await axios.post(`${this.BASE_URL}/${path}`, body, config);
            return res.data;
        }catch(errorResponse){
            if(errorResponse.status === 400){
                return errorResponse.data;
            }
        }
    }
    async put(path, headers, body) {
        try{
            const res = await axios.put(`${this.BASE_URL}/${path}`, body, headers);
            return res.data;
        }catch(errorResponse){
            if(errorResponse.status === 400){
                return errorResponse.data;
            }
        }
    }
    async delete(path, headers, body) {
        
        const headers = {
            ...this.DEFAULT_HEADERS,
            ...headers
        }
        try{
            const res = await axios.put(`${this.BASE_URL}/${path}`, body, config);
            return res.data;
        }catch(errorResponse){
            if(errorResponse.status === 400){
                return errorResponse.data;
            }
        }
    }
}

export {
    HttpClient
}