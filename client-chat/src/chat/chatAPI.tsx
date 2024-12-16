import axios from 'axios';

export const getMessages = async (senderId: string, receiverId: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/messages?senderId=${senderId}&receiverId=${receiverId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

// TODO: fix this
export const postMessages = async (senderId: string, receiverId: string, text: string, timestamp: string): Promise<void> => {
    await axios.post(`http://localhost:8080/messages`, {senderId, receiverId, text, timestamp}).catch((error) => {
        console.error('Error posting message:', error);
    });
}