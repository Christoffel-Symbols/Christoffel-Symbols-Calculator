import React, {useState} from 'react'
import Box from '@mui/material/Box';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import FormGroup from '@mui/material/FormGroup';
import { CommonTextField, CommonCheckBox, CommonSelect } from '../CommonFormElements';

const CoordList = ({numCoords}) => {

  const coordList = ['x','y','z','t'];
  const displayList = coordList.splice(0,numCoords);

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

const Parameters = ({myInitialValues}) => {
  return (
    <>
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          
      <div style={{
        border: '3px solid black',
        padding:'0.5rem',
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        Number of Dimensions
       <CommonSelect
          name="num_coordinates"
          values={myInitialValues}
          label="Dimensions"
          options={[2,3,4]}
       />
        </div>
        <div style={{
          fontSize: '2rem',
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        Reserve Parameters
        <FormGroup>
        <CommonCheckBox
          name="reserve_parameters.a"
          values={myInitialValues.reserve_parameters.a}
          label="a(t) (Scale Factor)"
        />
        <CommonCheckBox
          name="reserve_parameters.p"
          values={myInitialValues.reserve_parameters.p}
          label="p(t) (Pressure as a function of time)"
        />
        <CommonCheckBox
          name="reserve_parameters.P"
          values={myInitialValues.reserve_parameters.P}
          label="&#961;(t) (Density as a function of time)"
        />
        </FormGroup>
        </div>
      </div>
      <div style={{
        border: '3px solid black',
        padding:'0.5rem',
        fontSize: '2rem'
      }}>
        Define Variable Parameters
        <Box style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            
          &#120572; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          = 
          <CommonTextField
            name="variable_parameters.alpha"
            value={myInitialValues.variable_parameters.alpha}
            placeholder={"Example: x**2 + y**2"}
          />
          </span>

          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}> 
          &delta; (<CoordList numCoords={myInitialValues.num_coordinates}/>)
          = 
          <CommonTextField
            name="variable_parameters.delta"
            value={myInitialValues.variable_parameters.delta}
            placeholder={"Example: x**2 + 2*y"}
          />
          </span>

          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
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
      </div>
    </>
  )
}

export default Parameters;
