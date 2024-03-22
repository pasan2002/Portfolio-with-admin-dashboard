// SkillsEditor.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md"
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import SkillCreate from "./SkillCreate";
import styles from "../components/SkillsEditor.module.css";
import EditSkill from "./EditSkill";

export default function SkillsEditor() {
    const [skills, setSkills] = React.useState([]);
    const [showCreateSkill, setShowCreateSkill] = React.useState(false);
    const [editingSkill, setEditingSkill] = React.useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        const getAllSkills = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/skills", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setSkills(response.data.skills);
                console.log(response.data.skills);
            } catch (error) {
                console.log("Error fetching Skills:", error);
            }
        };

        if (token) {
            getAllSkills();
        } else {
            navigate("/adminlogin", { replace: true });
        }
    }, [navigate]);

    const deleteSkill = async (_id) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`http://localhost:3000/api/v1/skills/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true
                },
                credentials: "include"
            });
            console.log("Post Deleted: ", _id);
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill)
    };

    const handleDelete = (_id) => {
        deleteSkill(_id);
    };

    const toggleCreateSkill = () => {
        setShowCreateSkill(!showCreateSkill);
    };

    return (
        <section>
            <div id="skilleditor" className={styles.container}>
                <h1 className={styles.header}>Skills</h1>
                <ul className={styles.skillList}>
                    {skills.map((skill) => (
                        <li key={skill._id} className={styles.skillCard}>
                            <h3 className={styles.skillTitle}>Title: {skill.title}</h3>
                            <div className={styles.skillImageContainer}>
                                <img src={skill.imageSrc} alt={skill.title} className={styles.image} />
                            </div>
                            <div className={styles.icons}>
                                <MdEditNote className={styles.icon} onClick={() => handleEdit(skill)} />
                                <AiFillDelete className={styles.icon} onClick={() => handleDelete(skill._id)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.createNewSkill}>
                    <button className={styles.createButton} onClick={toggleCreateSkill}>
                        Create
                        <MdCreateNewFolder className={styles.createIcon}/>
                    </button>
                </div>
            </div>
            {showCreateSkill && <SkillCreate hideCreateSkill={toggleCreateSkill} />}
            {editingSkill && <EditSkill skill={editingSkill} hideEditSkill={() => setEditingSkill(null)}/>}
        </section>
    );
}
