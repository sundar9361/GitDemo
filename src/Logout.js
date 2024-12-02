import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Step 1: Make the logout request to the backend
        fetch("http://localhost:8080/VastRestaurant/logout", {
            method: "POST",
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated === false) {
                // Step 2: Dispatch CLEAR_USER_ID action to reset Redux state
                dispatch({ type: 'CLEAR_USER_ID' });
                
                // Step 3: Remove session data
                sessionStorage.removeItem("userSession");

                // Step 4: Redirect to login page
                navigate("/login");
            } else {
                console.error("Logout failed:", data.message);
            }
        })
        .catch(error => {
            console.error("Error logging out:", error);
        });
    }, [dispatch, navigate]);

    return (
        <div className="container">
            <h3>Logging out...</h3>
        </div>
    );
};

export default Logout;
