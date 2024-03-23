const express = require("express")
const router = express.Router()

const {
    createHistory,
    getAllHistory,
    getHistory,
    updateHistory,
    deleteHistory,
} = require("../controllers/history")

router.route("/").post(createHistory).get(getAllHistory)
router.route("/:id").get(getHistory).delete(deleteHistory).patch(updateHistory)


module.exports = router