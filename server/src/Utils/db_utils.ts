import User from "../models/userModel";

export async function checkDuplicate(email: string, username: string):Promise<any> {
    const checkForEmail = await User.findOne({email});
    const checkForUsername = await User.findOne({username});
    if (checkForEmail && checkForUsername) {
        return {
            email_error: "Email already exists",
            username_error: "Username already exists"
        }
    }
    else if (checkForEmail) {
        return  {
            email_error: "Email already exists",
            username_error: ""
        }
    }
    else if (checkForUsername) {
        return {
            email_error: "",
            username_error: "Username already exists"
        }
    }
    return {
        email_error: "",
        username_error: ""
    };
}