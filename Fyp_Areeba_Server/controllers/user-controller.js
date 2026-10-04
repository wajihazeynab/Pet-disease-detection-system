const bcrypt = require("bcrypt");
const HttpError = require("../utils/http-error");
const { randomBytes } = require("crypto");
const Token = require("../models/token");
const { sendEmail } = require("../utils/email");
const { generateAuthToken } = require("../utils/auth");
const User = require("../models/user");
const fs = require('fs')
const Vet = require("../models/Vet");
require("dotenv").config();

async function userSignup(req, res, next) {
  const { name, email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already exists with this email.")
      // new HttpError(422, "User already exists with this email. Please Login to continue.")
      // );
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const randBytes = randomBytes(64).toString("hex");

    user = new User({
      name,
      email,
      password: hashedPassword,
      
    });

    await user.save();

    let setToken = await Token.create({
      token: randBytes,
      userId: user.id,
    });

    if (setToken) {
      // sendEmail({
      //   receiver: email,
      //   subject: "Account created successfully. Please verify your email",
      //   html: `<h1>Account created successfully. Please verify your email</h1><br/><a href="http://${process.env.IP_ADDRESS}:${process.env.PORT}/user/verify/${setToken.userId}?token=${setToken.token}">Click here to verify your email</a>`,
      // });
    }
  } catch (err) {
    // const error = HttpError.internal();/
    console.log(err)
    return res.status(500).json(err.message)
  }

  const { password: _, ...userWithoutPassword } = user.toObject({ getters: true });
  res.status(200).json(userWithoutPassword);
}

async function userUpdate(req, res) {
  const id = req.params.id;
  const { name, email, password, newPassword, image, type } = req.body;
  let user;
  let updUser;
  let saveFile = ''
  try {
    // user = await User.find({ $and: [{ email: { $eq: email } }, { _id: { $ne: id } }] });
    // if (user) {
    //   return res.status(400).json("Email already exists with this email please try another.")
    //   // new HttpError(422, "User already exists with this email. Please Login to continue.")
    //   // );
    // }
    user = await User.findById(id)
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json('Invalid Password.')
    }
    if (image) {
      const decodedImage = Buffer.from(image, 'base64');
      saveFile = Math.floor(Math.random() * 100000) + '.' + type
      console.log(decodedImage)
      const newPath = __dirname + `/../images/${saveFile}`
      fs.writeFile(newPath, decodedImage, (err) => {
        if (err) {

        } else {
          console.log('Image saved successfully');
          const imageUrl = `/images/decoded-image.jpg`;
          // res.json({ imageUrl });
        }
      });
    }

    let hashedPassword = null
    if (newPassword != '') {
      hashedPassword = bcrypt.hashSync(newPassword, 12);
    }


    const randBytes = randomBytes(64).toString("hex");

    updUser = await User.findByIdAndUpdate(id, {
      name,
      password: hashedPassword ? hashedPassword : user.password,
      image: saveFile
    })
    user = await User.findById(id)

  } catch (err) {
    // const error = HttpError.internal();/
    console.log(err)
    return res.status(500).json(err.message)
  }

  const { accessToken } = generateAuthToken(user);
  const { password: _, ...userWithoutPassword } = user.toObject({ getters: true });
  res.status(200).json({ ...userWithoutPassword, type: 'customer', accessToken });
}

async function verifyEmail(req, res, next) {
  const { token } = req.query;
  const { userId } = req.params;

  let user;
  try {
    const getToken = await Token.findOne({ token, userId });
    user = await User.findById(userId);
    if (!user) {
      user = await Vet.findById(userId);
    }
    if (user?.isVerified) {
      // const url = new URL("http://localhost:5000/auth/signin?verified=true");
      return res.status(200).json("you already verifyed")
    }

    if (!getToken) {
      return res.status(400).json("Invalid token")
    }

    if (!user) {
      // return next(new HttpError(404, "User not found"));
      return res.status(400).json("User not found")
    }

    user.isVerified = true;

    await user.save();

    await Token.findByIdAndDelete(getToken.id);
  } catch (err) {
    return res.status(400).json(err.message)

    // return next(error);
  }

  // const { accessToken } = generateAuthToken(user);

  // const { password: _, ...userWithoutPassword } = user.toObject({ getters: true });

  return res.status(200).json("Your Account isi verify please login on app");
}

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let type = 'customer'
  let user;
  try {
    console.log('no', email)
    user = await User.findOne({ email });
    if (!user) {
      console.log('no', email)
      user = await Vet.findOne({ email });
      if (!user) {
        return res.status(400).json('Invalid Credentials.')
      }
      else {
        type = 'vet'
      }
    }

    if (!user.isVerified) {
      return res.status(400).json('Please verify your Email.')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json('Invalid Credentials.')
    }
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  const { accessToken } = generateAuthToken(user);

  const { password: _, ...userWithoutPassword } = user.toObject({ getters: true });

  res.status(200).json({ ...userWithoutPassword, type, accessToken });
}

module.exports = {
  userSignup,
  verifyEmail,
  userLogin,
  userUpdate
};
