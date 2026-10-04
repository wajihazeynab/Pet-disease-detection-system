const Pet = require("../models/pet");
const HttpError = require("../utils/http-error");
const formidable = require('formidable')
const fs = require('fs')
// const js =require('../../client/src/assets/petImages')

async function getUserPets(req, res) {
  const { authUser } = req;

  let pets;
  try {
    pets = await Pet.find({ owner: authUser._id });
    console.log('first')
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }
  return res.status(200).json(pets);
}

async function getSinglePet(req, res, next) {
  const petId = req.params.id;
  let pet;
  try {
    pet = await Pet.findById(petId);
    if (!pet) {
      const error = HttpError.notFound("Pet not found");
      return next(error);
    }
  } catch (err) {
    const error = HttpError.internal();
    return next(error);
  }
  return res.status(200).json(pet);
}

async function addPet(req, res, next) {
  const { authUser } = req;
  console.log("bbody", req.body)
  let saveFile = '';
  try {
    const { name, gender, category, breed, age, weight, height, image, type } = req.body
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

    newPet = new Pet({ owner: authUser._id, name, gender, category, breed, age, weight, height, image: saveFile });
    await newPet.save();

  } catch (err) {
    console.log(err)
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  // return res.status(200).json(newPet);
  return res.status(200).json('donee');
}

async function editPet(req, res, next) {
  const petId = req.params.id;
  let pet;

  try {
    pet = await Pet.findByIdAndUpdate(petId, req.body, { new: true });
    if (!pet) {
      // const error = HttpError.notFound("Pet not found");
      return res.status(400).json("Pet not found")
    }
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  res.status(200).json(pet);
}

async function deletePet(req, res, next) {
  const petId = req.params.id;
  let pet;

  try {
    pet = await Pet.findByIdAndDelete(petId);
    if (!pet) {
      // const error = HttpError.notFound("Pet not found");
      return res.status(400).json("Pet not found")
    }
  } catch (err) {
    // const error = HttpError.internal();
    return res.status(500).json(err.message)
  }

  return res.status(200).json("Pet Deleted");
}

module.exports = { addPet, editPet, deletePet, getUserPets, getSinglePet };
