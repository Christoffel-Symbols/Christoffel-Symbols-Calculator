import React from 'react';
import { CommonTextField, coordObjectToList } from '../CommonFormElements';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';

const Variable = ({ symbol, name, coordList, placeholder, myInitialValues }) => {
  return (
    <span className='variable'>

      {symbol} ({
        coordList.map((coord, index) =>
          index === coordList.length - 1
            ?
            coord
            :
            coord + ','
        )
      })
      =
      <CommonTextField
        name={"variable_parameters." + name}
        value={myInitialValues.variable_parameters[name]}
        placeholder={placeholder}
      />
    </span>
  )
}

const VariableParameters = ({ myInitialValues }) => {

  var coordList = coordObjectToList(myInitialValues.coordinates)

  return (
    <>
      <article className='panelHeading'>
        Define Variable Parameters
      </article>
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <Variable
          symbol={'\u03B1'}
          name='alpha'
          coordList={coordList}
          myInitialValues={myInitialValues}
          placeholder={'Example: sin(theta)**2 '}
        />
        <Variable
          symbol={'\u03B4'}
          name='delta'
          coordList={coordList}
          myInitialValues={myInitialValues}
          placeholder={'Example: e**(1/2) + abs(t) '}
        />
        <Variable
          symbol={'\u03B5'}
          name='epsilon'
          coordList={coordList}
          myInitialValues={myInitialValues}
          placeholder={'Example: pi*log(phi)**2 '}
        />
      </Box>
      <article style={{
        marginTop: '0.8rem',
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
          Use <b>Python Syntax</b> and <b>Mathematical Operators</b>.
        </span>
      </article>
    </>
  )
}

export default VariableParameters
