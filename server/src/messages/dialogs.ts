import Message from "../auth/utils/models/Messages";

class Dialogs {
    async getDialogs(req, res) {
        const dialogs = await Message.find();
        return res.json(dialogs);
    }
}