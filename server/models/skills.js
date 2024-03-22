const mongoose = require("mongoose")

const SkillsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please provide a title"]
    },
    imageSrc:{
        type:String,
        required:[true, "Please provide a image"]
    }
})

module.exports = mongoose.model("Skills", SkillsSchema)