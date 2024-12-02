import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserId } from "./action_reducer_store/vastAction"; 

const Login = () => {
    const [userId, setUserIdInput] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/VastRestaurant/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                txtid: userId,
                txtpass: password
            }),
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                dispatch(setUserId(data.userId)); 
                sessionStorage.setItem("userSession", data.userId); // Save session locally
                navigate("/dashboard"); 
            } else {
                setErrorMsg(data.message || "Invalid credentials");
            }
        })
        .catch(error => {
            setErrorMsg("Error logging in: " + error.message);
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>User ID</label>
                    <input 
                        type="text" 
                        value={userId} 
                        onChange={(e) => setUserIdInput(e.target.value)} 
                        className="form-control"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control"
                        required 
                    />
                </div>
                {errorMsg && <div className="text-danger">{errorMsg}</div>}
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
