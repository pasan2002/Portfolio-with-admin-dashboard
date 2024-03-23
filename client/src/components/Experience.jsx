import React, { useEffect } from "react"
import styles from "../components/Experience.module.css"
import { getImageUrl } from "../utility"
import axios from "axios"

export default function Experience() {
    const [skills, setSkills] = React.useState([])
    const [history, setHistory] = React.useState([])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public/publicskills")
                setSkills(response.data.skills)
                console.log(response.data.skills)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSkills()

        const fetchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/public/publichistory")
                setHistory(response.data.history) 
                console.log(response.data.history)
            } catch (error) {
                console.error(error)
            }
        }
        fetchHistory()
    }, [])

    return (
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
                        history.map((historys, id) => {
                            return (
                                <li key={id} className={styles.historyItem}>
                                    <img src={historys.imageSrc} alt={historys.organization} />
                                    <div className={styles.details}>
                                        <h3>{`${historys.role}`}</h3>
                                        <h3>{`${historys.organization}`}</h3>
                                        <p>{`${historys.startdate} - ${historys.enddate}`}</p>
                                        <ul>
                                            {historys.experiences.map((experience, id) => {
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
