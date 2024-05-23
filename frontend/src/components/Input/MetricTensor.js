import React from 'react'
import { MatrixComponent, coordObjectToList } from '../CommonFormElements';
import { MathJax } from "better-react-mathjax";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import WarningIcon from '@mui/icons-material/Warning';
import { Link } from '@mui/material';

const chipStyle = {
  marginBottom: '0.5rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center'
}

const VariableParameter = ({ symbol, name, coordList }) => {
  return (
    <>
      <span>Input </span>
      <span style={{
        fontSize: '1.2rem'
      }}>
        {symbol}
        ({
          coordList.map((coord, index) =>
            index === coordList.length - 1
              ?
              coord
              :
              coord + ','
          )
        })</span>
      <span> as {name}</span>
    </>
  )
}

const MetricTensor = ({ myInitialValues }) => {

  var coordList = coordObjectToList(myInitialValues.coordinates)

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);

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
              <Chip sx={{
                backgroundColor: 'red',
                color: 'white',
                padding: '0.3rem 0 0.5rem'
              }} label={
                <span style={{
                  fontSize: '1.2rem'
                }}>
                  {
                    <MathJax dynamic>{"$$" + "\{I}/\{i} \\text{: Imaginary unit}" + "$$"}</MathJax>

                  }
                </span>
              } />
              <Chip sx={{
                backgroundColor: 'red',
                color: 'white',
                padding: '0.3rem 0 0.5rem'
              }} label={
                <span style={{
                  fontSize: '1.2rem'
                }}>
                  {
                    <MathJax dynamic>{"$$" + "\\pi \\text{ as pi}" + "$$"}</MathJax>

                  }
                </span>
              } />
              <Chip sx={{
                backgroundColor: 'red',
                color: 'white',
                padding: '0.3rem 0 0.5rem'
              }} label={
                <span style={{
                  fontSize: '1.2rem'
                }}>
                  {
                    <MathJax dynamic>{"$$" + "\{E}/\{e} \\text{: Euler's number}" + "$$"}</MathJax>

                  }
                </span>
              } />
              {
                Object.keys(myInitialValues.coordinates).map((key, index) => {
                  if (myInitialValues.coordinates[key] !== '' && typeof myInitialValues.coordinates[key] !== 'number') {
                    return (
                      <Chip sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '0.3rem 0 0.5rem'
                      }} key={index} label={
                        <span style={{
                          fontSize: '1.2rem'
                        }}>
                          {myInitialValues.coordinates[key].length > 1
                            ?
                            <MathJax dynamic>{"$$" + "x^{" + index + "} = " + "{\\" + myInitialValues.coordinates[key] + "}$$"}</MathJax>
                            :
                            <MathJax dynamic>{"$$" + "x^{" + index + "} = " + "{" + myInitialValues.coordinates[key] + "}$$"}</MathJax>
                          }
                        </span>
                      } />
                    )
                  }
                })
              }
              {
                Object.keys(myInitialValues["variable_parameters"]).map((keyName) => {
                  return (
                    myInitialValues["variable_parameters"][keyName]
                      ?
                      <Chip sx={{
                        backgroundColor: 'green',
                        color: 'white'
                      }} key={keyName} label={
                        <span>
                          {
                            keyName === 'alpha'
                              ?
                              <VariableParameter symbol={'\u03B1'} name={'alpha'} coordList={coordList} />
                              :
                              keyName === 'delta'
                                ?
                                <VariableParameter symbol={'\u03B4'} name={'delta'} coordList={coordList} />

                                :
                                <VariableParameter symbol={'\u03B5'} name={'epsilon'} coordList={coordList} />
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
              backgroundColor: 'white',
            }}>
              <div>
                {
                  Array.from({ length: myInitialValues.coordinates.num_coordinates }, (_, index) => {
                    let row = index;
                    return (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        padding: '0.3rem',
                      }}
                        key={row}
                      >
                        {Array.from({ length: myInitialValues.coordinates.num_coordinates }, (_, index) => {
                          let col = index;
                          return (
                            <MatrixComponent
                              key={col}
                              placeholder={'(' + String(row) + ',' + String(col) + ')'}
                              name={`metric_tensor${'[' + String(row) + ']' + '[' + String(col) + ']'}]`}
                              value={myInitialValues.metric_tensor[row, col]}
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
              }} />
              <span style={{
                fontSize: '1.2rem',
                marginTop: '0.1rem'
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
