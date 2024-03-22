import React, { useState, useEffect } from "react"
import styles from "../components/Projects.module.css"
import ProjectCard from "../components/ProjectCard"
import axios from "axios"

export default function Projects() {
  const [projects, setProjects] = useState([]) 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/public")
        setProjects(response.data.projects) 
        console.log(response.data.projects) 
      } catch (error) {
        console.error(error)
      }
    }
  
    fetchProjects()
  }, []) 

  return (
    <section id="projects" className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} /> 
        ))}
      </div>
    </section>
  )
}
