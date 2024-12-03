import axios from 'axios';

export const registerUser = async (user: {username: string, email: string, password: string}): Promise<any> => {
    console.log("this is registering user to backend", {user});
    
    try {
        const request = await axios.post(`http://localhost:8080/signup`, {username: user.username, email: user.email, password: user.password});
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

export const loginUser = async (email: string, password: string): Promise<void> => {
    console.log("this is logging in user to backend", {email, password});
    
    await axios.post(`http://localhost:8080/login`, {email, password}).catch((error) => {
        console.error('Error logging in user:', error);
    });
}