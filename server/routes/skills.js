const express = require("express")
const router = express.Router()

const {
    createSkills,
    getAllSkills,
    getSkill,
    updateSkill,
    deleteSkill,
} = require("../controllers/skills")

router.route("/").post(createSkills).get(getAllSkills)
router.route("/:id").get(getSkill).patch(updateSkill).delete(deleteSkill)


module.exports = router