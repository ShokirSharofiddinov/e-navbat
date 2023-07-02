const {Router} = require("express");
const { addSpecSocial, getSpecSocial, updateSpecSocial, deleteSpecSocial } = require("../controllers/spec_social.controller");
const { getSpecSer } = require("../controllers/spec_service.controller");

const router = Router()

router.post("/add", addSpecSocial)
router.get("/", getSpecSocial);
router.put("/:id", updateSpecSocial)
router.delete("/:id", deleteSpecSocial)

module.exports = router