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