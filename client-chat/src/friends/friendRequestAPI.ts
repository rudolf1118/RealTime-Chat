import { socket } from '../socket/connection';
import ServerAPI from '../config/APi';

export const acceptFriendRequest = async (userId: string, username: string) => {
    socket.emit('acceptFriendRequest', { userId, username });
}

export const rejectFriendRequest = async (userId: string, username: string) => {
    socket.emit('rejectFriendRequest', { userId, username });
}

export const friendAccepted = async (userId: string, username: string) => {
    socket.emit('friendAccepted', { userId, username });
}

export const sendFriendRequest = async (userInfo: string): Promise<any> => {
    socket.emit('sendFriendRequest', userInfo); 
    let status: any;

    status = await new Promise((resolve) => {
        socket.on('friendRequestResponse', (response) => {
            const { request } = response;
            if (request.status === "success") {
                console.log('Friend request sent successfully:', request.message);
                resolve(request);
            } else if (request.status === "error") {
                console.error('Error sending friend request:', request.message);
                resolve(request);
            }
        });
    });
    return status;
}

export const receiveFriendRequest = async (userInfo: string): Promise<any> => {
    socket.on('receiveFriendRequest', (response) => {
        const { request } = response;
        if (request.status === "success") {
            console.log('Friend request sent successfully:', request.message);
        } else if (request.status === "error") {
            console.error('Error sending friend request:', request.message);
        }
    });
}

// export const getFriendRequests = async () => {
//     socket.on('friendRequests', (requests) => {
//         return requests;

//     });
//     return [];
// }

export const getFriendRequests = async () => {
    try {
        const request = await ServerAPI.serverAPI_With_Auth.get(`/friends/getFriendRequests`);
        console.log("request", request);
        return request?.data?.friendRequests || [];
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        return { error: errorMessage };
    }
}