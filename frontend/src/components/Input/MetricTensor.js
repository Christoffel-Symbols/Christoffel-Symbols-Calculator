import React from 'react'
import {Button} from "@mui/material";
import { MatrixComponent } from '../CommonFormElements';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useFormikContext } from 'formik';
import { styleButton } from '../CommonFormElements';


const MetricTensor = ({myInitialValues}) => {
  const dummyList = ['t','x','y','z'];
  var coordList = dummyList.splice(0,myInitialValues.num_coordinates);

  if(myInitialValues.num_coordinates !==4){
     coordList = ['t','x','y','z'].splice(1,myInitialValues.num_coordinates);
  }

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);

  const { setFieldValue } = useFormikContext();

  const handleClick = () => {
    // setFieldValue('metric_tensor[0][0]', '0');
    coordList.map((coord,index)=>{
      let row = index;
          {coordList.map((coord,index)=>{
            let col = index;
                setFieldValue(`metric_tensor${'[' + String(row) + ']' + '[' + String(col) + ']'}]`, '0')
          })}
    })
  };


  return (
      <div className='metricTensor'>
      <div>
      <Stack direction="row" spacing={1} sx={{
        marginBottom: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center'
      }}>
      {
        coordList.map((coord, index)=>{
          return(
             <Chip sx={{
            backgroundColor: 'green',
            color: 'white'
          }} key={coord} label={
          <span style={{
            fontSize: '1.2rem'
          }}>
            {coord}
          </span>
          } />
          )
        })
      }
      {
      Object.keys(myInitialValues["reserve_parameters"]).map((keyName) => {
        return(
          myInitialValues["reserve_parameters"][keyName]
          ?
          <Chip sx={{
            backgroundColor: 'red',
            color: 'white'
          }} key={keyName} label={
            <span>
              INPUT {
              keyName === 'P' 
              ? 
              <span>
                &#961; 
              </span>
              : keyName
              }(t) as {keyName}
            </span>
          
          } />
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
              <>
              <span>Input </span>
              <span style={{
                fontSize: '1.2rem'
              }}>&#120572;</span>
              <span> as `alpha`</span>
              </>
              :
              keyName === 'delta'
              ?
              <>
              <span>Input </span>
               <span style={{
                fontSize: '1rem'
              }}>&delta;</span>
              <span> as `delta`</span>
              </>
              :
              <>
              <span>Input </span>
               <span style={{
                fontSize: '1.2rem'
              }}>&#949;</span>
              <span> as `epsilon`</span>
              </>
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
      <div style={{
        marginTop: '0.5rem'
      }}>
        <Button 
        onClick={handleClick}
        sx={styleButton}
        >Reset</Button>
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
