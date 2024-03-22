const express = require("express")
const router = express.Router()

const {
    getAllProjects,
} = require("../controllers/projects")

const {
    getAllSkills,
} = require("../controllers/skills")


router.route("/").get(getAllProjects)
router.route("/publicskills").get(getAllSkills)

module.exports = router