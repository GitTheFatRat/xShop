import { Link } from "react-router";
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <img src="src/assets/Logo.png" alt="Logo" className="home-logo" />

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
  );
}