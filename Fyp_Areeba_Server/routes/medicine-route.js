const { Router } = require("express");
const { verifyAuth } = require("../utils/auth");
const { addMedicine, getMedicine, editMed, deleteMed } = require("../controllers/nedicine-controller");

const router = Router();

router.route("/add").post(verifyAuth, addMedicine);

router.route("/get/:frequency").get(verifyAuth, getMedicine);

router.route("/edit/:id").put(verifyAuth, editMed);

router.route("/delete/:id").delete(verifyAuth, deleteMed);

module.exports = router;