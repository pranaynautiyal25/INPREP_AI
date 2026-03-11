//layout like login page will be a dev-dashboard 
//contains ->frontend ,backend,fullstack,database
//will nee dto create a separate exams compo and backend endpoints .

import React from 'react'
import './dev.css'
import { useState, useRef } from 'react';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useAuth } from '../Context/AuthContext';

const Dev = () => {
    return (
        <div className="dev-main">
            <div className='dev-header'>
                <h1 style={{ fontSize: '40px' }}><b>Web-Devolopment Mock Interview</b></h1>
                <h2 style={{ marginTop: '40px' }}><b>“Programming isn’t about what you know; it’s about what you can figure out.”
                </b></h2>
                <p style={{ marginLeft: '30vh' }}>— Chris Pine</p>
            </div>


            <div>
                <div className='dev-options'>
                    <div className='dev-manybuttons'>
                        <div>
                            <button className='dev-button'> FrontEnd</button>
                        </div>
                        <div>
                            <button className='dev-button'>BackEnd</button>
                        </div>
                    </div>
                    <div className='dev-manybuttons' style={{ marginTop: "16px" }}>
                        <div>
                            <button className='dev-button'>FullStack</button>
                        </div>
                        <div>
                            <button className='dev-button'>Database</button>
                        </div>
                    </div>
                </div>





                <div>
                    <button className='dev-back'><FaArrowLeft className='back-button'/><span style={{marginLeft:'40px'}}><b>Back</b></span></button>
                </div>
            </div>

        </div>
    )
}

export default Dev
