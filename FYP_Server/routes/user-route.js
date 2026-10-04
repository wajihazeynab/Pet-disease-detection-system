const { check } = require("express-validator");
const { userSignup, verifyEmail, userLogin, userUpdate } = require("../controllers/user-controller");
const { Router } = require("express");
const { validateRequest } = require("../utils/validator");
const { verifyAuth } = require("../utils/auth");
const router = Router();

router
  .route("/signup")
  .post(
    check("name").not().isEmpty().withMessage("Please enter a name."),
    check("email").isEmail().withMessage("Please enter a valid email."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validateRequest,
    userSignup
  );

router
  .route("/verify/:userId")
  .get(check("token").isString(), check("userId").isString(), verifyEmail);

router
  .route("/login")
  .post(
    check("email").isEmail().normalizeEmail().isEmpty().withMessage("Please enter a name."),
    check("password").isString(), userLogin);

router.route('/update/:id').put(verifyAuth, userUpdate)

module.exports = router;
