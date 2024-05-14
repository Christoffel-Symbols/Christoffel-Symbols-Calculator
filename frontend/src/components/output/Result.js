import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { styleButton } from '../CommonFormElements';

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

    const christoffel_sk = christoffelParams["christoffel_symbols"];
    const christoffel_fk = christoffelParams["christoffel_symbols_fk"];
    const riemann_tensor = christoffelParams["riemann_tensor"]
    
    if(Object.keys(riemann_tensor).length === 0){
      return (
      <div id={numChristoffelCalculated} className='result' ref={resultRef}>
        <div className='resultMenuBar'>
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
        </div>
        <div 
        className='paperGrid'
        style={{
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          margin: '0rem 1rem 0rem 1rem',
        }}>
          <article className='resultHeading' ref={christoffel_skRef}>
          Christoffel Symbols
          </article>
          <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              overflow: 'scroll'
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
                    padding: '1rem',
                  }}
                  key={keyName}>
                    <MathJax>{"$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + "$$"}</MathJax>
                    =
                    <MathJax className='mathJax'>{"$$" + christoffel_sk[keyName] + "$$"}</MathJax>
                  </div>
                )
              })
              }
            </MathJaxContext>
          </div>
          <div>
            <article className='resultHeading' ref={christoffel_fkRef}>
            Christoffel Symbols First kind (Non-Zero Components)
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
                    <MathJax className='mathJax'>{"$$" + christoffel_fk[keyName] + "$$"}</MathJax>
                  </div>
                )
              })}
            </MathJaxContext>
            </div>
          </div>
        </div>
      </div>
    )
    } else {

      const ricci_tensor = christoffelParams["ricci_tensor"];
      const ricci_scalar = christoffelParams["ricci_scalar"];
      const einstein_tensor = christoffelParams["einstein_tensor"];

      return (
      <div id={numChristoffelCalculated} className='result' ref={resultRef}>
        <div className='resultMenuBar'>
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
          margin: '0rem 1rem 0rem 1rem',
        }}>
          <article className='resultHeading' ref={christoffel_skRef}>
          Christoffel Symbols
          </article>
          <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              overflow: 'scroll'
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
                    padding: '1rem',
                  }}
                  key={keyName}>
                    <MathJax>{"$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + "$$"}</MathJax>
                    =
                    <MathJax className='mathJax'>{"$$" + christoffel_sk[keyName] + "$$"}</MathJax>
                  </div>
                )
              })
              }
            </MathJaxContext>
          </div>
          <div>
            <article className='resultHeading' ref={christoffel_fkRef}>
            Christoffel Symbols First kind (Non-Zero Components)
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
                    <MathJax className='mathJax'>{"$$" + christoffel_fk[keyName] + "$$"}</MathJax>
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
                    <MathJax className='mathJax'>{"$$" + riemann_tensor[keyName] + "$$"}</MathJax>
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
            <MathJax className='mathJax'>{"$$" + ricci_tensor + "$$"}</MathJax>
          </MathJaxContext>
          </div>
          <div style={{
            padding: '1rem'
          }}>
            <article className='resultHeading' ref={ricciScalarRef}>
            Ricci Scalar
            </article>
          <MathJaxContext>
            <MathJax className='mathJax'>{"$$" + ricci_scalar + "$$"}</MathJax>
          </MathJaxContext>
  
          </div>
          <div>
            <article className='resultHeading' ref={einsteinTensorRef}>
            Einstein Tensor
            </article>
          <MathJaxContext>
            <MathJax className='mathJax'>{"$$" + einstein_tensor + "$$"}</MathJax>
          </MathJaxContext>
          </div>
        </div>
      </div>
    )

    }

  } else{
    return(
      <div ref={resultRef}>
      </div>
    )
  }
}

export default Result
