import API from "../config/APi";

export const getFriendList = async (): Promise<any> => {
    try {
        const request = await API.serverAPI_With_Auth.get(`/friends/getFriendsList`);
        return request?.data?.friends || [];
    } catch (error) {
        console.error('Error logging in user:', error);
        console.log(error.response.data);
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}