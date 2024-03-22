import React from "react"
import { Link } from "react-router-dom";
import styles from "../components/Admin.module.css"
import axios from "axios"

export default function Admin(){
    const [registerFormData, setRegisterFormData] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    const[error, setError] = React.useState(null)
    const[success, setSuccess] = React.useState(null)

    const handleRegisterFormChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/register", registerFormData);
            console.log(response.data);
            setSuccess("User successfully registered!")
        } catch (error) {
            if (error.response && error.response.status){
                if(error.response.status === 400){
                    setError("Invalid data provided. Please check your inputs")
                }else if(error.response.status === 403){
                    setError("Maximum user limit reached")
                }else{
                    setError("An error occured. Please try again later.")
                }
            }else{
                console.error(error)
            }
        }
    };

    return(
        <div className={styles.container}>
            <h1 className={styles.head}>Register An Admin</h1>
            <div className={styles.regForm}>
                <form onSubmit={handleSubmit}>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input 
                    type="text"
                    id="name" 
                    name="name"
                    value={registerFormData.name}
                    onChange={handleRegisterFormChange}
                    required
                    className={styles.input}
                    />
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input 
                    type="email"
                    id="email" 
                    name="email"
                    value={registerFormData.email}
                    onChange={handleRegisterFormChange}
                    required
                    className={styles.input}
                    />
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input 
                    type="password"
                    id="password" 
                    name="password"
                    value={registerFormData.password}
                    onChange={handleRegisterFormChange}
                    required
                    className={styles.input}
                    />
                    <div className={styles.btn}>
                        <button type="submit" className={styles.regButton}>Register</button>
                    </div>
                </form>
            </div>
            <p className={styles.additionalInfo}>
                If you already an admin {''} 
                <Link to="/adminlogin">
                    Log In
                </Link>
            </p>
        </div>
    )
}
