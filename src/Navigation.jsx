// Navigation.jsx
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import pngImage from "./assets/spring_boot_logo.png";
import {serverUrl} from './appConstants.js'

function Navigation() {

    const navigate = useNavigate()
    const goToSwagger = () => {
        // navigate('http://localhost:8080/swagger-ui/index.html');
        //window.location.href = 'http://localhost:8080/swagger-ui/index.html';
        window.location.href = serverUrl+'/swagger-ui/index.html';
        // const response = await fetch(serverUrl+'/storage/v1/category');
    };

    const goToWebsite = () => {
        navigate('/ShopWebsite');
    };


    const [isHovered, setIsHovered] = useState(false); // Track hover state

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const hoverStyle = {
        opacity: isHovered ? 0.8 : 1, // Adjust opacity for hover effect
        transition: 'opacity 0.2s ease-in-out', // Optional transition for smoother effect
    };


    return (
        <div className="home-page">
            <span className="shopAllDayTitle">Shop All Day Project</span>
            <div className="home-page-main-content">

                <div className="goal">
                    <div><span className="goal-title">Goal</span></div>
                    <div>
                        <span className="goal-desc">The goal of this project was to create a RESTful microservice (<b>shopallday data</b>),
                            which is a <b>Spring Boot</b> implementation.
                            <br/><br/>The purpose of the RESTful microservice is to allow any client
                            (Web, Mobile etc.) to consume Product, Customer and Order information, display it, and allow their end user to view this
                            information and purchase products.
                    </span>
                    </div>
                </div>

                <div className="aws-container">
                    <span className="aws-title">AWS</span>
                    <div className="ec2-container">
                        <span className="ec2-title">EC2 Instance</span>
                        <div className="all-docker-containers">

                            <div className="docker-container" onClick={goToSwagger} >
                                <span className="docker-title">Docker Container 1 - <u>Microservice</u> </span>
                                <ul className="docker-list-items">
                                    <li>Spring Boot RESTful webservice</li>
                                    <li>PostgresSQL</li>
                                </ul>
                                <div className="docker-description-container">
                                <span style={{ color: '#ffffff' }}><b><u>Description</u></b><br/></span>
                                <span>The Spring Boot RESTful webservice is responsible for handling client requests,
                                    applying any business rules to these requests and is responsible for
                                    retrieving & persisting information to a PostgresSQL database. </span>
                                </div>
                            </div>

                            <div className="docker-container2" onClick={goToWebsite}>
                                <span className="docker-title">Docker Container 2 - <u>Website</u> </span>
                                <ul className="docker-list-items">
                                    <li>React JS Website</li>

                                </ul>
                                <div className="docker-description-container">
                                <span style={{ color: '#ffffff' }}><br/><br/><b><u>Description</u></b><br/></span>
                                <span>The end user interacts with a React JS website, which acts as the client to our microservice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="link-with-desc">
                    <div><Link to="/ShopWebsite"><span className="link-style">Shop All Day Website</span></Link></div>
                    <div><span className="link-long-desc">Shows the Shop All Day website making actual use of the backend restful webservices</span>
                    </div>
                </div>

                <div className="link-with-desc">
                    <div><Link to="/Erd"><span className="link-style">Entity Relationship Diagram</span></Link>
                    </div>
                    <div><span className="link-long-desc">Shows a diagram of the relationships between the tables within the schema</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Navigation;
