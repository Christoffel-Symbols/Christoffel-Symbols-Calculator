import React from 'react';
import { CommonTextField } from '../CommonFormElements';
import Box from '@mui/material/Box';

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
            placeholder={"Example: x**2 + y**2"}
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
            placeholder={"Example: x**2 + 2*y"}
          />
          </span>

          <span className='variable'>
          &#949; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          =
          <CommonTextField
            name="variable_parameters.epsilon"
            value={myInitialValues.variable_parameters.epsilon}
            placeholder={"Example: 2*x + 2*y"}
          />
          </span>
        </Box>
      </div>
  )
}

export default VariableParameters
