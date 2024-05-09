import React, {useState} from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './components/Input/Panel';
import Result from './components/output/Result';
import TabMenu from './components/TabMenu';


import './App.css';

const App = () => {

  const [selected, setSelected] = useState('CALCULATE');

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
        <TabMenu setSelected={setSelected}/>
        <Panel/>
      </div>
      {
      sessionStorage.getItem(FORM_PARAMS) === null 
      ?
      null
      :
      <Result/>
      }
      <Footer/>
    </div>
  )
}

export default App

