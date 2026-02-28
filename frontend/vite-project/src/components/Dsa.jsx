
import React from 'react';
import './Dsa.css';
import { FaMicrophone } from 'react-icons/fa';

const Dsa = () => {
    return (
        <div className='dsa-main'>

            {/* TOP 10% */}
            <div className="dsa-top">
                <div className="dsa-header">
                    <h1>DSA-PREP</h1>
                </div>

                <div className="dsa-audio">
                    <button className="mic-button" title="Start/Stop Recording">
                        <FaMicrophone />
                    </button>
                </div>
            </div>

            {/* MIDDLE 80% */}
            <div className="dsa-middle">

                <div className="dsa-question">
                    <h3>Question</h3>
                    <p>
                        Write a function to find the longest increasing
                        subsequence in an array.ghvssassSasASASADQWdssxsxsascsdadxasdxsadsa
                        xXaxaazzzzzzzzzzzzzzzzzz
                        assaasa
                        asasasssssss<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        fvfv
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>
                        ccf<br></br>
                        cdc<br></br>
                        fcv<br></br>
                        fvv<br></br>

                    </p>
                </div>

                <div className="dsa-code">
                    <textarea placeholder='Type Your Code Here'></textarea>
                </div>

            </div>

            {/* BOTTOM 10% */}
            <div className="dsa-bottom">

                <div className="audio-text">
                    Voice transcript will appear here...
                </div>

                <div className="dsa-button">
                    <button>Submit and Evaluate</button>
                </div>

            </div>

        </div>
    )
}

export default Dsa