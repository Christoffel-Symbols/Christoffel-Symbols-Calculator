import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Input from './components/Input/Input';
import Result from './components/Result';


import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Header/>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '2rem',
        padding: '0.5rem'
      }}>
      <Input/>
      </div>
      <Result/>
      <Footer/>
    </div>
  )
}

export default App

