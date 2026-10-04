const { Router } = require("express");
const { verifyAuth } = require("../utils/auth");
const { addFavorite, getFavorite, deleteFav } = require("../controllers/favorite-controller");

const router = Router();

router.route("/add").post(verifyAuth, addFavorite);

router.route("/get").get(verifyAuth, getFavorite);

router.route("/delete/:id").delete(verifyAuth, deleteFav);

module.exports = router;