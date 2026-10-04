const Vet = require("../models/Vet");
const HttpError = require("../utils/http-error");

async function verifyVet(req, res, next) {
  const { id } = req.params;

  let vet;

  try {
    vet = await Vet.findById(id);

    if (!vet) {
      return next(new HttpError(404, "Vet not found"));
    }

    vet.isVerified = true;

    await vet.save();
  } catch (err) {
    const error = HttpError.internal();

    return next(error);
  }
}

module.exports = { verifyVet };
