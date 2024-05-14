import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import { CommonCheckBox } from '../CommonFormElements';

const ReserveParameters = ({myInitialValues}) => {
  return (
    <div>
          <article className='panelHeading'>
        Reserve Parameters
          </article>
        <FormGroup sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <CommonCheckBox
          name="reserve_parameters.a"
          values={myInitialValues.reserve_parameters.a}
          label="a(t) (Scale Factor)"
        />
        <CommonCheckBox
          name="reserve_parameters.p"
          values={myInitialValues.reserve_parameters.p}
          label="p(t) (Pressure as a function of time)"
        />
        <CommonCheckBox
          name="reserve_parameters.P"
          values={myInitialValues.reserve_parameters.P}
          label="&#961;(t) (Density as a function of time)"
        />
        </FormGroup>
    </div>
  )
}

export default ReserveParameters
