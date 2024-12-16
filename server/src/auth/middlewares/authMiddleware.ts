import jwt from 'jsonwebtoken';
import config from '../tokenGeneration/config';

function verifyToken(req: any, res: any, next: any) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, config.secret) as jwt.JwtPayload; 
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

export default verifyToken;