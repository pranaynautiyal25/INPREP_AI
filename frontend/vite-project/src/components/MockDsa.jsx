import React from 'react'
import './MockDsa.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const MockDsa = () => {
    const navigate = useNavigate();
    return (

        <div className='dsa-main'>
            <div className='dsa-top'>
                <div className='dsa-header'>
                    <h1><span style={{ color: '#37fd00' }}>MOCK INSIGHTS</span> : DSA</h1>
                </div>
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <FaArrowLeft />
                </button>
            </div>

            <div className='mock-middle'>

                <p><b>
                    <span style={{ color: '#0400fd' }}>Question: </span>
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                    You may assume that each input would have exactly one solution, and you may not use the same element twice.
                    You can return the answer in any order.

                    
                </b></p>

                <p><b>

                    <span style={{ color: '#0400fd' }}>Constraint: 1&lt;=n&lt;=10^7 </span>

                </b></p>


            </div>
            <div className='mock-bottom'>
                <div className='eval'>
                    <h3 style={{ color: '#fdf900' }}> YOUR APPROACH</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi voluptatibus beatae, eius quibusdam nulla harum deserunt. Vitae fugiat quasi repudiandae unde nisi! Qui nam molestiae non accusantium nemo harum.
                    </p>

                    <h3 style={{ color: '#fdf900' }}> BETTER APPROACH</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi voluptatibus beatae, eius quibusdam nulla harum deserunt. Vitae fugiat quasi repudiandae unde nisi! Qui nam molestiae non accusantium nemo harum.
                    </p>
                </div>
                <div className='eval'>
                    <h3 style={{ color: '#fdf900' }}>CODE-SCORE : 8.3 |EXPLAINATION & COMMUNICATION-SCORE: 5.4</h3>
                    <p>on a scale of 10</p>

                    <h3 style={{ color: '#fdf900' }}>CODE-REVIEW : </h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, molestiae nesciunt. Beatae, optio minima dolor ab odio, vitae laboriosam consequatur minus ut dicta, error eius nihil facere doloremque vel ducimus?

                    <h3 style={{ color: '#fdf900' }}>EXPLAINATION & COMMUNICATION-REVIEW : </h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo consequatur commodi reprehenderit ducimus, repellendus aliquam labore quam fuga excepturi. Deleniti aliquid quis doloribus omnis nemo harum dolore modi, repudiandae eveniet!

                    <h3 style={{ color: '#fdf900' }}>IMPROVEMENT-SCOPE : </h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim corporis mollitia inventore fugiat non ducimus blanditiis veniam amet. Molestias fugit iure, ad numquam debitis repudiandae est quam accusamus maxime?
                </div>
            </div>
        </div>
    )
}

export default MockDsa
