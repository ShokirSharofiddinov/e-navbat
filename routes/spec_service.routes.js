const { Router } = require("express");
const { addSpecSer, getSpecSer, updateSpecSer, deleteSpecSer } = require("../controllers/spec_service.controller");


const router = Router();

router.post("/add", addSpecSer);
router.get("/", getSpecSer);
router.put("/:id", updateSpecSer);
router.delete("/:id", deleteSpecSer);

module.exports = router;
