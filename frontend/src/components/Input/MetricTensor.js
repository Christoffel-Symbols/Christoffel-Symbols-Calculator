import React from 'react'
import {Button, TextField} from "@mui/material";

const MetricTensor = ({coordList}) => {
  return (
    <div className='metricTensor'>
    <Button variant='outlined' size='large' sx={{
      marginBottom: '1rem'
    }}>Metric Tensor</Button>
      <div style={{
        border: '3px solid black',
        display: 'flex',
        padding: '1rem',
        gap: '10rem',
        justifyContent: 'space-between'
      }}>
        <div>
        {
          coordList.map((coord)=>{
            return(
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.3rem'
              }}>
                {coordList.map((coord)=>{
                  return(
                    <TextField variant="outlined" />
                  )
                })}
              </div>
            )
          })
        }
        </div>
        {/* <div style={{
           border: '3px solid red'
        }}>
        {
          coordList.map((coord)=>{
            return(
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.3rem'
              }}>
                {coordList.map((coord)=>{
                  return(
                    <TextField variant="outlined" />
                  )
                })}
              </div>
            )
          })
        }
        </div> */}
      </div>
    </div>
  )
}

export default MetricTensor
