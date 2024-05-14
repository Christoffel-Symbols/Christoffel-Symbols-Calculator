import React, { useState } from 'react';
import MetricTensor from './MetricTensor';
import Parameters from './Parameters';
import axios from "axios";
import {API_URL} from '../../env'
import { Formik, Form, useFormikContext, useField } from 'formik';
import { AlertError, CalculateButton } from '../CommonFormElements';
import * as Yup from "yup";
import { styleButton } from '../CommonFormElements';
import { Button, FormControl } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const radioStyle = {
  fontFamily: 'Roboto',
  fontSize: '1.5rem',
  fontWeight: 'light'
}


const CalculateOptions = ({values, ...props}) => {

  const {setFieldValue} = useFormikContext();
  const [field] = useField(props);

  return (
    <div>
    <FormControl>
    <FormLabel className='calculateOptions' sx={{
      fontSize: '2rem',
      color: 'white',
      fontFamily: 'Roboto',
      "&.Mui-focused": { color: "white" },
    }}>Calculate Options</FormLabel>
     <RadioGroup
        row
        name={field.name}
        value={values.onlyCS}
        defaultValue='option_1'
        onChange={(e)=>{
          setFieldValue(field.name, e.target.value)
        }}
        >
        <FormControlLabel
        value="option_1" 
        control={<Radio />} 
        label={
          <span style={radioStyle}>
            Christoffel Symbols
          </span>
        }
        />
        <FormControlLabel 
        value="option_2" 
        control={<Radio />}
        label={
          <span style={radioStyle}>
            Christoffel Symbols + Tensors (i.e., Riemann, Ricci, Einstein)
          </span>
        }
        />
      </RadioGroup>
    </FormControl>
    </div>
  )
}

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
    .matches("^[a-zA-Z0-9*()_\/+. -]*$", "Not a valid special character"),
    epsilon: Yup.string()
    .notRequired()
    .matches("^[a-zA-Z0-9*()_\/+. -]*$","Not a valid special character"),
  }),
  reserve_parameters: Yup.object({
    a: Yup.bool()
    .required()
    .typeError("a can eithe be true or false"),
    p: Yup.bool()
    .required()
    .typeError("p can eithe be true or false"),
    P: Yup.string()
    .required()
    .typeError("P can eithe be option_1 or option_2"),
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
  .of(Yup.array().of(Yup.string().matches("^[a-zA-Z0-9*()_\/+. -]*$", "Not a valid special character").required())),
  onlyCS: Yup.string()
  .required("onlyCS must be either true or false")
  .typeError("onlyCS must either be true or false")
  
})

const Panel = ({incrNumChristoffelCalculated, resultRef, setReset}) => {

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)
  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)
  
  const handleClickReset = () => {
    sessionStorage.removeItem(FORM_PARAMS);
    sessionStorage.removeItem(FORM_SESSION);
    setReset((prevState)=>{
      return prevState + 1
    })
  }
   
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
    metric_tensor: [['0','0'], ['0','0']],
    onlyCS: 'option_1'
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
              .put(API_URL + "christoffelsymbols", data, {timeout: 30000})
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
                if(error.code === 'ECONNABORTED'){
                  setErrorMessage("Timeout exceeded. The inputted metric tensor is too complicated.")
                } else {
                  setErrorMessage(error.message);
                }
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
                  <CalculateOptions 
                  name="onlyCS"
                  values={values}
                  />
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    width: '40%'
                  }}>
                  <CalculateButton 
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  />
                  <Button 
                    sx={styleButton}
                    style={{
                      borderRadius: '1rem',
                      width: '50%'
                    }}
                    onClick={handleClickReset}
                    >Reset
                  </Button>
                  </div>
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
