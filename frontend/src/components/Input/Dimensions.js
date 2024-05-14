import React from 'react';
import { CommonSelect } from '../CommonFormElements';
const Dimensions = ({myInitialValues}) => {
  return (
    <div>
          <article className='panelHeading' style={{
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem'
          }}>
        Number of Dimensions
          </article>
       <CommonSelect
          name="num_coordinates"
          values={myInitialValues}
          label="Dimensions"
          options={[2,3,4]}
       />
      </div>
  )
}

export default Dimensions
