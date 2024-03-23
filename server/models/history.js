const mongoose = require("mongoose")

const HistorySchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true, "Please Enter Your role"]
    },
    organization:{
        type:String,
        require:[true, "Please Enter the Organization"]
    },
    startdate:{
        type:String,
        require:[true, "Please enter the starting date"]
    },
    enddate:{
        type:String,
        require:[true, "Please enter the ending date"]
    },
    experiences:{
        type:Array,
        require:[true, "Please enter your experiences"]
    },
    imageSrc:{
        type:String,
        require:[true, "Please upload an Image"]
    }
})

module.exports = mongoose.model("History", HistorySchema)