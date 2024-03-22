import React from "react"
import { getImageUrl } from "../utility"
import styles from "../components/Hero.module.css"

export default function Hero(){
    return(
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm Pasan </h1>
                <p className={styles.paragraph}>
                I’m a full-stack developer with 1 year
                of experience using React and NodeJS.
                Reach out if you’d like to learn more!
                </p>
                <a href="mailto:batm31768@gmail.com" className={styles.contactBtn}>Contact me</a>
            </div>
            <img src={getImageUrl("hero/hero.png")} alt="image of pasan"  className={styles.heroImg}/>
            <div className={styles.topBlur}/>
            <div className={styles.bottomBlur}/>
        </section>
    )
}
