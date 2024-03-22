const express = require("express")
const router = express.Router()

const {
    createProjects,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject
} = require("../controllers/projects")


router.route("/").post(createProjects).get(getAllProjects)
router.route("/:id").get(getProject).delete(deleteProject).patch(updateProject)

module.exports = router