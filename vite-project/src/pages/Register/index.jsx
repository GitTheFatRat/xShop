import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./reg.css";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên.";
        if (!form.email.trim()) newErrors.email = "Vui lòng nhập email.";
        if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu.";
        if (!form.repeatPassword) {
            newErrors.repeatPassword = "Vui lòng nhập lại mật khẩu.";
        } else if (form.password !== form.repeatPassword) {
            newErrors.repeatPassword = "Mật khẩu không khớp.";
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const existed = users.find((u) => u.email === form.email);
        if (existed) {
            setErrors({ email: "Email này đã được đăng ký." });
            return;
        }

        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        navigate("/login");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <div className="reg-header">
                <img
                    src="src/assets/Reg-logo.png"
                    alt="Xshop Logo"
                    className="reglogo"
                />
            </div>

            <div className="reg-card">
                <h1 className="reg-title">REGISTER</h1>

                <div className="reg-fields">
                    <div className="field-group">
                        <label className="field-label" htmlFor="name">name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="field-input"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="field-error">{errors.name}</p>}
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
                        <label className="field-label" htmlFor="repeatPassword">repeat password</label>
                        <input
                            id="repeatPassword"
                            name="repeatPassword"
                            type="password"
                            className="field-input"
                            value={form.repeatPassword}
                            onChange={handleChange}
                        />
                        {errors.repeatPassword && <p className="field-error">{errors.repeatPassword}</p>}
                    </div>
                </div>

                <div className="reg-actions">
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

export default Register;