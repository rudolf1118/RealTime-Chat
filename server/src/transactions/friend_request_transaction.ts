import  mongoose  from 'mongoose';
import Users from '../models/userModel';
import FriendRequest from '../models/friendRequestModel';

export const acceptFriendRequestTransaction = async (requestId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const friendRequest = await FriendRequest.findByIdAndUpdate(requestId);
        if (!friendRequest) {
            throw new Error('Friend request not found');
        }
        const {senderId, receiverId} = friendRequest;
        await Users.updateOne(
            { _id: receiverId },
            { $pull: { friendRequests: { senderId } } }
        ).session(session);
        await session.commitTransaction();
        session.endSession();
        return friendRequest;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}