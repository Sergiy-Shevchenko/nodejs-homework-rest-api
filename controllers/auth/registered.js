import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

const {BASE_URL} = process.env;

const registered = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  // console.log(avatarURL);

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword, verificationCode});

const verifyEmail = {
  to: email,
  subject: "Verifycation email",
  html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target"_blank">Click verify email</a>`, 
};

  await sendEmail(verifyEmail, 
    console.log("Email sent")
    );

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};


export default ctrlWrapper(registered);
