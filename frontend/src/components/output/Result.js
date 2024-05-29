import React, { useRef } from 'react'
import { Button } from '@mui/material'
import { MathJax } from "better-react-mathjax";
import { styleButton } from '../CommonFormElements';
import InfoIcon from '@mui/icons-material/Info';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ExportToLatex from './ExportToLatex';

const NavigationButton = ({ tensorRef, name }) => {

  const executeScroll = (ref) => ref.current.scrollIntoView();

  return (
    <Button
      variant='contained'
      onClick={() => executeScroll(tensorRef)}
      sx={styleButton}
    >
      {name}
    </Button>
  )
}

const Result = ({ numChristoffelCalculated, resultRef }) => {

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)
  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)

  const christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);
  const christoffelForm = JSON.parse(`${sessionStorage.getItem(FORM_SESSION)}`);


  const christoffelSkRef = useRef(null);
  const christoffelFkRef = useRef(null);
  const riemannTensorSkRef = useRef(null);
  const riemannTensorFkRef = useRef(null);
  const ricciTensorRef = useRef(null);
  const ricciScalarRef = useRef(null);
  const einsteinTensorRef = useRef(null);

  const resultRefOptions = {
    "Christoffel Symbols first kind": christoffelFkRef,
    "Christoffel Symbols second kind": christoffelSkRef,
    "Riemann Tensor first kind": riemannTensorFkRef,
    "Riemann Tensor second kind": riemannTensorSkRef,
    "Ricci Tensor": ricciTensorRef,
    "Ricci Scalar": ricciScalarRef,
    "Einstein Tensor": einsteinTensorRef,
  }

  if (christoffelParams) {

    const christoffelFk = christoffelParams["christoffel_symbols_fk"];
    const christoffelSk = christoffelParams["christoffel_symbols_sk"];
    const riemannTensorFk = christoffelParams["riemann_tensor_fk"];
    const riemannTensorSk = christoffelParams["riemann_tensor_sk"];
    const ricciTensor = christoffelParams["ricci_tensor"];
    const ricciScalar = christoffelParams["ricci_scalar"];
    const einsteinTensor = christoffelParams["einstein_tensor"];

    const calculateOptions = christoffelForm['calculate_options'];
    return (
      <>
        <div style={{
          display: 'flex',
          fontSize: '1.5rem',
          margin: '2rem 0 0 1rem',
          fontFamily: 'Roboto',
          color: 'red'
        }}>
          <InfoIcon /> If the result below hasn't typeset properly, please refresh the page!
        </div>
        <div id={numChristoffelCalculated} className='result' ref={resultRef}>
          <div className='resultMenuBar'>

            {Object.keys(resultRefOptions).map((name, index) => {
              return (
                <span key={index}>
                  {
                    calculateOptions.includes(name)
                      ?
                      <NavigationButton tensorRef={resultRefOptions[name]} name={name} />
                      :
                      null
                  }
                </span>
              )
            })}

          </div>

          <div className='resultOutput' >

            {
              christoffelFk
                ?
                <div>
                  <article className='resultHeading' ref={christoffelFkRef}>
                    Christoffel Symbols first kind
                  </article>
                  <ExportToLatex result={christoffelFk} name="christoffelFk" />
                  <div className='resultMathJax'>
                    {Object.keys(christoffelFk).map((keyName) => {
                      return (
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
                          <MathJax className='mathJax'>{"$$" + "\\Gamma_{" + keyName + "}" + " = $$"}</MathJax>
                          <MathJax
                            className='mathJax'
                            dynamic
                          >{"$$" + christoffelFk[keyName] + "$$"}</MathJax>
                        </div>
                      )
                    })}
                  </div>
                </div>
                :
                null
            }
            {
              christoffelSk ?
                <>
                  <article className='resultHeading' ref={christoffelSkRef}>
                    Christoffel Symbols second kind
                  </article>
                  <ExportToLatex result={christoffelSk} name="christoffelSk" />
                  <div className='resultMathJax'>
                    {Object.keys(christoffelSk).map((keyName) => {
                      return (
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
                          >{"$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + " = $$"}</MathJax>
                          <MathJax
                            className='mathJax'
                            dynamic
                          >{"$$" + christoffelSk[keyName] + "$$"}</MathJax>
                        </div>
                      )
                    })
                    }
                  </div>
                </>
                :
                null
            }
            {
              riemannTensorFk
                ?
                <div>
                  <article className='resultHeading' ref={riemannTensorFkRef}>
                    Riemann Tensor first kind
                  </article>
                  <ExportToLatex result={riemannTensorFk} name="riemannTensorFk" />
                  <div className='resultMathJax'>
                    {Object.keys(riemannTensorFk).map((keyName) => {
                      return (
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
                          <MathJax className='mathJax'>{"$$" + "R_{" + keyName + "}" + " = $$"}</MathJax>
                          <MathJax
                            className='mathJax'
                            dynamic
                          >{"$$" + riemannTensorFk[keyName] + "$$"}</MathJax>
                        </div>
                      )
                    })}
                  </div>
                </div>
                :
                null
            }
            {
              riemannTensorSk
                ?
                <div>
                  <article className='resultHeading' ref={riemannTensorSkRef}>
                    Riemann Tensor second kind
                  </article>
                  <ExportToLatex result={riemannTensorSk} name="riemannTensorSk" />
                  <div className='resultMathJax'>
                    {Object.keys(riemannTensorSk).map((keyName) => {
                      return (
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
                          <MathJax className='mathJax'>{"$$" + "R^{" + keyName[0] + "}_{" + keyName.slice(1, 4) + "}" + " = $$"}</MathJax>
                          <MathJax
                            className='mathJax'
                            dynamic
                          >{"$$" + riemannTensorSk[keyName] + "$$"}</MathJax>
                        </div>
                      )
                    })}
                  </div>
                </div>
                :
                null
            }
            {ricciTensor
              ?

              <div>
                <article className='resultHeading' ref={ricciTensorRef}>
                  Ricci Tensor
                </article>
                <ExportToLatex result={ricciTensor} name="ricciTensor" />
                <div className='resultMathJax'>
                  <div style={{
                    display: 'flex',
                    gap: '0.2rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MathJax className='mathJax'>{"$$" + "R_{\\mu\\nu}" + " = $$"}</MathJax>
                    <MathJax
                      className='mathJax'
                      dynamic
                    >{"$$" + ricciTensor + "$$"}</MathJax>
                  </div>
                </div>
              </div>
              :
              null
            }

            {
              ricciScalar
                ?
                <div style={{
                  padding: '1rem',
                }}>
                  <article className='resultHeading' ref={ricciScalarRef}>
                    Ricci Scalar
                  </article>
                  <ExportToLatex result={ricciScalar} name="ricciScalar" />
                  <div className='resultMathJax'>
                    <div style={{
                      display: 'flex',
                      gap: '0.2rem',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MathJax className='mathJax'>{"$$" + "R" + " = $$"}</MathJax>
                      <div className='resultMathJax'>
                        <MathJax
                          className='mathJax'
                          dynamic
                        >{"$$" + ricciScalar + "$$"}</MathJax>
                      </div>
                    </div>
                  </div>
                </div>
                :
                null
            }


            {einsteinTensor
              ?
              <div>
                <article className='resultHeading' ref={einsteinTensorRef}>
                  Einstein Tensor
                </article>
                <ExportToLatex result={einsteinTensor} name="einsteinTensor" />
                <div className='resultMathJax'>
                  <div style={{
                    display: 'flex',
                    gap: '0.2rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MathJax className='mathJax'>{"$$" + "G_{\\mu\\nu}" + " = $$"}</MathJax>
                    <MathJax
                      className='mathJax'
                      dynamic
                    >{"$$" + einsteinTensor + "$$"}</MathJax>
                  </div>
                </div>
              </div>
              :
              null}


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
                onClick={() => {
                  resultRef.current.scrollTop = 0;
                }}

              />
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <div ref={resultRef}>
      </div>
    )
  }
}

export default Result
