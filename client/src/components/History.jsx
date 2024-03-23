import React, { useEffect } from "react"
import axios from "axios"
import styles from "../components/History.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md"
import CreateHistory from "./CreateHistory";
import EditHistory from "./EditHistory";

export default function History(){
    const [history, setHistory] = React.useState([])
    const [showCreateHistory, setShowCreateHistory] = React.useState(false);
    const [editingHistory, setEditingHistory] = React.useState(null)
    const navigate = useNavigate()

    useEffect( () => {
        const token = localStorage.getItem("jwtToken")

        const getAllHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/history", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                })
                setHistory(response.data.history)
                console.log(response.data.history)
            }catch(error){
                console.log("Error fetching history:", error);
            }
        }

        if(token){
            getAllHistory()
        }else{
            navigate("/adminlogin", { replace: true })
        }
    }, [navigate])

    const deleteSkill = async (_id) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`http://localhost:3000/api/v1/history/${_id}`, {
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
    }

    const handleEdit = (skill) => {
        setEditingHistory(skill)
    };

    const handleDelete = (_id) => {
        deleteSkill(_id)
    }

    const toggleCreateHistory = () => {
        setShowCreateHistory(!showCreateHistory);
    }

    return(
        <section>
            <div id="history" className={styles.container}>
                <h1 className={styles.header}>History</h1>
                <ul className={styles.historyList}>
                    {history.length > 0 &&
                    history.map((historys) => (
                        <li key={historys._id} className={styles.historyCard}>
                            <h3 className={styles.historyTitle}>Role: {historys.role}</h3>
                            <p className={styles.organization}>Organization: {historys.organization}</p>
                            <p className={styles.date}>Starrting Date: {historys.startdate}</p>
                            <p className={styles.date}>Ending Date: {historys.enddate}</p>
                            <p className={styles.experiences}>Experiences: {historys.experiences}</p>
                            <div className={styles.imageContainer}>
                                <img src={historys.imageSrc} alt={historys.role} className={styles.image}/>
                            </div>
                            <div className={styles.icons}>
                                <MdEditNote className={styles.icon} onClick={() => handleEdit(historys)}/>
                                <AiFillDelete className={styles.icon} onClick={() => handleDelete(historys._id)}/>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.createNewHistory}>
                    <button className={styles.createButton} onClick={toggleCreateHistory}>
                        Create
                        <MdCreateNewFolder className={styles.createIcon} />
                    </button>
                </div>
            </div>
            {showCreateHistory && <CreateHistory hideCreateHistory={toggleCreateHistory} />}
            {editingHistory && <EditHistory historys={editingHistory} hideEditHistory={() => setEditingHistory(null)}/>}
        </section>
    )
}