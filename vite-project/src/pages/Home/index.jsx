import React from "react";
import { Link } from "react-router";
import "./home.css"

const Home = () => {
    return (
        <div className="container">
            <img src="src/assets/Logo.png" alt="Logo"  className="logo"/>
            <Link to="/login" className="loginbtn">
                <h2>Login</h2>
            </Link>

            <Link to="/register" className="registerbtn">
                <h2>Register</h2>
            </Link>

            <Link to="/forgot-password" className="forgotbtn">
                <h2>Forgot Password</h2>
            </Link>
        </div>
    )
}

const Font = () => {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet" />
        </>
    )
}
export default Home