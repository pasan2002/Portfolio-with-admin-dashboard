const mongoose = require("mongoose")

const ProjectsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please provide a project title."],
    },
    imageSrc:{
        type:String,
        required:[true, "Please provide a Screenshot"],
    },
    description:{
        type:String,
        required:[true, "Please provide a brief description about the project"]
    },
    skills:{
        type:[String],
        required:[true, "Please enter Skills you used for this project"]
    },
    demo: {
        type: String,
        required: [true, "Please enter the demo link"]
    },
    source: {
        type: String,
        required: [true, "Please enter the repo link"]
    }
})

module.exports = mongoose.model("Projects", ProjectsSchema)