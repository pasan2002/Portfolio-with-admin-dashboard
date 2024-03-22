const Skills = require("../models/skills")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")
const CustomError = require("../errors")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

const createSkills = async (req, res) => {
    try{
        if(!req.files || !req.files.image){
            throw new CustomError.BadRequestError("No file to upload")
        }

        const skillImage = req.files.image
        if(!skillImage.mimetype.startsWith("image")){
            throw new CustomError.BadRequestError("Please upload an Image")
        }

        const maxSize = 1024 * 1024 
        if (skillImage.size > maxSize){
            throw new CustomError.BadRequestError("Please upload image less than 1mb")
        }

        const result = await cloudinary.uploader.upload(skillImage.tempFilePath, {
            use_filename: true,
            folder: "portfolio-skills",
        })

        fs.unlinkSync(skillImage.tempFilePath)

        const skill = await Skills.create({
            title:req.body.title,
            imageSrc:result.secure_url
        })

        res.status(StatusCodes.CREATED).json({skill})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const getAllSkills = async (req, res) => {
    try {
        const skills = await Skills.find({});
        if (skills.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No skills found" });
        }
        res.status(StatusCodes.OK).json({ skills });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
    }
};


const getSkill = async (req, res) => {
    const {id: skillId} = req.params

    const skill = await Skills.findById(skillId)
    if(!skill){
        throw new NotFoundError(`No skill with id ${skillId}`)
    }
    res.status(StatusCodes.OK).json({skill})
}

const updateSkill = async (req, res) => {
    const {id:skillId} = req.params

    try{
        let imageData
        if (req.files && req.files.image){
            const skillImage = req.files.image
            if(!skillImage.mimetype.startsWith("image")){
                throw new CustomError.BadRequestError("Please upload an image")
            }

            const maxSize = 1024 * 1024
            if (skillImage.size > maxSize){
                throw new CustomError.BadRequestError("Please upload an image less than 1mb")
            }

            const result = await cloudinary.uploader.upload(skillImage.tempFilePath, {
                use_filename:true,
                folder: "portfolio-skills",
            })

            imageData = result.secure_url

            fs.unlinkSync(skillImage.tempFilePath)

        }

        const updatedSkillData = {
            ...(req.body.title && {title: req.body.title}),
            ...(imageData && {imageSrc:imageData}),
        }

        const skill = await Skills.findByIdAndUpdate(
            skillId,
            updatedSkillData,
            {new:true, runValidators:true}
        )

        if(!skill){
            throw new NotFoundError(`No skill with id ${skillId}`)
        }

        res.status(StatusCodes.OK).json({skill})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const deleteSkill = async (req, res) => {
    const {id:skillId} = req.params

    const skill = await Skills.findByIdAndDelete(skillId)
    if(!skill){
        throw new NotFoundError(`No skill with id ${skillId}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    createSkills,
    getAllSkills,
    getSkill,
    updateSkill,
    deleteSkill,
}