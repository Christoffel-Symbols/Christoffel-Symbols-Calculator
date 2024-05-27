import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, useField, useFormikContext } from "formik";
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import '../App.css'

export function coordObjectToList(coordObject) {

  var dummyList = [];
  Object.keys(coordObject).map((key) => {
    if (coordObject[key] !== '' && typeof coordObject[key] !== 'number') {
      dummyList.push(coordObject[key]);
    }
  })

  return dummyList;
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const styleButton = {
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    border: 'solid #244855'
  },
  "&:active": {
    backgroundColor: '#244855'
  },
  backgroundColor: '#244855',
  color: 'white',
  fontSize: '1.3rem',
  fontFamily: 'Roboto',
  letterSpacing: '3px',
};


export const CommonTextField = ({ placeholder, label, disabled = false, required = false, fullWidth = false, ...props }) => {

  const [field, meta] = useField(props);
  const errorText = meta.error || meta.touched ? meta.error : ''

  return (
    <Field
      inputProps={{
        style: {
          fontFamily: "Roboto,sans-serif",
          fontSize: '1.5rem',
          fontWeight: '200',
          backgroundColor: 'white'
        }
      }}
      placeholder={placeholder}
      label={label}
      as={TextField}
      type="input"
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      helperText={errorText}
      error={!!errorText}
      {...field}
    />
  );
};

export const MatrixComponent = ({ placeholder, fullWidth = true, ...props }) => {

  const [field, meta] = useField(props);
  const errorText = meta.error || meta.touched ? meta.error : ''

  return (
    <Field
      fullWidth={fullWidth}
      inputProps={{
        style: {
          fontFamily: "Roboto,sans-serif",
          fontSize: '1.5rem',
          fontWeight: '200',
        }
      }}
      placeholder={placeholder}
      as={TextField}
      type="input"
      helperText={errorText}
      error={!!errorText}
      {...field}
    />
  );
};

export const CalculateButton = ({ isSubmitting, isValid }) => {
  return (
    <LoadingButton
      type="Submit"
      disabled={isSubmitting || !isValid}
      size="large"
      variant="contained"
      style={{
        fontSize: 24,
        borderRadius: '1rem',
      }}
      loading={isSubmitting}
      loadingIndicator="Calculating..."
      sx={styleButton}
    >
      Calculate
    </LoadingButton>
  )
}

export const CommonAlertDialog = ({ name, description, open, handleClose, handleClickOpen }) => {

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        sx={styleButton}
        onClick={() => handleClickOpen(name)}
      >
        {name}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={'md'}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {name}
        </DialogTitle>
        <DialogContent>
          {/* span because DialogContextText is a wrapper over p tag and FormControl is a wrapper over div */}
          <DialogContentText component={'span'}>
            {description()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export const AlertError = ({ isError, setIsError, errorMessage, setErrorMessage }) => {
  return (
    <Snackbar
      open={isError}
      autoHideDuration={3000}
      onClose={() => {
        setIsError(false);
        setErrorMessage("");
      }}
    >
      <Alert
        severity="error"
        onClose={() => {
          setIsError(false);
          setErrorMessage("")
        }}
      >
        <AlertTitle>
          Error</AlertTitle>
        {errorMessage} <br />
        Revise your inputs and submit a new request.
      </Alert>
    </Snackbar>
  );
}