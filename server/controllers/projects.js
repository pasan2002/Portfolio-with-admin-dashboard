const Projects = require("../models/projects")
const {StatusCodes} = require("http-status-codes")
const { BadRequestError, NotFoundError } = require('../errors');
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createProjects = async (req, res) => {
    try{
        if(!req.files || !req.files.image){
            throw new CustomError.BadRequestError("No file to upload")
        }

        const projectImage = req.files.image
        if(!projectImage.mimetype.startsWith("image")){
            throw new CustomError.BadRequestError("Please Upload An Image")
        }

        const maxSize = 1024 * 1024;
        if (projectImage.size > maxSize) {
            throw new CustomError.BadRequestError("Please Upload less than 1mb image");
        }

        const result = await cloudinary.uploader.upload(projectImage.tempFilePath, {
            use_filename: true,
            folder: "portfolio-projects",
        });

        fs.unlinkSync(projectImage.tempFilePath);

        const project = await Projects.create({
            title: req.body.title,
            description: req.body.description,
            imageSrc: result.secure_url,
            skills: req.body.skills,
            demo: req.body.demo,
            source: req.body.source
        });

        res.status(StatusCodes.CREATED).json({ project });
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

const getAllProjects = async (req, res) => {
    const projects = await Projects.find({})
    res.status(StatusCodes.OK).json({projects})
}

const getProject = async (req, res) => {
    const {id: projectId} = req.params

    const project = await Projects.findById(projectId)
    if (!project){
        throw new NotFoundError(`No project with id ${projectId}`)
    }
    res.status(StatusCodes.OK).json({project})
}

const updateProject = async (req, res) => {
    const { id: projectId } = req.params;

    try {
        let imageData;
        if (req.files && req.files.image) {
            const projectImage = req.files.image;
            if (!projectImage.mimetype.startsWith("image")) {
                throw new CustomError.BadRequestError("Please upload an image");
            }

            const maxSize = 1024 * 1024; 
            if (projectImage.size > maxSize) {
                throw new CustomError.BadRequestError("Please upload an image less than 1MB");
            }

            const result = await cloudinary.uploader.upload(projectImage.tempFilePath, {
                folder: "portfolio-projects", 
            });

            imageData = result.secure_url;


            fs.unlinkSync(projectImage.tempFilePath);
        }

        const updatedProjectData = {
            ...(req.body.title && { title: req.body.title }),
            ...(req.body.description && { description: req.body.description }),
            ...(imageData && { imageSrc: imageData }),
            ...(req.body.skills && { skills: req.body.skills }),
            ...(req.body.demo && { demo: req.body.demo }),
            ...(req.body.source && { source: req.body.source }),
        };

        const project = await Projects.findByIdAndUpdate(
            projectId,
            updatedProjectData,
            { new: true, runValidators: true }
        );

        if (!project) {
            throw new NotFoundError(`No project with id ${projectId}`);
        }

        res.status(StatusCodes.OK).json({ project });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
const deleteProject = async (req, res) => {
    const {id:projectId} = req.params

    const project = await Projects.findByIdAndDelete(projectId)
    if(!project){
        throw new NotFoundError(`No project with id ${projectId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createProjects,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,  
}