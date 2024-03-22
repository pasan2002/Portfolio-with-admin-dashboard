import React from "react"
import styles from "../components/Nav.module.css"
import { getImageUrl } from "../utility"

export default function Nav() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    function handleClick() {
        setMenuOpen(!menuOpen);
    }

    function autoClose() {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    }

    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.title}>Portfolio</a>
            <div className={styles.menu}>
                <img
                    src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")}
                    alt="menu button"
                    className={styles.mnuButton}
                    onClick={handleClick}
                />
                <ul className={`${styles.list} ${menuOpen && styles.menuOpen}`} onClick={autoClose}>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#experience">Experience</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
