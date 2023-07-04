const {Router} = require("express")
const { addClient, getClient, updateClient, deleteClient } = require("../controllers/client.controller");
const clientPolice = require("../middleware/clientPolice");


const router = Router()

router.post("/add", addClient)
router.get("/", clientPolice, getClient);
router.put("/:id", updateClient)
router.delete("/:id", deleteClient)

module.exports = router