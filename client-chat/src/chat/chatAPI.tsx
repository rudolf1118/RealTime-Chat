import axios from 'axios';

export const getMessages = async (senderId: string, receiverId: string) => {
    const response = await axios.get(`http://localhost:8080/messages?senderId=${senderId}&receiverId=${receiverId}`);
    console.log(response.data);
    return response.data;
}

// TODO: fix this
export const postMessages = async (senderId: string, receiverId: string, text: string, timestamp: string): Promise<void> => {
    console.log("this is posting message to backend", {senderId, receiverId, text, timestamp});
    
    await axios.post(`http://localhost:8080/messages`, {senderId, receiverId, text, timestamp}).catch((error) => {
        console.error('Error posting message:', error);
    });
}