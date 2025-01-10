import axios from 'axios';

class ServerAPI {
    serverAPI_WO_Auth: axios.AxiosInstance;
    serverAPI_With_Auth: axios.AxiosInstance;
    url:string;

    public async initializeAPI() {
        const token = await localStorage.getItem('token');
        if (!token) {
            console.warn('No token found, initializing without authentication.');
            this.serverAPI_With_Auth = null;
            return ;
        }
        this.serverAPI_With_Auth = axios.create({
            baseURL: this.url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    constructor(url:string) {
        try {
            this.url = url;
            this.serverAPI_WO_Auth = axios.create({
                baseURL: url,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.initializeAPI();
        } catch (error) {
            console.error('Error creating serverAPI:', error);
        }
    }
}


export default new ServerAPI('http://localhost:8080/api');