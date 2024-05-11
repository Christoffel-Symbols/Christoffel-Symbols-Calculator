import React from 'react'

import '../App.css'
import logo from '../data/logo.png'

const Header = () => {
  return (
    <div className='header'>
        <div className='heading'>
          <span>
        Christoffel Symbols 
          </span>
          <span style={{
            background: 'white',
            color: 'black'
          }}>
        Calculator
          </span>
        </div>
    </div>
  )
}

export default Header
