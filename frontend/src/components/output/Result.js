import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { MathJax, MathJaxContext } from "better-react-mathjax";

const styleButton = {
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    border: 'solid #006d77'
  },
  "&:active": {
    backgroundColor: '#006d77'
  },
  backgroundColor: '#006d77',
  color: 'white',
  fontSize: '1rem',
  fontFamily: 'Roboto',
  letterSpacing: '3px',
};

const Result = ({numChristoffelCalculated, resultRef}) => {

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);

  const christoffel_skRef = useRef(null);
  const christoffel_fkRef = useRef(null);
  const riemannaTensorRef = useRef(null);
  const ricciTensorRef = useRef(null);
  const ricciScalarRef = useRef(null);
  const einsteinTensorRef = useRef(null);
  
  const executeScroll = (ref) => ref.current.scrollIntoView();
  
  if (christoffelParams){
    let christoffel_sk = christoffelParams["christoffel_symbols"];
    let ricci_tensor = christoffelParams["ricci_tensor"];
    let einstein_tensor = christoffelParams["einstein_tensor"];
    let ricci_scalar = christoffelParams["ricci_scalar"];
    let christoffel_fk = christoffelParams["christoffel_symbols_fk"];
    let riemann_tensor = christoffelParams["riemann_tensor"]
  
    return (
      <div id={numChristoffelCalculated} className='result' ref={resultRef}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
          margin: '1rem 1rem 1rem 1rem',
          justifyContent: 'center'
        }}>
          <Button 
          variant='contained' 
          onClick={()=> executeScroll(christoffel_skRef)}
          sx={styleButton}
          >
          Christoffel Symbols
          </Button>
          <Button 
          variant='contained'
          onClick={()=> executeScroll(christoffel_fkRef)}
          sx={styleButton}
          >Christoffel Symbols (First Kind)
          </Button>
          <Button 
          variant='contained'
          onClick={()=> executeScroll(riemannaTensorRef)}
          sx={styleButton}
          >
           Riemann Tensor
          </Button>
          <Button 
          variant='contained'
          onClick={()=> executeScroll(ricciTensorRef)}
          sx={styleButton}
          >
          Ricci Tensor
          </Button>
          <Button
          variant='contained'
          onClick={()=> executeScroll(ricciScalarRef)}
          sx={styleButton}
          >
          Ricci Scalar
          </Button>
          <Button 
          variant='contained'
          onClick={()=> executeScroll(einsteinTensorRef)}
            sx={styleButton}
          >
          Einstein Tensor
          </Button>
        </div>
        <div 
        className='paperGrid'
        style={{
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: '0rem 1rem 0rem 1rem'
        }}>
          <article className='resultHeading' ref={christoffel_skRef}>
          Christoffel Symbols (Second kind)
          </article>
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
            <article className='resultHeading' ref={christoffel_fkRef}>
            Christoffel Symbols (First kind)
            </article>
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
            <article className='resultHeading' ref={riemannaTensorRef}>
            Riemann Tensor (Non-zero components)
            </article>
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
            <article className='resultHeading' ref={ricciTensorRef}>
            Ricci Tensor
            </article>
          <MathJaxContext>
            <MathJax>{"$$" + ricci_tensor + "$$"}</MathJax>
          </MathJaxContext>
          </div>
          <div style={{
            padding: '1rem'
          }}>
            <article className='resultHeading' ref={ricciScalarRef}>
            Ricci Scalar
            </article>
          <MathJaxContext>
            <MathJax>{"$$" + ricci_scalar + "$$"}</MathJax>
          </MathJaxContext>
  
          </div>
          <div>
            <article className='resultHeading' ref={einsteinTensorRef}>
            Einstein Tensor (Non-zero components)
            </article>
          <MathJaxContext>
            <MathJax>{"$$" + einstein_tensor + "$$"}</MathJax>
          </MathJaxContext>
          </div>
        </div>
      </div>
    )
  } else{
    return(
      <div ref={resultRef}>
      </div>
    )
  }
}

export default Result
