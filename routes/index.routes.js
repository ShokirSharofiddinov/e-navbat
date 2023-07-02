const { Router } = require("express");

const clientRouter = require("./client.routes");
const otpRouter = require("./otp.routes")
const serviceRouter = require("./service.routes")
const specialistRouter = require("./specialist.routes")
const specSer = require("./spec_service.routes")
const adminRouter = require("./admin.routes")
const queueRouter = require("./queue.routes")
const socialRouter = require("./social.routes")
const specWorkingDay = require("./spec_working_day.routes")
const specSocial = require("./spec_social.routes")
const router = Router();

router.use("/client", clientRouter);
router.use("/otp", otpRouter)
router.use("/service", serviceRouter)
router.use("/spec", specialistRouter)
router.use("/specSer", specSer);
router.use("/admin", adminRouter);
router.use("/queue", queueRouter)
router.use("/social", socialRouter)
router.use("/specWorkingDay", specWorkingDay)
router.use("/specSocial", specSocial)

module.exports = router;