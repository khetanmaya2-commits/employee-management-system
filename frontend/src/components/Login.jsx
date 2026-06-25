import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 function handleLogin(e) {
  e.preventDefault();

  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", "Admin");

    setIsLoggedIn(true);
    alert("Login successfully");
    navigate("/");
  } else {
    alert("Invalid email or password");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
  }
}

  return (
    <div className="login-page">
      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h1>Employee Management System</h1>

        <p>
          Sign in to access your dashboard
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;