import React from "react"
import { getImageUrl } from "../utility"
import styles from "../components/About.module.css"

export default function About(){
    return(
        <section className={styles.container} id="about">
            <h2 className={styles.title}>ABOUT</h2>
            <div className={styles.content}>
                <img src={getImageUrl("about/programmer.png")} alt="Image of a programmer" className={styles.abtImage}/>
                <ul className={styles.abtItems}>
                    <li className={styles.abtSkills}>
                        <img src={getImageUrl("about/cursor_icon.png")} alt="Image of cursor" className={styles.cursorImage}/> 
                        <div className={styles.prg}>
                            <h3>Frontend Developer</h3>
                            <p>
                                I’m a front-end developer with experience
                                in building responsive and optimized sites
                            </p>
                        </div>
                    </li>

                    <li className={styles.abtSkills}>
                        <img src={getImageUrl("about/server_icon.png")} alt="Image of server" className={styles.backendImage}/>
                        <div className={styles.prg}>
                            <h3>Backend Developer</h3>
                            <p>
                                I have experience developing fast and
                                optimised back-end systems and APIs
                            </p>
                        </div>
                    </li>

                    <li className={styles.abtSkills}>
                        <img src={getImageUrl("about/ui_icon.png")} alt="Image of ui" className={styles.uiImage}/>
                        <div className={styles.prg}>
                            <h3>UI Designer</h3>
                            <p>
                                I have completed Foundations of User Experience(UX) Design by Google.
                                I have designed multiple landing pages and have created design systems as well
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

        </section>
    )
}