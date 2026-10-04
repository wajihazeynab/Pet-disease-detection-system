const { Router } = require("express");
const { verifyAuth } = require("../utils/auth");
const { addPet, editPet, deletePet, getUserPets, getSinglePet } = require("../controllers/pet-controller");

const router = Router();

router.route("/").get(verifyAuth, getUserPets);

router.route("/:id").get(verifyAuth, getSinglePet);

router.route("/add").post(verifyAuth, addPet);

router.route("/edit/:id").put(verifyAuth, editPet);

router.route("/delete/:id").delete(verifyAuth, deletePet);

module.exports = router;
