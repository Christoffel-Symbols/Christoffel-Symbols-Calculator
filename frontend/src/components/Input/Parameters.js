import React from 'react'
import VariableParameters from './VariableParameters';
import Dimensions from './Dimensions';
import DefineCoordinates from './DefineCoordinates';
import Donate from './Donate'



const Parameters = ({ myInitialValues }) => {

  return (
    <>
      <div className='container'>
        <Donate />
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
