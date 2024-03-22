import React from "react";
import axios from "axios";
import styles from "../components/SkillCreate.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function SkillCreate({ hideCreateSkill }) {
    const [skillData, setSkillData] = React.useState({
        title: "",
        image: null
    });
    const [notSuccessMessage, setNotSuccessMessage] = React.useState("")

    const handleSkillFormChange = (e) => {
        setSkillData({
            ...skillData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setSkillData({
            ...skillData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwtToken");

            const formData = new FormData();
            formData.append("title", skillData.title);
            formData.append("image", skillData.image);

            const response = await axios.post("http://localhost:3000/api/v1/skills", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            hideCreateSkill(); 
        } catch (error) {
            console.error(error.response.data);
            setNotSuccessMessage("Error creating Skill. Please try again")
        }
    };

    return (
        <div id="createSkill" className={styles.CreateSkillContainer}>
            <FaWindowClose className={styles.closeIcon} onClick={hideCreateSkill}/>
            <h1 className={styles.header}>Create New Skill</h1>
            {notSuccessMessage && <div className={styles.notSuccessMessage}>{notSuccessMessage}</div>}
            <form onSubmit={handleSubmit} className={styles.skillForm}>
                <label htmlFor="title" className={styles.skillLabel}>Enter skill title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={skillData.title}
                    onChange={handleSkillFormChange}
                    className={styles.skillInput}
                    required
                />
                <label htmlFor="image" className={styles.skillImageLabel}>Upload Image: </label>
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
    );
}
