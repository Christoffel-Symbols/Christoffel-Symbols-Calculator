import React, {useState} from 'react'
import Box from '@mui/material/Box';


import { MathJax, MathJaxContext } from "better-react-mathjax";

import FormGroup from '@mui/material/FormGroup';

import { Formik, Form, FormikValues } from "formik";
import { CommonTextField, CommonCheckBox, CommonSelect } from '../CommonFormElements';


import {API_URL} from '../../env'
import axios from "axios";

import MetricTensor from './MetricTensor';


const CoordList = ({numCoords}) => {

  const coordList = ['x','y','z','t'];
  const displayList = coordList.splice(0,numCoords);

  return (
    displayList.map((coord, index)=>
    index === numCoords - 1
    ?
    coord
    :
    coord + ','
    )
  )
}



const Options = ({myInitialValues}) => {

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)
  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)


  return (
    <>
        <Formik
          initialValues={myInitialValues}
          onSubmit={
            async (data, { setSubmitting }) => {
              setSubmitting(true);

              // Make async call
              await axios
              .put(API_URL + "christoffelsymbols", data)
              .then((response)=>response.data)
              .then((response)=>
                sessionStorage.setItem(FORM_PARAMS, JSON.stringify(response))
                .then(()=>{
                  sessionStorage.setItem(FORM_SESSION, JSON.stringify(data))
                })
                .catch((error)=>{
                  console.log(error);
                })
                .finally(setSubmitting(false))
              )
            }
          }
          >
            {({ values, isSubmitting, isValid }) => (
      <Form>

        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          
      <div style={{
        border: '3px solid black',
        padding:'0.5rem',
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        Number of Dimensions
       <CommonSelect
          name="num_coordinates"
          values={values}
          label="Dimensions"
          options={[2,3,4]}
       />
        </div>
        <div style={{
          fontSize: '2rem',
          textAlign: 'center',
          padding: '0.5rem'
        }}>
        Reserve Parameters
        <FormGroup>
        <CommonCheckBox
          name="reserve_parameters.a"
          values={values}
          label="a(t) (Scale Factor)"
        />
        <CommonCheckBox
          name="reserve_parameters.p"
          values={values}
          label="p(t) (Pressure as a function of time)"
        />
        <CommonCheckBox
          name="reserve_parameters.P"
          values={values}
          label="&#961;(t) (Density as a function of time)"
        />
        <CommonCheckBox
          name="reserve_parameters.e"
          values={values}
          label="e (Euler's number)"
        />
        </FormGroup>
        </div>
      </div>
      <div style={{
        border: '3px solid black',
        padding:'0.5rem',
        fontSize: '2rem'
      }}>
        Define Variable Parameters
        <Box style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            
          &#120572; (<CoordList numCoords={values.num_coordinates}/>)
          = 
          <CommonTextField
            name="variable_parameters.alpha"
            value={values.variable_parameters.alpha}
            placeholder={"i.e., x**2 + y**2"}
          />
          </span>

          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}> 
          &delta; (<CoordList numCoords={values.num_coordinates}/>)
          = 
          <CommonTextField
            name="variable_parameters.delta"
            value={values.variable_parameters.delta}
            placeholder={"i.e., x**2 + 2*y"}
          />
          </span>

          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
          &#949; (<CoordList numCoords={values.num_coordinates}/>)
          =
          <CommonTextField
            name="variable_parameters.epsilon"
            value={values.variable_parameters.epsilon}
            placeholder={"i.e., 2*x + 2*y"}
          />
          </span>
        </Box>
      </div>
      </div>
          <MetricTensor myInitialValues={values}/>
    </Form>
            )}
        </Formik>
       
    </>
  )
}

export default Options
