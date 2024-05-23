import React, { useState, useRef } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './components/Input/Panel';
import Result from './components/output/Result';
import TabMenu from './components/TabMenu';
import { MathJaxContext } from "better-react-mathjax";
import './App.css';

const config = {
  "fast-preview": {
    disabled: true
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  },
  messageStyle: "none"
};

const App = () => {

  const resultRef = useRef(null);

  // clean slate a.k.a fresh input form
  // Also removes sessionStorage inputs 
  const [reset, setReset] = useState(0);

  // When one of the states is updated, it causes all the children to re-render.
  const [numChristoffelCalculated, setNumChristoffelCalculated] = useState(0);

  const incrNumChristoffelCalculated = () => {
    setNumChristoffelCalculated((prevState) => {
      return prevState + 1;
    })
  };

  return (
    <div className='app paperGrid'>
      <MathJaxContext
        version={2}
        config={config}
        onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      >
        <Header />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
          padding: '0.5rem'
        }}>
          <TabMenu incrNumChristoffelCalculated={incrNumChristoffelCalculated} />
          <Panel incrNumChristoffelCalculated={incrNumChristoffelCalculated} resultRef={resultRef} setReset={setReset} />
        </div>
        <Result numChristoffelCalculated={numChristoffelCalculated} resultRef={resultRef} />
      </MathJaxContext>
      <Footer />
    </div>
  )
}

export default App

