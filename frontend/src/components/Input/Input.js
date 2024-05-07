import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField} from "@mui/material";

import { MathJax, MathJaxContext } from "better-react-mathjax";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MetricTensor from './MetricTensor';
import TabMenu from './TabMenu';

const Input = () => {

  const [dimensions, setDimensions] = useState(2);
  const [coordList, setCoordList] = useState(['x','y']);

  const handleChange = (e) => {
    setDimensions(e.target.value);
    
    switch(e.target.value){
      case 2:
        setCoordList(['x','y'])
        break
      case 3:
        setCoordList(['x','y','z'])
        break
      case 4:
        setCoordList(['t','x','y','z'])
    }
  }

  return (
    <>
    <div className='input'>
      <div style={{
        display: 'flex',
        gap:'1rem'
      }}>
       <div style={{
        border: '3px solid red',
        padding:'0.5rem',
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          border: '3px solid black',
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        Number of Dimensions
        <Box sx={{ minWidth: 120, padding: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel>Dimensions</InputLabel>
            <Select
              value={dimensions}
              label="Dimensions"
              onChange={handleChange}
              autoWidth
              >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
      </Box>
        </div>
        <div style={{
          border: '3px solid black',
          fontSize: '2rem',
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        <>
          Reserve Parameters
          <div>
            <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="a(t) (Scale Factor)" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="p(t) (Pressure as a function of time)" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="&#961;(t) (Density as a function of time)" />
        </FormGroup>
          </div>
        </>
        </div>
      </div>
      <div style={{
        border: '3px solid red',
        padding:'0.5rem',
        fontSize: '2rem'
      }}>
        Define Variable Parameters
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p>
          &#120572; ({coordList.map((coord)=>{
            return(
              <>
              {coord}
              </>
            )
          })}) = <TextField variant="outlined" />
          </p>

          <p>
          &delta; ({coordList.map((coord)=>{
            return(
              <>
              {coord}
              </>
            )
          })}) = <TextField variant="outlined" />
          </p>

          <p>
          &#949; ({coordList.map((coord)=>{
            return(
              <>
              {coord}
              </>
            )
          })}) = <TextField variant="outlined" />
          </p>
        </Box>
      </div>
      <TabMenu/>
      </div>
    <MetricTensor coordList={coordList}/>
    </div>
    </>
  )
}

export default Input
