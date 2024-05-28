import React, { useState } from 'react';
import MetricTensor from './MetricTensor';
import Parameters from './Parameters';
import axios from "axios";
import { API_URL } from '../../env'
import { Formik, Form } from 'formik';
import { AlertError, CalculateButton } from '../CommonFormElements';
import * as Yup from "yup";
import { styleButton } from '../CommonFormElements';
import { Button } from '@mui/material';
import CalculateOptions from './CalculateOptions';


const christoffelSymbolsValidationSchema = Yup.object({
  coordinates: Yup.object({
    num_coordinates: Yup.number()
      .required("num_coordinates is a required field")
      .typeError("num_coordinates must be a number > 0")
      .positive("num_coordinates must be a number > 0"),
    coordinate0: Yup.string()
      .required('Coordinate is required')
      .matches("^[a-zA-Z]{0,10}$", "Not a valid coordinate")
      .matches("^((?!alpha|delta|epsilon).)*$", "alpha/delta/epslion are reserved as variable parameters")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
    coordinate1: Yup.string()
      .required('Coordinate is required')
      .matches("^[a-zA-Z]{0,10}$", "Not a valid coordinate")
      .matches("^((?!alpha|delta|epsilon).)*$", "alpha/delta/epslion are reserved as variable parameters")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
    coordinate2: Yup.string()
      .when('num_coordinates', {
        is: (val) => (val === 3 || val === 4),
        then: () => Yup.string()
          .required('Coordinate is required')
          .matches("^[a-zA-Z]{0,10}$", "Not a valid coordinate")
          .matches("^((?!alpha|delta|epsilon).)*$", "alpha/delta/epslion are reserved as variable parameters")
          .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
          .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
          .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
          .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
          .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
          .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
          .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
          .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
        otherwise: () => Yup.string()
      }),
    coordinate3: Yup.string()
      .when('num_coordinates', {
        is: (val) => val === 4,
        then: () => Yup.string()
          .required('Coordinate is required')
          .matches("^[a-zA-Z]{0,10}$", "Not a valid coordinate")
          .matches("^((?!alpha|delta|epsilon).)*$", "alpha/delta/epslion are reserved as variable parameters")
          .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
          .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
          .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
          .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
          .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
          .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
          .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
          .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
        otherwise: () => Yup.string()
      })

  }),
  variable_parameters: Yup.object({
    alpha: Yup.string()
      .notRequired()
      .matches("^[a-zA-Z0-9*(),_\/+. -]*$", "Not a valid special character")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
    delta: Yup.string()
      .notRequired()
      .matches("^[a-zA-Z0-9*(),_\/+. -]*$", "Not a valid special character")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
    epsilon: Yup.string()
      .notRequired()
      .matches("^[a-zA-Z0-9*(),_\/+. -]*$", "Not a valid special character")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead"),
  }),
  metric_tensor: Yup.array().test("zeroMatrix", "", (value) => {
    let zeroCounter = 0; // keeps track of zeros
    let numCounter = 0; // keeps track of zeros and other numbers
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value.length; j++) {
        if (value[i][j] === '0') {
          zeroCounter += 1;
          numCounter += 1;
        } else {
          numCounter -= 1;
        }
      }
    }
    if (zeroCounter === numCounter) {
      return false; // zero matrix therefore test failed
    } else {
      return true; // not a zero matrix therefore test passed
    }
  })
    .of(Yup.array().of(Yup.string()
      .matches("^[a-zA-Z0-9*(),_\/+. -]*$", "Not a valid special character")
      .matches("^((?!lambda|Lambda).)*$", "lambda/Lambda is a reserved keyword, use 'lamda/Lamda' instead")
      .matches("^((?!zeta|Zeta).)*$", "zeta/Zeta is reserved as zeta function, please use a different symbol")
      .matches("^((?!beta|Beta).)*$", "beta/Beta is reserved as beta function, please use a different symbol")
      .matches("^((?!gamma|Gamma).)*$", "gamma/Gamma is reserved as gamma function, please use a different symbol")
      .matches("^((?!Q).)*$", "Q is a reserved character, please use 'q' instead")
      .matches("^((?!O).)*$", "O is a reserved character, please use 'o' instead")
      .matches("^((?!S).)*$", "S is a reserved character, please use 's' instead")
      .matches("^((?!N).)*$", "N is a reserved character, please use 'n' instead")
      .required())),
  calculate_options: Yup.array().of(Yup.string()).required("Cannot be empty").test('ZeroOptions', "Cannot be empty", (value) => {
    if (value.length === 0) {
      return false // Zero length therefore test failed
    } else {
      return true
    }
  }),
  simplify: Yup.bool().required('')
})

const Panel = ({ incrNumChristoffelCalculated, resultRef, setReset }) => {

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)
  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  const handleClickReset = () => {
    sessionStorage.removeItem(FORM_PARAMS);
    sessionStorage.removeItem(FORM_SESSION);
    setReset((prevState) => {
      return prevState + 1
    })
  }

  let myInitialValues = {}

  if (sessionStorage.getItem(FORM_SESSION) === null) {
    myInitialValues = {
      coordinates: {
        num_coordinates: 2,
        coordinate0: 'r',
        coordinate1: 'theta',
        coordinate2: '',
        coordinate3: ''
      },
      variable_parameters: {
        alpha: '',
        delta: '',
        epsilon: ''
      },
      metric_tensor: [['0', '0'], ['0', '0']],
      calculate_options: ['Christoffel Symbols first kind'],
      simplify: false
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
              .put(API_URL + "christoffelsymbols", data, { timeout: 60000 })
              .then((response) => response.data)
              .then((response) =>
                sessionStorage.setItem(FORM_PARAMS, JSON.stringify(response)))
              .then(() => {
                sessionStorage.setItem(FORM_SESSION, JSON.stringify(data))
                incrNumChristoffelCalculated();
                setTimeout(() => {
                  resultRef.current.scrollIntoView();
                }, 1000)
              })
              .catch((error) => {
                setIsError(true);
                if (error.code === 'ECONNABORTED') {
                  setErrorMessage("Timeout exceeded. Uncheck the simplify option and try again!")
                } else if (error.code = 'ERR_BAD_RESPONSE') {
                  setErrorMessage('Please make sure you are using correct Python syntax. Do not use external libraries (i.e., Math, numpy).')
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
            {console.log(values)}
            <div className='input'>
              <Parameters myInitialValues={values} />
              <MetricTensor myInitialValues={values} />
              <CalculateOptions myInitialValues={values} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '1rem',
              }}>
                <CalculateButton
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                />
                <Button
                  sx={styleButton}
                  disabled={isSubmitting}
                  style={{
                    borderRadius: '1rem',
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
