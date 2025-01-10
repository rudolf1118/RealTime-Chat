import jwt from 'jsonwebtoken';
import config from '../tokenGeneration/config';

function verifySocketToken(socket:any, next:any) {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error('Access denied: No token provided'));
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return next(err);
            socket.data.username = decoded.username;
            socket.data.role = decoded.role;
            next();
        });
    } catch (error) {
        console.log("invalid token", error);
        next(error);
    }
}

export default verifySocketToken;