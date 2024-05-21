import React from 'react';
import { CommonTextField } from '../CommonFormElements';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';

const CoordList = ({numCoords}) => {

  const coordList = ['t','x','y','z'];
  var displayList = coordList.splice(0,numCoords);
  
  if(numCoords !== 4){
    displayList = ['t','x','y','z'].splice(1,numCoords);
  }


  return (
    displayList.map((coord, index)=>
    index === numCoords - 1
    ?
    coord
    :
    coord + ','
    )
  )
}

const VariableParameters = ({myInitialValues}) => {
  return (
         <div className='rightPanel'>
        <article className='panelHeading'>
        Define Variable Parameters
        </article>
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <span className='variable'>
            
          &#120572; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          = 
          <CommonTextField
            name="variable_parameters.alpha"
            value={myInitialValues.variable_parameters.alpha}
            placeholder={"Example: sin(pi*x) + e**y"}
          />
          </span>

          <span className='variable'> 
          <article>
          &delta; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          = 
          </article>
          <CommonTextField
            name="variable_parameters.delta"
            value={myInitialValues.variable_parameters.delta}
            placeholder={"Example: z**(1/2) + abs(t)"}
          />
          </span>

          <span className='variable'>
          &#949; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          =
          <CommonTextField
            name="variable_parameters.epsilon"
            value={myInitialValues.variable_parameters.epsilon}
            placeholder={"Example: log10(x**10)"}
          />
          </span>
        </Box>
             <article style={{
        marginTop: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem',
        fontFamily: 'Roboto',
        textWrap: 'wrap',
      }}>
      <WarningIcon sx={{
        color: 'red',
        fontSize: '1.4rem'
      }}/> 
      <span style={{
          fontSize: '1.2rem',
          marginTop:'0.1rem'
      }}>
        Use <b>Python Syntax</b> and <b>Mathematical Operators</b>.
        </span>
      </article>
      </div>
  )
}

export default VariableParameters
