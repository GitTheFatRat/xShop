import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim()) newErrors.email = "Vui lòng nhập email.";
        if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu.";
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            (u) => u.email === form.email && u.password === form.password
        );

        if (!user) {
            setErrors({ general: "Email hoặc mật khẩu không đúng." });
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(user));

        navigate("/mainhome");
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <div className="login-header">
                <img
                    src="src/assets/Reg-logo.png"
                    alt="Xshop Logo"
                    className="reglogo"
                />
            </div>

            <div className="login-card">
                <h1 className="login-title">LOGIN</h1>

                <div className="login-fields">
                    <div className="field-group">
                        <label className="field-label" htmlFor="email">email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="field-input"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>

                    <div className="field-group">
                        <label className="field-label" htmlFor="password">password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="field-input"
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="field-error">{errors.password}</p>}
                    </div>

                    {errors.general && (
                        <p className="field-error" style={{ textAlign: "center" }}>
                            {errors.general}
                        </p>
                    )}
                </div>

                <div className="login-actions">
                    <button className="btn-back" onClick={handleBack}>
                        QUAY LẠI
                    </button>
                    <button className="btn-done" onClick={handleSubmit}>
                        HOÀN TẤT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
