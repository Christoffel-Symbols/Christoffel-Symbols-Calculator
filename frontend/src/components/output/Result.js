import React from 'react'
import { Button } from '@mui/material'
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Result = ({numChristoffelCalculated}) => {

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);
  let christoffel_sk = christoffelParams["christoffel_symbols"];
  let ricci_tensor = christoffelParams["ricci_tensor"];
  let einstein_tensor = christoffelParams["einstein_tensor"];
  let ricci_scalar = christoffelParams["ricci_scalar"];
  let christoffel_fk = christoffelParams["christoffel_symbols_fk"];
  let riemann_tensor = christoffelParams["riemann_tensor"]

  return (
    <div className='result'>
      <Button variant='outlined' size='large' sx={{
        marginBottom:'1rem'
      }}>Result - {numChristoffelCalculated}</Button>
      <div style={{
        padding: '0.5rem',
        border: '3px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        Christoffel Symbols (Second kind)
        <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
          <MathJaxContext>
            {Object.keys(christoffel_sk).map((keyName)=>{
              return(
              <div 
                style={{
                  display: 'flex',
                  gap: '0.2rem',
                  alignItems: 'center',
                  border: '3px solid black',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
                key={keyName}>
                  <MathJax>{"$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + "$$"}</MathJax>
                  =
                  <MathJax>{"$$" + christoffel_sk[keyName] + "$$"}</MathJax>
                </div>
              )
            })
            }
          </MathJaxContext>
        </div>
        <div>
          Christoffel Symbols (First kind)
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
          <MathJaxContext>
            {Object.keys(christoffel_fk).map((keyName)=>{
              return(
                <div 
                style={{
                  display: 'flex',
                  gap: '0.2rem',
                  alignItems: 'center',
                  border: '3px solid black',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
                key={keyName}>
                  <MathJax>{"$$" + "\\Gamma_{" + keyName + "}" + "$$"}</MathJax>
                  =
                  <MathJax>{"$$" + christoffel_fk[keyName] + "$$"}</MathJax>
                </div>
              )
            })}
          </MathJaxContext>
          </div>
        </div>
        <div>
          Riemann Tensor (Non-zero components)
           <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>

          <MathJaxContext>
            {Object.keys(riemann_tensor).map((keyName)=>{
              return(
                <div 
                style={{
                  display: 'flex',
                  gap: '0.2rem',
                  alignItems: 'center',
                  border: '3px solid black',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
                key={keyName}>
                  <MathJax>{"$$" + "R_{" + keyName + "}" + "$$"}</MathJax>
                  =
                  <MathJax>{"$$" + riemann_tensor[keyName] + "$$"}</MathJax>
                </div>
              )
            })}
          </MathJaxContext>
            </div>
        </div>
        <div>
          Ricci Tensor
        <MathJaxContext>
          <MathJax>{"$$" + ricci_tensor + "$$"}</MathJax>
        </MathJaxContext>
        </div>
        <div style={{
          padding: '1rem'
        }}>
          Ricci Scalar
        <MathJaxContext>
          <MathJax>{"$$" + ricci_scalar + "$$"}</MathJax>
        </MathJaxContext>

        </div>
        <div>
          Einstein Tensor (Non-zero components)
        <MathJaxContext>
          <MathJax>{"$$" + einstein_tensor + "$$"}</MathJax>
        </MathJaxContext>
        </div>
      </div>
    </div>
  )
}

export default Result
