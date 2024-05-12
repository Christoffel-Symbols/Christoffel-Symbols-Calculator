import React from 'react'
import {Button, TextField} from "@mui/material";
import { MatrixComponent } from '../CommonFormElements';
import {Formik, Form} from "formik";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const MetricTensor = ({myInitialValues}) => {
  const dummyList = ['x','y','z','t'];
  const coordList = dummyList.splice(0,myInitialValues.num_coordinates);

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);


  return (
      <div className='metricTensor'>
      <div>
      <Stack direction="row" spacing={1} sx={{
        marginBottom: '0.5rem'
      }}>
      {
      Object.keys(myInitialValues["reserve_parameters"]).map((keyName) => {
        return(
          myInitialValues["reserve_parameters"][keyName]
          ?
          <Chip sx={{
            backgroundColor: 'red',
            color: 'white'
          }} key={keyName} label={"INPUT " + keyName + "(t) as " + keyName} />
          :
          null
        )
        })
      }
      {
      Object.keys(myInitialValues["variable_parameters"]).map((keyName) => {
        return(
          myInitialValues["variable_parameters"][keyName]
          ?
          <Chip sx={{
            backgroundColor: 'red',
            color: 'white'
          }} key={keyName} label={
            <span>
              {
              keyName === 'alpha'
              ?
              <span style={{
                fontSize: '1.2rem'
              }}>&#120572;</span>
              :
              keyName === 'delta'
              ?
              <span style={{
                fontSize: '1rem'
              }}>&delta;</span>
              :
              <span style={{
                fontSize: '1.2rem'
              }}>&#949;</span>
              }
            </span>
          
          } />
          :
          null
        )
        })
      }
        </Stack>
      <div style={{
        border: '3px solid',
        borderRadius: '2rem',
        display: 'flex',
        padding: '1rem',
        justifyContent: 'center',
        backgroundColor:'white'
      }}>
        <div>
        {
          coordList.map((coord,index)=>{
            let row = index;
            return(
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.3rem'
              }}
              key={row}
              >
                {coordList.map((coord,index)=>{
                  let col = index;
                  return(
                    <MatrixComponent
                    key={col}
                      placeholder={'(' + String(row) + ',' + String(col) + ')'}
                      name={`metric_tensor${'[' + String(row) + ']' + '[' + String(col) + ']'}]`}
                      value={myInitialValues.metric_tensor[row,col]}
                    />
                  )
                })}
              </div>
            )
          })
        }
        </div>
      </div>
      </div>
      <div>
      =
      </div>
      {
        christoffelParams?.metric_tensor
        ?
        <div style={{
          backgroundColor: 'white'
        }}>
        <div style={{
        border: '3px solid',
        padding: '1rem',
      }}>
         <MathJaxContext>
            <MathJax>{"$$" + christoffelParams["metric_tensor"] + "$$"}</MathJax>
          </MathJaxContext>
        </div>
        </div>
        :
        <div style={{
        border: '3px solid',
        padding: '1rem',
        backgroundColor: 'white',
        width: '30%',
        width: 'auto',
        height: 'auto'
        }}>
        Please submit a new request to see how the inputted metric tensor will be evaluated. 
        </div>

      }
    </div>
  )
}

export default MetricTensor
