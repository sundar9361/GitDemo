import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container text-center">
            <h2>Browse by Cuisine</h2>
            <div className="cuisine-options d-flex justify-content-center">
                <div className="cuisine-option mx-3">
                    <Link to="/viewallveg">
                        <img src="veg-image.jpg" alt="Veg" className="rounded-circle" />
                        <p>Veg</p>
                    </Link>
                </div>
                <div className="cuisine-option mx-3">
                    <Link to="/viewallnonveg">
                        <img src="nonveg-image.jpg" alt="Non-Veg" className="rounded-circle" />
                        <p>Non-Veg</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
