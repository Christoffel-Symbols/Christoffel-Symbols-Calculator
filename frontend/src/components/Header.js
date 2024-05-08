import React from 'react'

import '../App.css'
import logo from '../data/logo.png'

const Header = () => {
  return (
    <div className='header'>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '15%'
        }}>
        <img src={logo} className='logo'/>
        </div>
        <div className='heading'>
      <div>
        Christoffel Symbols 
        </div>
        <div style={{
          textAlign: 'center'
        }}>
        Calculator
        </div>
        </div>
    </div>
  )
}

export default Header
