import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { MathJax } from "better-react-mathjax";
import { styleButton } from '../CommonFormElements';
import InfoIcon from '@mui/icons-material/Info';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const NavigationButton = ({tensorRef,name}) =>{
  
  const executeScroll = (ref) => ref.current.scrollIntoView();

  return (
    <Button 
      variant='contained' 
      onClick={()=> executeScroll(tensorRef)}
      sx={styleButton}
      >
      {name}
    </Button>
  )
}

const Result = ({numChristoffelCalculated, resultRef}) => {

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)
  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);
  let submittedValues = JSON.parse(`${sessionStorage.getItem(FORM_SESSION)}`);

  
  const christoffel_skRef = useRef(null);
  const christoffel_fkRef = useRef(null);
  const riemannaTensorRef = useRef(null);
  const ricciTensorRef = useRef(null);
  const ricciScalarRef = useRef(null);
  const einsteinTensorRef = useRef(null);

  const resultRefOption1 = {
    "Christoffel Symbols": christoffel_skRef,
    "Christoffel Symbols (First Kind)": christoffel_fkRef,
  }
  const resultRefOption2 = {
    "Riemann Tensor": riemannaTensorRef,
    "Ricci Tensor": ricciTensorRef,
    "Ricci Scalar": ricciScalarRef,
    "Einstein Tensor": einsteinTensorRef,
  }
  
  if (christoffelParams){

  const christoffel_sk = christoffelParams["christoffel_symbols"];
  const christoffel_fk = christoffelParams["christoffel_symbols_fk"];
  const riemann_tensor = christoffelParams["riemann_tensor"]
  const ricci_tensor = christoffelParams["ricci_tensor"];
  const ricci_scalar = christoffelParams["ricci_scalar"];
  const einstein_tensor = christoffelParams["einstein_tensor"];

  return (
    <>
    <div style={{
      display: 'flex',
      fontSize: '1.5rem',
      margin: '2rem 0 0 1rem',
      fontFamily: 'Roboto',
      color: 'red'
    }}>
    <InfoIcon/> If the result below hasn't typeset properly, please refresh the page!
    </div>
      <div id={numChristoffelCalculated} className='result' ref={resultRef}>
        <div className='resultMenuBar'>
          {Object.keys(resultRefOption1).map((name,index)=>{
            return (
              <NavigationButton key={index} tensorRef={resultRefOption1[name]} name={name}/>
            )
          })}
          {
            submittedValues.onlyCS === 'option_2'
            ?
            <>
            {Object.keys(resultRefOption2).map((key,index)=>{
              return (
                <NavigationButton key={index} tensorRef={resultRefOption2[key]} name={key}/>
              )
            })}
          </>
          :
          null
        }
        </div>
        <div 
        className='resultOutput' >
          <article className='resultHeading' ref={christoffel_skRef}>
          Christoffel Symbols
          </article>
          <div className='resultMathJax'>
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
                    <MathJax className='mathJax'
                    >{"$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + "$$"}</MathJax>
                    =
                    <MathJax 
                    className='mathJax'
                    dynamic
                    >{"$$" + christoffel_sk[keyName] + "$$"}</MathJax>
                  </div>
                )
              })
              }
          </div>
          <div>
            <article className='resultHeading' ref={christoffel_fkRef}>
            Christoffel Symbols First kind (Non-Zero Components)
            </article>
            <div className='resultMathJax'>
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
                    <MathJax className='mathJax'>{"$$" + "\\Gamma_{" + keyName + "}" + "$$"}</MathJax>
                    =
                    <MathJax 
                    className='mathJax'
                    dynamic
                    >{"$$" + christoffel_fk[keyName] + "$$"}</MathJax>
                  </div>
                )
              })}
            </div>
          </div>
          {
            submittedValues.onlyCS === 'option_2'
            ?
            <>
            <div>
            <article className='resultHeading' ref={riemannaTensorRef}>
            Riemann Tensor (Non-zero components)
            </article>
             <div className='resultMathJax'>
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
                    <MathJax className='mathJax'>{"$$" + "R^{" + keyName[0] + "}_{" + keyName.slice(1,4) + "}" + "$$"}</MathJax>
                    =
                    <MathJax 
                    className='mathJax'
                    dynamic
                    >{"$$" + riemann_tensor[keyName] + "$$"}</MathJax>
                  </div>
                )
              })}
              </div>
          </div>
          <div>
            <article className='resultHeading' ref={ricciTensorRef}>
            Ricci Tensor
            </article>
            <div className='resultMathJax'>
            <div style={{
              display: 'flex',
              gap: '0.2rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MathJax className='mathJax'>{"$$" + "R_{\\mu\\nu}" + "$$"}</MathJax>
            =
            <MathJax 
            className='mathJax'
            dynamic
            >{"$$" + ricci_tensor + "$$"}</MathJax>
            </div>
            </div>
          </div>
          <div style={{
            padding: '1rem',
          }}>
            <article className='resultHeading' ref={ricciScalarRef}>
            Ricci Scalar
            </article>
            <div className='resultMathJax'>  
              <div style={{
                display: 'flex',
                gap: '0.2rem',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
            <MathJax className='mathJax'>{"$$" + "R" + "$$"}</MathJax>
              =
            <div className='resultMathJax'>
            <MathJax 
            className='mathJax'
            dynamic
            >{"$$" + ricci_scalar + "$$"}</MathJax>
            </div>
            </div>
            </div>  
          </div>
          <div>
            <article className='resultHeading' ref={einsteinTensorRef}>
            Einstein Tensor
            </article>
            <div className='resultMathJax'>
            <div style={{
              display: 'flex',
              gap: '0.2rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MathJax className='mathJax'>{"$$" + "G_{\\mu\\nu}" + "$$"}</MathJax>
            =
            <MathJax 
            className='mathJax'
            dynamic
            >{"$$" + einstein_tensor + "$$"}</MathJax>
            </div>
            </div>
          </div>
          <div style={{
            textAlign: 'right'
          }}>
            <ArrowUpwardIcon sx={{
              background: 'black',
              color: 'white',
              borderRadius: '0.3rem',
              "&:hover": {
                cursor: 'pointer'
              }
            }}
            fontSize='large'
            onClick={()=> {
              resultRef.current.scrollTop = 0;
            }}

            />
          </div>
            </>
            :
            null
          }
        </div>
      </div>
      </>
    )}
    else{
      return(
        <div ref={resultRef}>
        </div>
      )
    }
}

export default Result
