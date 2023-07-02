const {Router} = require("express");
const { addOtp, getOtp, updateOtp, deleteOtp } = require("../controllers/otp.controller");

const router = Router()

router.post("/add", addOtp)
router.get("/", getOtp);
router.put("/:id", updateOtp)
router.delete("/:id", deleteOtp)

module.exports = router