import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    useEffect(() => {

        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }

    }, [])
    const loginHandler = async () => {
        console.warn(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: "Post",
            body: JSON.stringify({ email, password }),
            headers: {
                "content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/")
        }
        else {
            alert("Enter correct Detail")
        }

    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="input-box" placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type="Password" className="input-box" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="appbutton" type="button" onClick={loginHandler}>Login</button>

        </div>
    )

}
export default Login;