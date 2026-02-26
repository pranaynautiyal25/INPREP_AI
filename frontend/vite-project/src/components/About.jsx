import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
    return (
        <div className='main'>
            <div className='header'>
                <div className='about-card'>
                    <h1>About INPREP-AI</h1>

                    <p>
                        INPREP-AI is an innovative platform designed to help
                        users prepare for coding interviews through structured
                        mock sessions and intelligent feedback.
                    </p>

                    <p>
                        Our mission is to provide a comprehensive and interactive
                        learning experience that empowers individuals to excel in
                        technical interviews. From DSA mock interviews to development
                        simulations, we aim to make preparation practical and realistic.
                    </p>

                    <p>
                        With coding challenges, performance analysis, and AI-driven
                        feedback, INPREP-AI helps you identify weaknesses, improve
                        communication, and build confidence.
                    </p>

                    <div className="home-link">
                        <Link to="/">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About