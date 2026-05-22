import { useState } from "react";
import { useNavigate } from "react-router";
import "./reg.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Vui lòng nhập tên.";
    if (!form.email.trim()) next.email = "Vui lòng nhập email.";
    if (!form.password) next.password = "Vui lòng nhập mật khẩu.";
    if (!form.repeatPassword) {
      next.repeatPassword = "Vui lòng nhập lại mật khẩu.";
    } else if (form.password !== form.repeatPassword) {
      next.repeatPassword = "Mật khẩu không khớp.";
    }
    return next;
  }

  function handleSubmit() {
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === form.email)) {
      setErrors({ email: "Email này đã được đăng ký." });
      return;
    }

    users.push({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  }

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
            <label className="field-label" htmlFor="name">
              name
            </label>
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
            <label className="field-label" htmlFor="password">
              password
            </label>
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
            <label className="field-label" htmlFor="email">
              email
            </label>
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
            <label className="field-label" htmlFor="repeatPassword">
              repeat password
            </label>
            <input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              className="field-input"
              value={form.repeatPassword}
              onChange={handleChange}
            />
            {errors.repeatPassword && (
              <p className="field-error">{errors.repeatPassword}</p>
            )}
          </div>
        </div>

        <div className="reg-actions">
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>
            QUAY LẠI
          </button>
          <button type="button" className="btn-done" onClick={handleSubmit}>
            HOÀN TẤT
          </button>
        </div>
      </div>
    </div>
  );
}