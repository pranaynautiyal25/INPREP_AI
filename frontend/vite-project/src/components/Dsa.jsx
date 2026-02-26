import React from 'react'

const Dsa = () => {
    return (
        <div className="container">

            <div className="top">
                <div className="question">
                    <p>Q: Solve the given DSA problem below</p>
                </div>

                <div className="microphone">
                    <button className="mic-btn">
                        <i className="fa-solid fa-microphone"></i>
                    </button>
                </div>
            </div>

            <div className="middle">

                <div className="code">
                    <textarea
                        placeholder="Write your code here..."
                        rows="12"
                    ></textarea>
                </div>

                <div className="result">
                    <p><strong>Score:</strong> </p>
                    <p><strong>Code and Testing Results:</strong> </p>
                    <p><strong>Communication:</strong> </p>
                    <p><strong>Overall Review:</strong> </p>
                </div>

            </div>

            <div className="bottom">
                <p className="voiceToText">Voice input will appear here...</p>
                <button className="submit-and-analyze">Submit & Analyze</button>
            </div>

        </div>
    )
}

export default Dsa