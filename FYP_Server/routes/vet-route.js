const { check } = require("express-validator");
const { vetSignup, vetLogin, vetAll, vetUpdate, getSlot, addAppointment, updateAppointment, AppointmentReceive } = require("../controllers/vet-controller");
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
    vetSignup
  );

router
  .route("/login")
  .post(check("email").isEmail().normalizeEmail(), check("password").isString(), vetLogin);

router.route('/update/:id').put(verifyAuth, vetUpdate)

router.route("/all").get(vetAll)

router.route("/getslot").get(verifyAuth, getSlot)

router.route('/addappoint').post(verifyAuth, addAppointment)

router.route('/updateappoint/:id').put(verifyAuth, updateAppointment)

router.route("/appointment_receive").get(verifyAuth, AppointmentReceive)

module.exports = router;
