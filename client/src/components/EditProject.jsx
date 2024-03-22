import React, { useState, useEffect } from "react"
import styles from "../components/EditProject.module.css"
import axios from "axios"
import { MdDelete } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa";

export default function EditProject({ project, hideEditProject }) {
    
    const [imageSrc, setImageSrc] = useState(null)
    const [projectData, setProjectData] = useState({
        title: project.title || "",
        skills: project.skills || "",
        demo: project.demo || "",
        source: project.source || "",
        description: project.description || "",
    })
    const [successMessage, setSuccessMessage] = useState("")
    const [notSuccessMessage, setNotSuccessMessage] = useState("")

    useEffect(() => {
        if (project.imageSrc) {
            setImageSrc(project.imageSrc)
        }
    }, [project])

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteImage = () => {
        setImageSrc(null)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", projectData.title);
            formData.append("skills", projectData.skills);
            formData.append("demo", projectData.demo);
            formData.append("source", projectData.source);
            formData.append("description", projectData.description);
    
            if (imageSrc) {
                const file = await fetch(imageSrc);
                const blob = await file.blob();
                formData.append("image", blob, "image.png");
            }
    
            const token = localStorage.getItem("jwtToken");
            const response = await axios.patch(
                `http://localhost:3000/api/v1/projects/${project._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            
            console.log("Response from backend:", response.data);
    
            if (response.data.project && response.data.project.imageSrc) {
                setImageSrc(response.data.project.imageSrc);
                console.log("New image source:", response.data.project.imageSrc);
            }
    
            console.log("Project updated successfully:", response.data);
            setSuccessMessage("Project updated successfully.");
        } catch (error) {
            console.error("Error updating project:", error);
            setNotSuccessMessage("Error updating project. Please try again.");
        }
    };
    
    

    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value,
        })
    }

    const handleClose = () => {
        hideEditProject()
    }

    return (
        <div id="editproject" className={styles.container}>
            <FaWindowClose onClick={handleClose} className={styles.closeIcon}/>
            <h1 className={styles.header}>Edit Projects</h1>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {notSuccessMessage && <div className={styles.notsuccessMessage}>{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className={styles.EditprojectForm}>
                <label htmlFor="title" className={styles.label}>Title : </label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={projectData.title}
                    onChange={handleChange}
                    className={styles.input}
                    required 
                />
                <label htmlFor="skills" className={styles.label}>Skills : </label>
                <input 
                    type="text" 
                    id="skills" 
                    name="skills" 
                    value={projectData.skills}
                    onChange={handleChange}
                    className={styles.input}
                    required 
                />
                <label htmlFor="description" className={styles.label}>Description : </label>
                <textarea 
                    id="description" 
                    name="description" 
                    value={projectData.description}
                    cols="30" rows="10"
                    onChange={handleChange}
                    required 
                    className={styles.textArea}
                ></textarea>
                <label htmlFor="demo" className={styles.label}>Demo : </label>
                <input 
                    type="url" 
                    id="demo" 
                    name="demo" 
                    value={projectData.demo}
                    onChange={handleChange}
                    required
                    className={styles.input} 
                />
                <label htmlFor="source" className={styles.label}>Source : </label>
                <input 
                    type="url" 
                    id="source" 
                    name="source" 
                    value={projectData.source}
                    onChange={handleChange}
                    required 
                    className={styles.input} 
                />
                <div className={styles.ImageContainer}>
                    {imageSrc && <img src={imageSrc} alt="Project Preview" className={styles.image}/>}
                    <div className={styles.icon}>
                        {imageSrc && <MdDelete onClick={handleDeleteImage} className={styles.deleteIcon}/>}
                    </div>
                </div>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.choseFile}
                />
                <div className={styles.button}>
                    <button type="submit" className={styles.save}>Save</button>
                </div>
            </form>
        </div>
    )
}
