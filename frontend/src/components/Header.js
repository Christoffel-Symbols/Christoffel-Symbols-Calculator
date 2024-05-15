import React from 'react'
import '../App.css'



const Header = () => {
  return (
    <div className='header'>
      <img src="/logo192.png" alt="image" style={{
        width: '15%'
      }}/>
        <div className='heading'>
          <span>
        Christoffel Symbols 
          </span>
          <span>
        Calculator
          </span>
        </div>
    </div>
  )
}

export default Header
