const express = require("express")
const router = express.Router()

const {
    getAllProjects,
} = require("../controllers/projects")

const {
    getAllSkills,
} = require("../controllers/skills")

const{
    getAllHistory,
}=require("../controllers/history")

router.route("/").get(getAllProjects)
router.route("/publicskills").get(getAllSkills)
router.route("/publichistory").get(getAllHistory)

module.exports = router
