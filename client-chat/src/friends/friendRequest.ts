import { socket } from '../socket/connection';

export const acceptFriendRequest = async (userId: string, username: string) => {
    socket.emit('acceptFriendRequest', { userId, username });
}

export const rejectFriendRequest = async (userId: string, username: string) => {
    socket.emit('rejectFriendRequest', { userId, username });
}

export const friendAccepted = async (userId: string, username: string) => {
    socket.emit('friendAccepted', { userId, username });
}

export const sendFriendRequest = async (userInfo: string) => {
    socket.emit('sendFriendRequest', userInfo);

    socket.on('friendRequestResponse', (response) => {
        if (response.success) {
            console.log('Friend request sent successfully:', response.message);
        } else {
            console.error('Error sending friend request:', response.error);
        }
    });
}

export const getFriendRequests = async () => {
    socket.on('friendRequests', (requests) => {
        return requests;
        
    });
    return [];
}