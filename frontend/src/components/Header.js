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
      <div style={{
        border: '3px solid black'
      }}>
        Christoffel Symbols 
        </div>
        <div style={{
          border: '3px solid black',
          textAlign: 'center'
        }}>
        Calculator
        </div>
        </div>
    </div>
  )
}

export default Header
