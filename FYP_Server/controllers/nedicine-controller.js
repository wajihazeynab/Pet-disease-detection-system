const Medicine = require("../models/medicine");


async function getMedicine(req, res) {
    const { authUser } = req;

    let medicine;
    try {
        medicine = await Medicine.find({ owner: authUser._id, frequency: req.params.frequency });
    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }
    return res.status(200).json(medicine);
}

async function addMedicine(req, res, next) {
    const { authUser } = req;

    let newMed;

    try {
        // const form = formidable({ multiples: true })
        // form.parse(req, (err, fields, files) => {
        const { name, frequency, dose, schedule, date, pet } = req.body;

        newMed = new Medicine({ owner: authUser._id, pet, frequency, dose, schedule, date, name });
        await newMed.save();
        // })

    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }

    return res.status(200).json(newMed);
}

async function editMed(req, res) {
    const medId = req.params.id;
    let med;

    try {
        med = await Medicine.findByIdAndUpdate(medId, req.body, { new: true });
        if (!med) {
            // const error = HttpError.notFound("Pet not found");
            return res.status(400).json("Medicine not found")
        }
    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }

    res.status(200).json(med);
}

async function deleteMed(req, res, next) {
    const medId = req.params.id;
    let med;

    try {
        med = await Medicine.findByIdAndDelete(medId);
        if (!med) {
            // const error = HttpError.notFound("Pet not found");
            return res.status(400).json("Pet not found")
        }
    } catch (err) {
        // const error = HttpError.internal();
        return res.status(500).json(err.message)
    }
    return res.status(200).json("Medicine Deleted");
}

module.exports = { addMedicine, getMedicine, editMed, deleteMed };