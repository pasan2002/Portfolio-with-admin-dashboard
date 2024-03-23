import React, { useEffect } from "react";
import styles from "../components/EditHistory.module.css"
import axios from "axios"
import { FaWindowClose } from "react-icons/fa";
import { MdDelete } from "react-icons/md"

export default function EditHistory({historys, hideEditHistory}){
    const [imageSrc, setImageSrc] = React.useState(null)
    const [historyData, setHistoryData] = React.useState({
        role: historys.role || "",
        organization:historys.organization||"",
        startdate:historys.startdate||"",
        enddate:historys.enddate||"",
        experiences:historys.experiences||"",
        image:null
    })
    const [successMessage, setSuccessMessage] = React.useState("")
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    useEffect(() => {
        if(historys.imageSrc){
            setImageSrc(historys.imageSrc)
        }
    }, [historys])

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
            const formData = new FormData();
            formData.append("role", historyData.role);
            formData.append("organization", historyData.organization);
            formData.append("startdate", historyData.startdate);
            formData.append("enddate", historyData.enddate);
            formData.append("experiences", historyData.experiences);
            formData.append("image", historyData.image);

            if(imageSrc){
                const file = await fetch(imageSrc)
                const blob = await file.blob()
                formData.append("image", blob, "image.png")
            }

            const token = localStorage.getItem("jwtToken")
            const response = await axios.patch(
                `http://localhost:3000/api/v1/history/${historys._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log("Response from backend:", response.data)

            if(response.data.historys && response.data.historys.imageSrc){
                setImageSrc(response.data.historys.imageSrc)
                console.log("New image source:", response.data.historys.imageSrc);
            }

            console.log("History updated successfully:", response.data);
            setSuccessMessage("History Updated successfully.")
        }catch(error){
            console.error("Error updating project:", error)
            setNotSuccessMessage("Error updating history. Please try again.")
        }
    }

    const handleChange = (event) => {
        setHistoryData({
            ...historyData,
            [event.target.name]: event.target.value,
        })
    }

    const handleClose = () => {
        hideEditHistory()
    }

    return(
        <div id="createhistory" className={styles.container}>
            <FaWindowClose className={styles.closeIcon} onClick={handleClose}/>
            <h1 className={styles.header}>Create History</h1>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {notSuccessMessage && <div className={styles.notsuccessMessage}>{notSuccessMessage}</div>}
            <form className={styles.editHistoryForm} onSubmit={handleSubmit}>
                <label htmlFor="role" className={styles.Label}>Role: </label>
                <input 
                type="text" 
                id="role"
                name="role"
                className={styles.input}
                value={historyData.role}
                onChange={handleChange}
                required
                />
                <label htmlFor="organization" className={styles.Label}>Organization: </label>
                <input 
                type="text" 
                id="organization"
                name="organization"
                value={historyData.organization}
                className={styles.input}
                onChange={handleChange}
                required
                />
                <label htmlFor="startdate" className={styles.Label}>Starting Date: </label>
                <input 
                type="text" 
                id="startdate"
                name="startdate"
                className={styles.input}
                value={historyData.startdate}
                onChange={handleChange}
                required
                />
                <label htmlFor="enddate" className={styles.Label}>Ending Date: </label>
                <input 
                type="text" 
                id="enddate"
                name="enddate"
                className={styles.input}
                value={historyData.enddate}
                onChange={handleChange}
                required
                />
                <label htmlFor="experiences" className={styles.Label}>Experiences: </label>
                <input 
                type="text" 
                id="experiences"
                name="experiences"
                className={styles.input}
                value={historyData.experiences}
                onChange={handleChange}
                required
                />
                <div className={styles.ImageContainer}>
                    {imageSrc && <img src={imageSrc} alt="History Preview" className={styles.image}/>}
                    <div>
                        {imageSrc && <MdDelete onClick={handleDeleteImage} className={styles.deleteIcon}/>}
                    </div>
                </div>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className={styles.choseFile}
                    onChange={handleImageChange}
                    required
                />
                <div className={styles.button}>
                    <button type="submit" className={styles.save}>Save</button>
                </div>
            </form>
        </div>
    )
}