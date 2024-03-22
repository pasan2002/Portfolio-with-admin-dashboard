import React from "react"
import styles from "../components/CreateProject.module.css"
import axios from "axios"
import { FaWindowClose } from "react-icons/fa";

export default function CreateProject({ hideCreateProject }){
    const [projectData, setProjectData] = React.useState({
        title: "",
        skills: "",
        demo: "",
        source: "",
        description: "",
        image: null
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    const handleProjectFormChange = (e) =>{
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setProjectData({
            ...projectData,
            image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const token = localStorage.getItem("jwtToken")
    
        
            const formData = new FormData()
            formData.append("image", projectData.image)
            formData.append("title", projectData.title)  
            formData.append("skills", projectData.skills)
            formData.append("demo", projectData.demo)
            formData.append("source", projectData.source)
            formData.append("description", projectData.description)
    
            const response = await axios.post("http://localhost:3000/api/v1/projects", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            })
            setSuccessMessage("Project created successfully.");
            console.log(response.data);
        }catch(error){
            console.error(error.response.data)
            setNotSuccessMessage("Error creating project. Please try again.");
        }
    }
    return(
        <div id="createproject" className={styles.CreateProjectcontainer}>
            <FaWindowClose onClick={hideCreateProject} className={styles.closeIcon}/>
            <h1 className={styles.header}>Create New Project</h1>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {notSuccessMessage && <div className={styles.notSuccessMessage}>{notSuccessMessage}</div>}
            <form  onSubmit={handleSubmit} className={styles.projectForm}>
                <label htmlFor="title" className={styles.projectlabel}>Enter the title: </label>
                <input 
                type="text" 
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleProjectFormChange}
                className={styles.input}
                required
                />
                <label htmlFor="skills" className={styles.projectlabel}>Enter the skills: </label>
                <input 
                type="text" 
                id="skills"
                name="skills"
                placeholder="React, Node"
                value={projectData.skills}
                onChange={handleProjectFormChange}
                className={styles.input}
                required
                />
                <label htmlFor="demo" className={styles.projectlabel}>Enter link for demo project: </label>
                <input 
                type="url" 
                id="demo"
                name="demo"
                value={projectData.demo}
                onChange={handleProjectFormChange}
                className={styles.input}
                required
                />
                <label htmlFor="source" className={styles.projectlabel}>Enter link for source code: </label>
                <input 
                type="url" 
                id="source"
                name="source"
                value={projectData.source}
                onChange={handleProjectFormChange}
                className={styles.input}
                required
                />
                <label htmlFor="description" className={styles.projectlabel}>Enter the description: </label>
                <textarea 
                name="description" 
                cols="30" rows="10"
                value={projectData.description}
                onChange={handleProjectFormChange}
                className={styles.textArea}
                required
                ></textarea>
                <label htmlFor="image" className={styles.projectlabel}>Upload image: </label>
                <input 
                type="file" 
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.choseFile}
                required
                />
                <div className={styles.button}>
                    <button type="submit" className={styles.submit}>Create</button>
                </div>
            </form>
        </div>
    )
}
