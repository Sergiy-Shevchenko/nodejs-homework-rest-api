import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";
import { HttpError } from "../../helpers/index.js";


const verify = async(req, res) => {
    const {verificationCode} = req.params;
    if(!user) {
        throw HttpError(404, 'Email not found')
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ''});

    res.json({
        message: 'Verify success'
    })
}

export default  ctrlWrapper(verify);

