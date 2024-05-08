import React, { useState } from 'react';


import MetricTensor from './MetricTensor';
import TabMenu from './TabMenu';
import Options from './Options';
import About from './About';
import Examples from './Examples';
import Guide from './Guide';
import { Button } from '@mui/material';


const Input = () => {

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)

  let myInitialValues = {}

  if (sessionStorage.getItem(FORM_SESSION) === null){
    myInitialValues = {
    num_coordinates: 2,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    reserve_parameters: {
      a: 'False',
      p: 'False',
      P: 'False',
      e: 'False'
    },
    metric_tensor: [[0,0], [0,0]]
    }
  } else {
    myInitialValues = JSON.parse(`${sessionStorage.getItem(FORM_SESSION)}`);
  }

  const [selected, setSelected] = useState('');

  return (
    <>
    <div className='input'>
      <TabMenu setSelected={setSelected}/>
        {
        selected === ''
        ?
        <Options myInitialValues={myInitialValues}/>
        :
        selected === 'ABOUT'
        ?
        <About/>
        :
        selected === 'EXAMPLES'
        ?
        <Examples/>
        :
        selected === 'QUICK GUIDE'
        ?
        <Guide/>
        :
        <Options myInitialValues={myInitialValues}/>
        }
    <Button size='large' variant='contained'>Calculate</Button>
    </div>
    </>
  )
}

export default Input
