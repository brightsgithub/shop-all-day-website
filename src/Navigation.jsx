// Navigation.jsx
import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <div className="home-page">
            <span className="shopAllDayTitle">Shop All Day Project</span>
            <div className="home-page-main-content">

                <div className="goal">
                    <div><span className="goal-title">Goal</span></div>
                    <div>
                        <span className="goal-desc">The goal of this project was to create a RESTful microservice (<b>shopallday data</b>),
                            which is a <b>Spring Boot</b> implementation.
                            <br/><br/>The purpose of the RESTful microservice is to any client
                            (Web, Mobile etc.) to consume Product, Customer and Order information, display it and allow their end user to view this
                            information and purchase products.
                    </span>
                    </div>
                </div>

                <div className="aws-container">
                    <span className="aws-title">AWS</span>
                    <div className="ec2-container">
                        <span className="ec2-title">EC2 Instance</span>
                        <div className="docker-container">
                            <span className="docker-title">Docker Container</span>
                        </div>
                    </div>
                </div>


                <div className="link-with-desc">
                    <div><Link to="/ShopWebsite"><span className="link-style">Shop All Day Website</span></Link></div>
                    <div><span className="link-long-desc">Shows the Shop All Day website making actual use of the backend restful webservices</span>
                    </div>
                </div>

                <div className="link-with-desc">
                    <div><Link to="/ShopWebsite"><span className="link-style">Entity Relationship Diagram</span></Link>
                    </div>
                    <div><span className="link-long-desc">Shows a diagram of the relationships between the tables within the schema</span>
                    </div>
                </div>




            </div>
        </div>
    );
}

export default Navigation;
