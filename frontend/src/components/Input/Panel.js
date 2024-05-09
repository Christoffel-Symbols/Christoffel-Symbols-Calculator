import React from 'react';
import MetricTensor from './MetricTensor';
import Parameters from './Parameters';
import axios from "axios";
import {API_URL} from '../../env'
import { Formik, Form } from 'formik';
import { CalculateButton } from '../CommonFormElements';

const Panel = ({incrNumChristoffelCalculated}) => {

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)
  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let myInitialValues = {}

  if (sessionStorage.getItem(FORM_SESSION) === null){
    myInitialValues = {
    num_coordinates: 2,
    variable_parameters: {
      alpha: '',
      delta: '',
      epsilon: ''
    },
    reserve_parameters: {
      a: false,
      p: false,
      P: false,
    },
    metric_tensor: [[0,0], [0,0]]
    }
  } else {
    myInitialValues = JSON.parse(`${sessionStorage.getItem(FORM_SESSION)}`);
  }

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
                sessionStorage.setItem(FORM_PARAMS, JSON.stringify(response)))
              .then(()=>{
                sessionStorage.setItem(FORM_SESSION, JSON.stringify(data))
                incrNumChristoffelCalculated();
                })
                .catch((error)=>{
                  console.log(error);
                })
                .finally(() => setSubmitting(false))
            }
          }
          >
             {({ values, isSubmitting, isValid }) => (
                <Form>
               <div className='input'>
                  <Parameters myInitialValues={values}/>
                  <MetricTensor myInitialValues={values}/>
               <CalculateButton isSubmitting={isSubmitting}/>
               </div>
                </Form>
             )}
          </Formik>
    </>
  )
}

export default Panel;
