import React from 'react'
import { MathJax } from "better-react-mathjax";
import { CommonTextField } from '../CommonFormElements';


const DefineCoordinates = ({myInitialValues}) => {
  return (
        <div>
          <article className='panelHeading' style={{
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem'
          }}>
        Declare Coordinates
          </article>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          {
            Array.from({length: myInitialValues.coordinates.num_coordinates},(_,index)=>{
              return (
                <span 
                key={index}
                style={{
                  display: 'flex',
                  gap: '0.3rem',
                  alignItems: 'center'
                }}>
                <MathJax dynamic>{"$$" + "x^{" + index + "} =  $$"}</MathJax>
                <CommonTextField
                  name={`coordinates.coordinate${index}`}
                  value={`myInitialValues.coorindates.coordinate${index}`}
                  placeholder={"Example: r, x, theta, y"}
                  />
              </span>
              )
            })
          }
          </div>
        </div>
  )
}

export default DefineCoordinates
