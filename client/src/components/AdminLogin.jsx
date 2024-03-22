import React from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../components/AdminLogin.module.css"
import axios from "axios"

export default function AdminLogin(){
    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = React.useState({
        email:"",
        password:"",
    })

    const[error, setError] = React.useState(null)
    const[success, setSuccess] = React.useState(null)

    const handleLoginFormChange = (e) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", loginFormData)
            console.log(response.data);

            if(response.data.token){
                localStorage.setItem("jwtToken", response.data.token)
                setSuccess("Login successful!!!")
                navigate("/private-route")
            }else{
                setError("Login failed. Please check your credentials.")
            }

        }catch(error){
            if(error.response && error.response.status){
                if(error.response.status === 401){
                    setError("Email or Password is wrong check again")
                }else(
                    setError("An error occured. Please try again later.")
                )
            }else{
                console.error(error)
            }
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.head}>Admin Login</h1>
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit}>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginFormChange}
                    required
                    className={styles.input}
                    />
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginFormChange}
                    required
                    className={styles.input}
                    />
                    <div className={styles.btn}>
                        <button type="submit" className={styles.loginButton}>Login</button>
                    </div>
                </form>
            </div>
            <p className={styles.additionalInfo}>
                Wanna be an admin {''} 
                <Link to="/admin">
                    Register
                </Link>
            </p>
        </div>
    )
}
