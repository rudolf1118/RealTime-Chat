import API from "../config/APi";

export const getMessages = async (senderId: string, receiverId: string) => {
    try {
        const response = await API.serverAPI_With_Auth.get(`/messages?senderId=${senderId}&receiverId=${receiverId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

// TODO: fix this
export const postMessages = async (senderId: string, receiverId: string, text: string, timestamp: string): Promise<void> => {
    await API.serverAPI_With_Auth.post(`/messages`, {senderId, receiverId, text, timestamp}).catch((error) => {
        console.error('Error posting message:', error);
    });
}