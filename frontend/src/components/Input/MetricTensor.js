import React from 'react'
import { MatrixComponent } from '../CommonFormElements';
import { MathJax } from "better-react-mathjax";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import WarningIcon from '@mui/icons-material/Warning';
import { Link } from '@mui/material';

const chipStyle={
        marginBottom: '0.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center'
}

const MetricTensor = ({myInitialValues}) => {

  const dummyList = ['t','x','y','z'];
  var coordList = dummyList.splice(0,myInitialValues.num_coordinates);

  if(myInitialValues.num_coordinates !==4){
     coordList = ['t','x','y','z'].splice(1,myInitialValues.num_coordinates);
  }

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);

  // const handleClick = () => {

  //   coordList.map((coord,index)=>{
  //     let row = index;
  //         {coordList.map((coord,index)=>{
  //           let col = index;
  //               setFieldValue(`metric_tensor${'[' + String(row) + ']' + '[' + String(col) + ']'}]`, '0')
  //         })}
  //   })
  // };


  return (
    <div style={{
      alignItems: 'center',
      width: '90%'
    }}>
    <div style={{
      fontSize: '2rem',
      textAlign: 'center',
      marginTop: '0.5rem'
    }}>
          <article className='panelHeading'>
        Metric Tensor
          </article>
    </div>
      <div className='metricTensor'>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
            <MathJax>{"$$ g_{\\mu\\nu} =  $$"}</MathJax>
      <div>
      <Stack direction="row" spacing={1} sx={chipStyle}>
      {
        coordList.map((coord, index)=>{
          return(
             <Chip sx={{
            backgroundColor: 'green',
            color: 'white',
            padding: '0.3rem 0 0.5rem'
          }} key={coord} label={
          <span style={{
            fontSize: '1.2rem'
          }}>
             <MathJax dynamic>{"$$" + "x^{" + index + "} = " + coord + "$$"}</MathJax>
          </span>
          } />
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
              }}>&#120572;({
                coordList.map((coord, index)=>
                      index === coordList.length - 1
                      ?
                      coord
                      :
                      coord + ','
                      )
              })</span>
              <span> as alpha</span>
              </>
              :
              keyName === 'delta'
              ?
              <>
              <span>Input </span>
               <span style={{
                fontSize: '1rem'
              }}>&delta;({
                coordList.map((coord, index)=>
                      index === coordList.length - 1
                      ?
                      coord
                      :
                      coord + ','
                      )
              })</span>
              <span> as delta</span>
              </>
              :
              <>
              <span>Input </span>
               <span style={{
                fontSize: '1.2rem'
              }}>&#949;({
                coordList.map((coord, index)=>
                      index === coordList.length - 1
                      ?
                      coord
                      :
                      coord + ','
                      )
              })</span>
              <span> as epsilon</span>
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
        backgroundColor:'white',
      }}>
        <div>
        {
          coordList.map((coord,index)=>{
            let row = index;
            return(
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.3rem',
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
      <article style={{
        marginTop: '0.5rem',
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
        Use <b>Python Syntax</b> and <b>Mathematical Operators</b> to fill the Metric Tensor.
        </span>
      </article>
      </div>
      </div>
      {
        christoffelParams?.metric_tensor
        ?
        <div style={{
        border: '3px solid',
        padding: '1rem',
         backgroundColor: 'white',
         overflow: 'scroll'
      }}>
            <MathJax dynamic>{"$$" + christoffelParams["metric_tensor"] + "$$"}</MathJax>
        </div>
        :
        <div className='metricTensorDisplayMessage'>
        LaTeX version 
        (supported by <Link href="https://github.com/fast-reflexes/better-react-mathjax">
        MathJax
        </Link>
        ) of the Metric Tensor will be displayed here after a request is submitted.
        </div>

      }
    </div>
        </div>
  )
}

export default MetricTensor
