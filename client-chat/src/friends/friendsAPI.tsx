import API from "../config/APi";

export const getFriendList = async (user_id: string): Promise<any> => {
    try {
        const request = await API.serverAPI_With_Auth.get(`/friends/getFriendsList?user_id=${user_id}`);
        return request;
    } catch (error) {
        console.error('Error logging in user:', error);
        const errorMessage = error.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}