import API from "../config/APi";

export const registerUser = async (user: {username: string, email: string, password: string}): Promise<any> => {
        try {
        const request = await API.serverAPI_WO_Auth.post(`/auth/signup`, {
            username: user.username,
            email: user.email,
            password: user.password
        });
        return request;
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.response?.data?.message.includes("duplicate key error")) {
            return { error: "duplicate" };
        }
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}

export const loginUser = async (email: string, password: string): Promise<any> => {
    try {
        const request = await API.serverAPI_WO_Auth.post(`/auth/login`, {
            email: email,
            password: password
        });
        return request;
    } catch (error) {
        console.error('Error logging in user:', error);
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}

export const validateToken = async (token: string): Promise<any> => {    
    try {
        const request = await API.serverAPI_WO_Auth.get(`/auth/token`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Error logging in user:', error);
        if (error.response?.status === 401) return false;
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}
export const getUser = async (): Promise<any> => {    
    try {
        const request = await API.serverAPI_With_Auth.get(`/auth/getUser`);
        return request.data.user;
    } catch (error) {
        console.error('Error getting user id from token:', error);
        if (error.response?.status === 401) return false;
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}