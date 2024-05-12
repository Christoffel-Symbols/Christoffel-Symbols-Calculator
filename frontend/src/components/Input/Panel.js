import React, { useState } from 'react';
import MetricTensor from './MetricTensor';
import Parameters from './Parameters';
import axios from "axios";
import {API_URL} from '../../env'
import { Formik, Form } from 'formik';
import { AlertError, CalculateButton } from '../CommonFormElements';
import * as Yup from "yup";

const christoffelSymbolsValidationSchema = Yup.object({
  num_coordinates: Yup.number()
  .required("num_coordinates is a required field")
  .typeError("num_coordinates must be a number > 0")
  .positive("num_coordinates must be a number > 0"),
  variable_parameters: Yup.object({
    alpha: Yup.string()
    .notRequired()
    .matches("^[a-zA-Z0-9*()_\/+. -]*$", "Not a valid special character"),
    delta: Yup.string()
    .notRequired()
    .matches("^[a-zA-Z0-9*()_\/+. -]*$"),
    epsilon: Yup.string()
    .notRequired()
    .matches("^[a-zA-Z0-9*()_\/+. -]*$"),
  }),
  reserve_parameters: Yup.object({
    a: Yup.bool()
    .required()
    .typeError("a can eithe be true or false"),
    p: Yup.bool()
    .required()
    .typeError("p can eithe be true or false"),
    P: Yup.bool()
    .required()
    .typeError("P can eithe be true or false"),
  }),
  metric_tensor: Yup.array().test("zeroMatrix", "", (value) => {
    let zeroCounter = 0; // keeps track of zeros
    let numCounter = 0; // keeps track of zeros and other numbers
    for(let i =0; i < value.length; i++){
      for (let j=0; j < value.length; j++){
        if (value[i][j] === '0'){
          zeroCounter += 1;
          numCounter += 1;
        } else{
          numCounter -=1;
        }
      }
    }
    if (zeroCounter === numCounter){
        return false; // zero matrix therefore test failed
    } else{
        return true; // not a zero matrix therefore test passed
    }
  })
  .of(Yup.array().of(Yup.string().matches("^[a-zA-Z0-9*()_\/+. -]*$", "Not a valid special character").required()))
  
})

const Panel = ({incrNumChristoffelCalculated, resultRef}) => {

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
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
    metric_tensor: [['0','0'], ['0','0']]
    }
  } else {
    myInitialValues = JSON.parse(`${sessionStorage.getItem(FORM_SESSION)}`);
  }


  return (
    <>
     <Formik
          initialValues={myInitialValues}
          enableReinitialize={true}
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
                sessionStorage.setItem(FORM_SESSION, JSON.stringify({...data, value: ''}))
                incrNumChristoffelCalculated();
                setTimeout(()=>{
                  resultRef.current.scrollIntoView();
                },1000)
              })
              .catch((error)=>{
                console.log(error);
                setIsError(true);
                setErrorMessage(error.message);
              })
              .finally(() => {
                  setSubmitting(false)
                })
            }
          }
          validateOnChange={true}
          validationSchema={christoffelSymbolsValidationSchema}
          validateOnMount={true}
          >
             {({ values, isSubmitting, isValid }) => (
                <Form>
               <div className='input'>
                  <Parameters myInitialValues={values}/>
                  <MetricTensor myInitialValues={values}/>
               <CalculateButton 
               isValid={isValid}
               isSubmitting={isSubmitting}
               />
               <AlertError
               isError={isError}
               setIsError={setIsError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               />
               </div>
                </Form>
             )}
          </Formik>
    </>
  )
}

export default Panel;
