import React from "react"
import styles from "../components/Contact.module.css"
import { getImageUrl } from "../utility"

export default function Contact(){
    return(
        <footer id="contact" className={styles.container}>
            <div className={styles.text}>
                <h2>Contact</h2>
                <p>Fell free to reach out!</p>    
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/mail_icon.png")} alt="Email Icon" />
                    <a href="mailto:batm31768@gmail.com" target="_blank">Email</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/linkedin_icon.png")} alt="Linkedin Icon" />
                    <a href="https://www.linkedin.com/in/pasan-hewavitharana-319026268/" target="_blank">Linkedin</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("contact/github_icon.png")} alt="Github Icon" />
                    <a href="https://github.com/pasan2002" target="_blank">Github</a>
                </li>
            </ul>
        </footer>
    )
}