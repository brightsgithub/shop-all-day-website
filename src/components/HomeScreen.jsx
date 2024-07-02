// HomeScreen.jsx
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import pngImage from "../assets/spring_boot_logo.png";
import gitHubImage from "../assets/git_hub_logo.png";
import {serverUrl} from '../appConstants.js'

function HomeScreen() {

    const navigate = useNavigate()
    const goToSwagger = () => {
        // navigate('http://localhost:8080/swagger-ui/index.html');
        //window.location.href = 'http://localhost:8080/swagger-ui/index.html';
        window.location.href = serverUrl+'/swagger-ui/index.html';
        // const response = await fetch(serverUrl+'/storage/v1/category');
    };

    const goToGitHubShopAllDayWebsite = () => {
        window.location.href = 'https://github.com/brightsgithub/shop-all-day-website';
    };

    const goToGitHubShopAllDayWebService = () => {
        window.location.href = 'https://github.com/brightsgithub/shop-all-day-storage';
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

                            <div className="docker-container" onClick={goToSwagger}>
                                <span className="docker-title">Docker Container 1 - <u>Microservice</u> </span>
                                <ul className="docker-list-items">
                                    <li>Spring Boot RESTful webservice</li>
                                    <li>PostgresSQL</li>
                                </ul>
                                <div className="docker-description-container">
                                    <span style={{color: '#ffffff'}}><b><u>Description</u></b><br/></span>
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
                                    <span style={{color: '#ffffff'}}><br/><br/><b><u>Description</u></b><br/></span>
                                    <span>The end user interacts with a React JS website, which acts as the client to our microservice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="link-with-desc">
                    <div><Link onClick={goToGitHubShopAllDayWebsite}>
                        <img className={`git-hub-image`} src={gitHubImage}/>
                        <span className="link-style"> GitHub - Shop All Day website code</span></Link></div>
                    <div><span className="link-long-desc">View the ReactJS website source code on GitHub.</span>
                    </div>
                </div>

                <div className="link-with-desc">
                    <div><Link onClick={goToGitHubShopAllDayWebService}>
                        <img className={`git-hub-image`} src={gitHubImage}/>
                        <span className="link-style"> GitHub - Shop All Day backend webservice code</span></Link></div>
                    <div><span
                        className="link-long-desc">View Spring Boot backend webservice source code on GitHub.</span>
                    </div>
                </div>

                <div className="link-with-desc">
                    <div><Link to="/Erd"><span className="link-style">Entity Relationship Diagram</span></Link>
                    </div>
                    <div><span className="link-long-desc">Shows a diagram of the relationships between the tables within the schema.</span>
                    </div>
                </div>

                <div className="todo">
                    <div><span className="todo-title">Todo list:</span></div>
                    <div>
                        <ul className="todo-list">
                            <li className="todo-list-item">Implement Add to Basket & Checkout functionality</li>
                            <li className="todo-list-item">Make use of Order endpoints to allow user to view order info</li>
                            <li className="todo-list-item">Make user of Customer endpoints to allow sign up</li>
                            <li className="todo-list-item">Implement an admin console. This is to allow management of new products, manage orders etc.</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className={`developed-by-container`}><span className={`developed-by-msg`}>Developed by: Bright Owusu-Amankwaa</span></div>
        </div>
    );
}

export default HomeScreen;
