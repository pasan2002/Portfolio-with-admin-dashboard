const History = require("../models/history")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")
const CustomError = require("../errors")
const cloudinary = require("cloudinary").v2
const fs = require("fs")


const createHistory = async (req, res) => {
    try{
        if(!req.files || !req.files.image){
            throw new CustomError.BadRequestError("No file to upload")
        }

        const historyImage = req.files.image
        if(!historyImage.mimetype.startsWith("image")){
            throw new CustomError.BadRequestError("Please upload an Image")
        }

        const maxSize = 1024 * 1024
        if(historyImage.size > maxSize){
            throw new CustomError.BadRequestError("Please upload image less than 1mb")
        }

        const result = await cloudinary.uploader.upload(historyImage.tempFilePath, {
            use_filename: true,
            folder: "portfolio-history"
        })

        fs.unlinkSync(historyImage.tempFilePath)


        const history = await History.create({
            role:req.body.role,
            organization:req.body.organization,
            startdate:req.body.startdate,
            enddate:req.body.enddate,
            experiences:req.body.experiences,
            imageSrc:result.secure_url
        })

        res.status(StatusCodes.CREATED).json({history})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const getAllHistory = async (req, res) => {
    try{
        const history = await History.find({})
        if(history.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({msg:"No histories found"})
        }
        res.status(StatusCodes.OK).json({history}) 
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
    }
}

const getHistory = async (req, res) => {
    const {id: historyId} = req.params

    const history = await History.findById(historyId)
    if(!history){
        throw new NotFoundError(`No history with id ${historyId}`)
    }
    res.status(StatusCodes.OK).json({history})
}

const updateHistory = async (req, res) => {
    const {id:historyId} = req.params

    try{
        let imageData
        if (req.files && req.files.image){
            const historyImage = req.files.image
            if(!historyImage.mimetype.startsWith("image")){
                throw new CustomError.BadRequestError("Please Upload an image")
            }

            const maxSize = 1024 * 1024
            if(historyImage.size > maxSize){
                throw new CustomError.BadRequestError("Please upload an image less than 1mb")
            }

            const result = await cloudinary.uploader.upload(historyImage.tempFilePath, {
                use_filename:true,
                folder: "portfolio-history",
            })

            imageData = result.secure_url

            fs.unlinkSync(historyImage.tempFilePath)
        }

        const updateHistoryData = {
            ...(req.body.role && {role: req.body.role}),
            ...(req.body.organization && {organization:req.body.organization}),
            ...(req.body.startdate && {startdate:req.body.startdate}),
            ...(req.body.enddate && {enddate:req.body.enddate}),
            ...(req.body.experiences && {experiences:req.body.experiences}),
            ...(imageData && {imageSrc:imageData}),
        }

        const history = await History.findByIdAndUpdate(
            historyId,
            updateHistoryData,
            {new:true, runValidators:true}
        )

        if(!history){
            throw new NotFoundError(`No history with id ${historyId}`)
        }

        res.status(StatusCodes.OK).json({history})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const deleteHistory = async (req, res) => {
    const {id:historyId} = req.params

    const history = await History.findByIdAndDelete(historyId)
    if(!history){
        throw new NotFoundError(`No history with id ${historyId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createHistory,
    getAllHistory,
    getHistory,
    deleteHistory,
    updateHistory,
}