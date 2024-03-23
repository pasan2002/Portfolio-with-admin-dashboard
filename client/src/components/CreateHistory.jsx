import React from "react";
import axios from "axios";
import styles from "../components/CreateHistory.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function CreateHistory({hideCreateHistory}){
    const [historyData, setHistoryData] = React.useState({
        role: "",
        organization: "",
        startdate: "",
        enddate: "",
        experiences: "",
        image: null
    });
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    const handleHistoryFormChange = (e) => {
        setHistoryData({
            ...historyData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setHistoryData({
            ...historyData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwtToken");
    
            const formData = new FormData();
            formData.append("role", historyData.role);
            formData.append("organization", historyData.organization);
            formData.append("startdate", historyData.startdate);
            formData.append("enddate", historyData.enddate);
            formData.append("experiences", historyData.experiences);
            formData.append("image", historyData.image);
    
            const response = await axios.post("http://localhost:3000/api/v1/history", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            hideCreateHistory()
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                setNotSuccessMessage("Error creating history. Please try again");
            } else {
                console.error(error);
                setNotSuccessMessage("An unexpected error occurred. Please try again later.");
            }
        }
    };
    

    return(
        <div id="createhistory" className={styles.CreateHistoryContainer}>
            <FaWindowClose className={styles.closeIcon} onClick={hideCreateHistory}/>
            <h1 className={styles.header}>Create History</h1>
            <form onSubmit={handleSubmit} className={styles.historyForm}>
                <label htmlFor="role" className={styles.Label}>Enter Your Role: </label>
                <input 
                type="text" 
                id="role"
                name="role"
                value={historyData.role}
                onChange={handleHistoryFormChange}
                className={styles.historyInput}
                required
                />
                <label htmlFor="organization" className={styles.Label}>Enter Your Organization: </label>
                <input 
                type="text" 
                id="organization"
                name="organization"
                value={historyData.organization}
                onChange={handleHistoryFormChange}
                className={styles.historyInput}
                required
                />
                <label htmlFor="startdate" className={styles.Label}>Enter Starting Date: </label>
                <input 
                type="text" 
                id="startdate"
                name="startdate"
                value={historyData.startdate}
                onChange={handleHistoryFormChange}
                className={styles.historyInput}
                required
                />
                <label htmlFor="enddate" className={styles.Label}>Enter Ending Date: </label>
                <input 
                type="text" 
                id="enddate"
                name="enddate"
                value={historyData.enddate}
                onChange={handleHistoryFormChange}
                className={styles.historyInput}
                required
                />
                <label htmlFor="experiences" className={styles.Label}>Enter Your Experiences: </label>
                <input 
                type="text" 
                id="experiences"
                name="experiences"
                value={historyData.experiences}
                onChange={handleHistoryFormChange}
                className={styles.historyInput}
                required
                />
                <label htmlFor="image" className={styles.Label}>Upload Image: </label>
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