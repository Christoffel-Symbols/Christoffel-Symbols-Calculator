import React from 'react'
import {Button, TextField} from "@mui/material";
import { MatrixComponent } from '../CommonFormElements';
import {Formik, Form} from "formik";
import { MathJax, MathJaxContext } from "better-react-mathjax";


const MetricTensor = ({myInitialValues}) => {
  const dummyList = ['x','y','z','t'];
  const coordList = dummyList.splice(0,myInitialValues.num_coordinates);

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);


  return (
    <>
    <Button variant='outlined' size='large' sx={{
      marginTop: '1rem'
    }}>Metric Tensor</Button>
    <div className='metricTensor'>
      <div style={{
        border: '3px solid',
        borderColor: 'white black white black',
        borderRadius: '2rem',
        display: 'flex',
        padding: '1rem',
        justifyContent: 'center'
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
      =
      {
        christoffelParams?.metric_tensor
        ?
        <div style={{
        border: '3px solid',
        padding: '1rem',
        backgroundColor: 'white',
      }}>
         <MathJaxContext>
            <MathJax>{"$$" + christoffelParams["metric_tensor"] + "$$"}</MathJax>
          </MathJaxContext>
        </div>
        :
        <div style={{
        border: '3px solid',
        padding: '1rem',
        backgroundColor: 'white',
        width: '30%'
        }}>
        Please submit a new request to see how the inputted metric tensor will be evaluated. 
        <br/>
        Click on CALCULATE.
        </div>

      }
    </div>
     </>
  )
}

export default MetricTensor
