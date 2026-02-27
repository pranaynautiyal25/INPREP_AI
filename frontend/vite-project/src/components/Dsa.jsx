import React from 'react'
import './Dsa.css'
const Dsa = () => {
    return (
        <div className="dsa-main">

            {/* TOP SECTION - 30% */}
            <div className="top">
                <div className="dsa-question">
                    <h3>Question</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel, adipisci sequi reprehenderit autem possimus ea rem
                        voluptate? Aliquam, sint officia! Mollitia necessitatibus
                        voluptatibus consequuntur nam sequi porro, doloribus nesciunt autem!
                    </p>
                </div>

                <div className="microphone-button">
                    <button>🎤</button>
                </div>
            </div>

            {/* MIDDLE SECTION - 60% */}
            <div className="middle">
                <div className="dsa-code">
                    <textarea placeholder="Write your code here..."></textarea>
                </div>

                <div className="performance-report">
                    <h3>Performance Report</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit iure saepe sit non aut accusantium.
                        Corporis quae ipsum similique!
                    </p>
                </div>
            </div>

            {/* BOTTOM SECTION - 10% */}
            <div className="bottom">
                <div className="audioToText">
                    <p>Voice input will appear here...</p>
                </div>

                <div className="submit">
                    <button type="submit">Submit</button>
                </div>
            </div>

        </div>
    )
}

export default Dsa