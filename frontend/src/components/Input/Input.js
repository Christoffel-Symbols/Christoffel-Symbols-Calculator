import React, { useState } from 'react';


import MetricTensor from './MetricTensor';
import TabMenu from './TabMenu';
import Options from './Options';
import About from './About';
import Examples from './Examples';
import Guide from './Guide';
import { Button } from '@mui/material';


const Input = () => {

  const [selected, setSelected] = useState('');
  const [coordList, setCoordList] = useState(['x','y']);

  return (
    <>
    <div className='input'>
      <TabMenu setSelected={setSelected}/>
      <div style={{
        display: 'flex',
        gap:'1rem'
      }}>
        {
        selected === ''
        ?
        <Options coordList={coordList} setCoordList={setCoordList}/>
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
        <Options coordList={coordList} setCoordList={setCoordList}/>
        }
      </div>
    <MetricTensor coordList={coordList}/>
    <Button size='large' variant='contained'>Calculate</Button>
    </div>
    </>
  )
}

export default Input
