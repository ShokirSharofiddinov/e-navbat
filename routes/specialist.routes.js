const {Router} = require("express");
const { addSpecialist, getSpecialist, updateSpecialist, deleteSpecialist } = require("../controllers/specialist.controller");

const router = Router()

router.post("/add", addSpecialist)
router.get("/", getSpecialist);
router.put("/:id", updateSpecialist)
router.delete("/:id", deleteSpecialist)

module.exports = router