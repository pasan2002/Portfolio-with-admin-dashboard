import React, { useEffect } from "react"
import styles from "../components/PrivateRoute.module.css"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import { MdEditNote } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import { MdCreateNewFolder } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import CreateProject from "./CreateProject"
import EditProject from "./EditProject"
import SkillsEditor from "./SkillsEditor"

export default function PrivateRoute() {
const [projects, setProjects] = React.useState([])
const [showCreateProject, setShowCreateProject] = React.useState(false)
const [editingProject, setEditingProject] = React.useState(null)
const [showSkillsEditor, setShowSkillsEditor] = React.useState(false)
const navigate = useNavigate()

useEffect(() => {
    const token = localStorage.getItem("jwtToken")

    const getAllProject = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/projects", {
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials:true
            },
            credentials:"include"
        })
        setProjects(response.data.projects)
    } catch (error) {
        console.log("Error fetching projects:", error)
    }
    }
    
    if (token) {
        getAllProject()
    }else{
        navigate("/adminlogin", { replace: true })
    }

}, [navigate])

const deleteProject = async (_id) => {
    try{
        const token = localStorage.getItem("jwtToken")
        await axios.delete(`http://localhost:3000/api/v1/projects/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials:true
            },
            credentials:"include"
        })
        console.log("Post Deleted: ", _id)

        setProjects(projects.filter((project) => project._id !== _id))
    }catch(error){
        console.error("Error deleting post:", error)
    }
}

const handleDelete = (_id) => {
    deleteProject(_id)
}

const handleEdit = (project) => {
    setEditingProject(project)
}

const handleLogoutOnClose = () => {
    localStorage.removeItem("jwtToken")
}

window.addEventListener("beforeunload", handleLogoutOnClose)

if(!localStorage.getItem("jwtToken")){
    return <Navigate to="/adminlogin" replace/>
}

const handleOnClick = () => {
    localStorage.removeItem("jwtToken")
    window.location.href = "/adminlogin"
}

const toggleCreateProject = () => {
    setShowCreateProject(!showCreateProject)
}

const toggleSkillsEditor = () => {
    setShowSkillsEditor(!showSkillsEditor);
};

return (
    <section>
        <div className={styles.container}>
        <div className={styles.menu}>
            <p onClick={handleOnClick} className={styles.logout}>Logout <IoLogOut /></p>
            <p className={styles.skillButton} onClick={toggleSkillsEditor}>
                Skills Editor
            </p>
        </div>
        <h1 className={styles.header}>All Projects</h1>
        <ul className={styles.projectList}>
            {projects.length > 0 &&
            projects.map((project) => (
                <li key={project._id} className={styles.projectCard}>
                    <h3 className={styles.projectTitle}>Ttile :-{project.title}</h3>
                    <p className={styles.projectDescription}>Description :-{project.description}</p>
                    <div className={styles.projectImageContainer}>
                        <img src={project.imageSrc} alt={project.title} className={styles.image}/>
                    </div>
                    <div className={styles.projectDetails}>
                        <p className={styles.projectSkills}>Skills: {project.skills.join(", ")}</p>
                        <div className={styles.projectLinks}>
                            <a href={project.demo} className={styles.links}>Demo</a>
                            <a href={project.source} className={styles.links}>Source</a>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <MdEditNote 
                        className={styles.icon}
                        onClick={() => handleEdit(project)}
                        />
                        <AiFillDelete className={styles.icon} onClick={() => handleDelete(project._id)}/>
                    </div>
                </li>
            ))}
        </ul>
        <div className={styles.createNewProject}>
            <button className={styles.createButton} onClick={toggleCreateProject}>
                Create 
                <MdCreateNewFolder className={styles.createIcon}/>
            </button>
        </div>
        </div>
        {showCreateProject && <CreateProject hideCreateProject={toggleCreateProject}/>}
        {editingProject && <EditProject project={editingProject} hideEditProject={() => setEditingProject(null)}/>}
        {showSkillsEditor && <SkillsEditor />} 
    </section>
)
}
