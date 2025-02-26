import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./index.css";
// import Signup from "../signup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cookies, setCookie] = useCookies(["jwt_token"]);
//   const [authentication, setAuthentication] = useState(false);

  const navigate = useNavigate();

  const nameVal = (event) => {
    setEmail(event.target.value);
  };

  const passVal = (event) => {
    setPass(event.target.value);
  };

  const onSignup = () => {
    navigate("/signup");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const details = { email, password: pass };
    const url = "https://expensetrackerbackend-oy8r.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (response.ok) {
        setCookie("jwt_token", { path: "/", expires: 30 });
        alert("login success");

        navigate("/");
      } else {
        alert(`Error: ${data.msg || "invalid credentials"}`);
      }
    } catch (err) {
      console.log("Error:", err);
      alert("something went wrong");
    }
  };

  return (
    <div className="main">
      <img src="/expenseTrackerLOGO.jpg" alt="logo" className="logo" />
      <form action="" onSubmit={onSubmit} className="formcls">
        <p>
          <label htmlFor="name">Email:</label>
          <input type="text" onChange={nameVal} value="yuva@gmail.com" id="name" />
        </p>
        <p>
          <label htmlFor="pass">Password:</label>
          <input type="password" name="password" onChange={passVal} value="yuva" id="pass" />
        </p>
        <p>
          <input type="submit" value="submit" />
          <button onClick={onSignup}>signup</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
