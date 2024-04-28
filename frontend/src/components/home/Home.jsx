import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column'>
            <h1 className='text-center'>Organize your<br/>work and life, Asap.</h1>
            <p>Become focused, organized, and calm with TODO <br/>app. The helping hand to your daily task management.</p>
            <button class="home-btn">Make Todo List</button>
        </div>
    </div>
  )
}

export default Home