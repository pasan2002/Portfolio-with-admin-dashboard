import React from "react";
import styles from "../components/ProjectCard.module.css";

export default function ProjectCard({ project: { title, imageSrc, description, skills, demo, source } }) {
  return (
    <section className={styles.project}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={title} className={styles.cardImage} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.skillContainer}>
          <div className={styles.skills}>
            {skills[0].split(" ").map((word, id) => (
              <span key={id} className={styles.skill}>{word}</span> 
            ))}
          </div>
        </div>
        <div className={styles.links}>
          <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">Demo</a>
          <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </div>
    </section>
  );
}
