import axios from 'axios';

class ServerAPI {
    serverAPI_WO_Auth: axios.AxiosInstance;
    serverAPI_With_Auth: axios.AxiosInstance;

    private initializeAPI() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No token found, initializing without authentication.');
            this.serverAPI_With_Auth = null;
            return;
        }
        console.log("PROCESS ENV", process.env.REACT_APP_API_URL)
        this.serverAPI_With_Auth = axios.create({
            baseURL: `http://localhost:8080/api`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    constructor() {
        try {
            this.initializeAPI();

            this.serverAPI_WO_Auth = axios.create({
                baseURL: `http://localhost:8080/api`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error creating serverAPI:', error);
        }
    }
}


export default new ServerAPI;