import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const userData = { name, email, password };
    const url = "https://expensetrackerbackend-oy8r.onrender.com/register";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response)
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Error: ${data.msg || "Signup failed"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create an Account</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <p className="signup-login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
