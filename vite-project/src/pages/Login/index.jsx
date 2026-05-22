import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) next.email = "Vui lòng nhập email.";
    if (!form.password) next.password = "Vui lòng nhập mật khẩu.";
    return next;
  }

  function handleSubmit() {
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
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
  }

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

          {errors.general && (
            <p className="field-error" style={{ textAlign: "center" }}>
              {errors.general}
            </p>
          )}
        </div>

        <div className="login-actions">
          <button type="button" className="btn-back" onClick={() => navigate("/")}>
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