const {Router} = require("express");
const { addQueue, getQueue, updateQueue, deleteQueue } = require("../controllers/queue.controller");

const router = Router()

router.post("/add", addQueue)
router.get("/", getQueue);
router.put("/:id", updateQueue)
router.delete("/:id", deleteQueue)

module.exports = router