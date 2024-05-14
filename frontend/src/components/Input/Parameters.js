import React from 'react'
import ReserveParameters from './ReserveParameters';
import VariableParameters from './VariableParameters';
import Dimensions from './Dimensions';



const Parameters = ({myInitialValues}) => {

  return (
    <>
      <div style={{
          display: 'flex',
          gap: '1rem',
        }}>
          
      <div className='leftPanel'>
        <Dimensions myInitialValues={myInitialValues}/>
        <ReserveParameters myInitialValues={myInitialValues}/>
      </div>
          <VariableParameters myInitialValues={myInitialValues}/>
      </div>
    </>
  )
}

export default Parameters;
