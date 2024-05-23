import React from 'react'
import VariableParameters from './VariableParameters';
import Dimensions from './Dimensions';
import DefineCoordinates from './DefineCoordinates';



const Parameters = ({ myInitialValues }) => {

  return (
    <>
      <div style={{
        display: 'flex',
        gap: '1rem',
      }}>

        <div className='leftPanel'>
          <Dimensions myInitialValues={myInitialValues} />
          <DefineCoordinates myInitialValues={myInitialValues
          } />
        </div>
        <div className='rightPanel'>
          <VariableParameters myInitialValues={myInitialValues} />
        </div>
      </div>
    </>
  )
}

export default Parameters;
