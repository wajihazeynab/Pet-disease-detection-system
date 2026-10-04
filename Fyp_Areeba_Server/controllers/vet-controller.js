const bcrypt = require("bcrypt");
const HttpError = require("../utils/http-error");
const { randomBytes } = require("crypto");
const Vet = require("../models/Vet");
const { generateAuthToken } = require("../utils/auth");
const { sendEmail } = require("../utils/email");
const Token = require("../models/token");
const TimeSlot = require("../models/timeSlot");
const Appointment = require("../models/appointment");
const fs = require('fs')

async function vetSignup(req, res, next) {
  const { name, email, password, phone, address, licenseNumber, specialization, workingHours, fcmToken } =
    req.body;
  let vet;
  try {
    vet = await Vet.findOne({ email });

    if (vet) {
      return res.status(400).json("Vet already exists with this email. Please Login to continue.")
      // next(
      //   new HttpError(422, "Vet already exists with this email. Please Login to continue.")
      // );
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    vet = new Vet({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      licenseNumber,
      specialization,
      workingHours,
      fcmToken
    });
    await vet.save();

    const randBytes = randomBytes(64).toString("hex");
    let setToken = await Token.create({
      token: randBytes,
      userId: vet.id,
    });

    if (setToken) {
      sendEmail({
        receiver: email,
        subject: "Account created successfully. Please verify your email",
        html: `<h1>Account created successfully. Please verify your email</h1><br/><a href="http://${process.env.IP_ADDRESS}:${process.env.PORT}/user/verify/${setToken.userId}?token=${setToken.token}">Click here to verify your email</a>`,
      });
    }

  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message)
  }

  const { password: _, ...vetWithoutPassword } = vet.toObject({ getters: true });
  res.status(200).json(vetWithoutPassword);
}

async function vetUpdate(req, res) {
  const id = req.params.id;
  const { name, email, password, newPassword, phone, address, licenseNumber, specialization, workingHours, image, type } =
    req.body;
  let vet;
  let newVet;
  let saveFile = ''
  try {
    vet = await Vet.findOne({ email });

    console.log(password, "new", newPassword)
    if (!bcrypt.compareSync(password, vet.password)) {
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


    vet = await Vet.findByIdAndUpdate(id, {
      name,
      password: hashedPassword ? hashedPassword : vet.password,
      phone,
      address,
      licenseNumber,
      specialization,
      workingHours,
      image: saveFile
    })

    newVet = await Vet.findById(id)
    // const randBytes = randomBytes(64).toString("hex");
    // let setToken = await Token.create({
    //   token: randBytes,
    //   userId: vet.id,
    // });

    // if (setToken) {
    //   sendEmail({
    //     receiver: email,
    //     subject: "Account created successfully. Please verify your email",
    //     html: `<h1>Account created successfully. Please verify your email</h1><br/><a href="http://${process.env.IP_ADDRESS}:${process.env.PORT}/user/verify/${setToken.userId}?token=${setToken.token}">Click here to verify your email</a>`,
    //   });
    // }

  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message)
  }
  const { accessToken } = generateAuthToken(newVet);
  const { password: _, ...vetWithoutPassword } = newVet.toObject({ getters: true });
  res.status(200).json({ ...vetWithoutPassword, type: 'vet', accessToken });
}

async function vetLogin(req, res, next) {
  const { email, password } = req.body;

  let vet;
  try {
    vet = await Vet.findOne({ email });

    if (!vet) {
      return next(new HttpError(404, "Invalid Credentials."));
    }

    if (!vet.isVerified) {
      return next(new HttpError(401, "Your Account is not verified yet."));
    }

    if (!bcrypt.compareSync(password, vet.password)) {
      return next(new HttpError(401, "Invalid credentials"));
    }
  } catch (err) {
    const error = HttpError.internal();
    return next(error);
  }

  const { password: _, ...vetWithoutPassword } = vet.toObject({ getters: true });

  const { accessToken } = generateAuthToken(vet);

  res.status(200).json({ ...vetWithoutPassword, accessToken });
}

async function vetAll(req, res) {

  let vet;
  try {
    vet = await Vet.find();
    console.log(vet)
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  res.status(200).json(vet);
}

async function getSlot(req, res) {
  const { date } = req.query;
  try {
    slot = await TimeSlot.find({ date: date });

  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  res.status(200).json(slot);
}

async function addAppointment(req, res) {
  const { authUser } = req;
  const { vetId, date, timeslots, time, description } = req.body
  try {
    const addslot = new TimeSlot({
      date: date,
      timeslots: timeslots,
    })
    await addslot.save()
    const addApp = new Appointment({
      vetId: vetId,
      customerId: authUser._id,
      appointmentdate: date,
      appointmenttimeSlot: time,
      description: description,
      status: 'pending',
    })
    await addApp.save()
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  res.status(200).json("Addedd Successfully");
}

async function updateAppointment(req, res) {
  const { id } = req.params
  const { authUser } = req;
  const { vetId, date, timeslots, time, description } = req.body
  try {
    const updSlot = await TimeSlot.findByIdAndUpdate(id, {
      date: date,
      timeslots: timeslots,
    })
    const addApp = new Appointment({
      vetId: vetId,
      customerId: authUser._id,
      appointmentdate: date,
      appointmenttimeSlot: time,
      description: description,
      status: 'pending',
    })
    await addApp.save()
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  res.status(200).json("Addedd Successfully");
}

async function AppointmentReceive(req, res) {

  const { authUser } = req;
  console.log('first', authUser)
  try {
    // const result = await Appointment.find({ vetId: authUser._id })
    const result = await Appointment.aggregate([
      // {
      //   $match: {
      //     vetId: authUser._id // Specify the ID of the vet you want to match
      //   }
      // },
      {
        $lookup: {
          from: 'users',
          localField: 'customerId',
          foreignField: '_id',
          as: 'userData',
        }
      },
      {
        $lookup: {
          from: 'vets',
          localField: 'vetId',
          foreignField: '_id',
          as: 'vetData',
        }
      },
    ]);
    console.log(result)
    let arr = result.filter(e => e.vetId == authUser._id || e.customerId == authUser._id)
    return res.status(200).json(arr);
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }


}


module.exports = {
  vetSignup,
  vetLogin,
  vetAll,
  vetUpdate,
  getSlot,
  addAppointment,
  updateAppointment,
  AppointmentReceive
};
