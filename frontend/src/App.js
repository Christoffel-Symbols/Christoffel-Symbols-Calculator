import React, {useState} from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './components/Input/Panel';
import Result from './components/output/Result';
import TabMenu from './components/TabMenu';


import './App.css';

const App = () => {

  // When one of the states is updated, it causes all the children to re-render.
  const [numChristoffelCalculated, setNumChristoffelCalculated] = useState(0);

  const incrNumChristoffelCalculated = () => {
    setNumChristoffelCalculated((prevState)=>{
      return prevState + 1;
    })
  };

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  return (
    <div className='app'>
      <Header/>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.5rem'
      }}>
        <TabMenu incrNumChristoffelCalculated={incrNumChristoffelCalculated}/>
        <Panel incrNumChristoffelCalculated={incrNumChristoffelCalculated}/>
      </div>
      {
      sessionStorage.getItem(FORM_PARAMS) === null 
      ?
      null
      :
      <Result numChristoffelCalculated={numChristoffelCalculated}/>
      }
      <Footer/>
    </div>
  )
}

export default App

