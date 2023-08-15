import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verifycation email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationCode}" target"_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Resend email success'
  })
};

export default ctrlWrapper(resendVerifyEmail);
