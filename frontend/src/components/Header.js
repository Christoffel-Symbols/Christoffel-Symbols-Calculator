import React from 'react'
import '../App.css'
import logo from './logo.webp'

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} alt="image" style={{
        width: '300px',
        height: '300px',
        marginLeft: '1rem'
      }} />
      <div className='heading'>
        <h1>
          Christoffel Symbols Calculator
        </h1>
      </div>
    </div>
  )
}

export default Header
