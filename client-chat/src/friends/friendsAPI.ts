import API from "../config/APi";

export const getFriendList = async (): Promise<any> => {
    try {
        const request = await API.serverAPI_With_Auth.get(`/friends/getFriendsList`);        return request?.data?.friends || [];
    } catch (error) {
        console.error('Error fetching friends list:', error);
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}

export const removeFriend = async (friend_id: any): Promise<any> => {
    const request = await API.serverAPI_With_Auth.delete(`/friends/removeFriend`, { data: { friend_id } });
    return request?.data?.friends || [];
}

export const addFriend = async (friendName: string): Promise<any> => {
    try {
        const request = await API.serverAPI_With_Auth.post(`/friends/addFriend`, { friend_name: friendName });
        return request?.data?.friend || [];
    } catch (error) {
        console.error('Error adding friend:', error);
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}
export const getFriendById = async (friend_id: string): Promise<any> => {
    try {
        const request = await API.serverAPI_With_Auth.get(`/friends/getFriendById`, { params: { friend_id } });
        return request?.data?.friend || [];
    } catch (error) {
        console.error('Error fetching friend by ID:', error);
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        return { error: errorMessage }; // Return the error message
    }
}
