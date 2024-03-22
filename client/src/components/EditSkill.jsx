import React, { useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md"
import { FaWindowClose } from "react-icons/fa";
import styles from "../components/EditSkill.module.css";

export default function EditSkill({skill, hideEditSkill}){
    const [imageSrc, setImageSrc] = React.useState(null)
    const [skillData, setSkillData] = React.useState({
        title: skill.title || "",
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    useEffect(() => {
        if(skill.imageSrc){
            setImageSrc(skill.imageSrc)
        }
    }, [skill])

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
        event.preventDefault()
        try{
            const formData = new FormData()
            formData.append("title", skillData.title)

            if(imageSrc){
                const file = await fetch(imageSrc)
                const blob = await file.blob()
                formData.append("image", blob, "image.png")
            }

            const token = localStorage.getItem("jwtToken")
            const response = await axios.patch(
                `http://localhost:3000/api/v1/skills/${skill._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log("Response from backend:", response.data)

            if(response.data.skill && response.data.skill.imageSrc){
                setImageSrc(response.data.skill.imageSrc)
                console.log("New image source:", response.data.skill.imageSrc);
            }

            console.log("Project updated successfully:", response.data);
            setSuccessMessage("Skill Updated successfully.")
        }catch(error){
            console.error("Error updating project:", error)
            setNotSuccessMessage("Error updating skill. Please try again.")
        }
    }

    const handleChange = (event) => {
        setSkillData({
            ...skillData,
            [event.target.name]: event.target.value,
        })
    }

    const handleClose = () => {
        hideEditSkill()
    }

    return(
        <div id="editskill" className={styles.container}>
            <FaWindowClose onClick={handleClose} className={styles.closeIcon}/>
            <h1 className={styles.header}>Edit Skill</h1>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {notSuccessMessage && <div className={styles.notsuccessMessage}>{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className={styles.editSkillForm}>
                <label htmlFor="title" className={styles.label}>Title : </label>
                <input 
                type="text" 
                id="title"
                name="title"
                value={skillData.title}
                onChange={handleChange}
                className={styles.input}
                required
                />
                <div className={styles.ImageContainer}>
                    {imageSrc && <img src={imageSrc} alt="Skill Preview" className={styles.image}/>}
                    <div>
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