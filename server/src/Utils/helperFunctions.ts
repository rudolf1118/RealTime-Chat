export const removePasswordFromUser = (user: any) => {
    const { password, ...rest } = user.toObject();
    return rest;
}