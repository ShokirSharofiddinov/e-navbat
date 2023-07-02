const {Router} = require("express");
const { addWorkingDay, getWorkingDay, updateWorkingDay, deleteWorkingDay } = require("../controllers/spec_working_day.controller");

const router = Router()

router.post("/add", addWorkingDay)
router.get("/", getWorkingDay);
router.put("/:id", updateWorkingDay)
router.delete("/:id", deleteWorkingDay)

module.exports = router