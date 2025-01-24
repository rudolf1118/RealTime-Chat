import jwt from 'jsonwebtoken';

export const removePasswordFromUser = (user: any) => {
    const { password, ...rest } = user.toObject();
    return rest;
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getUserIdFromToken = (token: string): Promise<string> => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as any);
    const user_id = (decoded as any).id;
    return user_id;
}