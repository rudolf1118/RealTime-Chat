export const removePasswordFromUser = (user: any) => {
    const { password, ...rest } = user.toObject();
    return rest;
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}