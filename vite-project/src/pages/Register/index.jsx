import React from "react";
import "./reg.css"
const Register = () => {
    return (
        <div className="container">
            <img src="src/assets/Reg-logo.png" alt="Logo" className="reglogo"/>
            <h1 className="register-title">REGISTER</h1>
            <h2 className="rp1">name</h2>
            <h2 className="rp2">email</h2>
            <h2 className="rp3">password</h2>
            <h2 className="rp4">confirm password</h2>
            <h1 className="Done">HOÀN TẤT</h1>
            <h1 className="Back">QUAY LẠI</h1>
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
export default Register