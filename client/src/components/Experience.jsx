import React, { useEffect } from "react"
import styles from "../components/Experience.module.css"
import { getImageUrl } from "../utility"
import axios from "axios"
import history from "../data/history.json"

export default function Experience(){
    const [skills, setSkills] = React.useState([])

    useEffect(() => {
        const fetchSkills = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/public/publicskills")
                setSkills(response.data.skills)
                console.log(response.data.skills)
            }catch(error){
                console.error(error)
            }
        }
        fetchSkills()
    }, [])

    return(
        <section id="experience" className={styles.container}>
            <h2 className={styles.title}>Experience</h2>
            <div className={styles.content}>
                <div className={styles.skills}>
                    {
                        skills.map((skill, id) => {
                            return (
                                <div key={id} className={styles.skill}>
                                    <div className={styles.imgContainer}>
                                        <img src={skill.imageSrc} alt={skill.title} />
                                    </div>
                                    <p>{skill.title}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <ul className={styles.history}>
                    {
                        history.map((historyItem, id) => {
                            return(
                                <li key={id} className={styles.historyItem}>
                                    <img src={getImageUrl(historyItem.imageSrc)} alt={historyItem.organisation} />
                                    <div className={styles.details}>
                                        <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                                        <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                                        <ul>
                                        {historyItem.experiences.map((experience, id) => {
                                            return <li key={id}>{experience}</li>;
                                        })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}
