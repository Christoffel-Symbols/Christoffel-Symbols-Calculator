import React from 'react'
import '../App.css'

const Header = () => {
  return (
    <div className='header'>
      <img src="/logo192.png" alt="image" style={{
        width: '300px',
        height: '300px',
        marginLeft: '1rem'
      }}/>
        <div className='heading'>
        Christoffel Symbols Calculator
        </div>
    </div>
  )
}

export default Header
