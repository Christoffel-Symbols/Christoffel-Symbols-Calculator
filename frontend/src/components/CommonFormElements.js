import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Field, useField, useFormikContext } from "formik";
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import '../App.css'

function createMatrix(numCoords) {

  var dummyList = [];
  for(let row = 0; row < numCoords; row++){
    var arr = [];
    for (let col = 0; col < numCoords; col++){
        arr.push(0);
    }
    dummyList.push(arr);
}

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


export const CommonTextField = ({placeholder, label, disabled=false, required=false, fullWidth=false, ...props}) => {

    const [field, meta] = useField(props);
    const errorText = meta.error || meta.touched ? meta.error : ''

    return (
        <Field
        inputProps={{
          style: {
            fontFamily: "Roboto,sans-serif",
            fontSize: '1.5rem',
            fontWeight: '200',
          }
        }}
        placeholder={placeholder}
        label={label}
        as={TextField}
        type="input"
        fullWidth={fullWidth}
        disabled={disabled}
        required={required}
        helperText = {errorText}
        error={!!errorText}
        {...field}
        />
    );
};

export const CommonCheckBox = ({values, label, ...props}) => {
    
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    
    return (
        <FormControlLabel 
        name={field.name}
        onChange={(e)=>{
            setFieldValue(String(field.name), e.currentTarget.checked);
        }}
        control={<Checkbox checked={values}/>} 
        label={
        <article style={{
          fontFamily: "Roboto,sans-serif",
          fontSize: '1rem',
          fontWeight: '100',
          textAlign: 'left'
        }}>
          {label}
        </article>}
        />
        )
        
    }
    
export const CommonSelect = ({values, label, ...props}) => {
        
        const { setFieldValue } = useFormikContext();
        const [field] = useField(props);
        
        return (
            <Box 
            sx={{ 
              minWidth: 120, 
              padding: '1rem'
              }}>
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              name={field.name}
              value={values.num_coordinates}
              onChange={(e)=> {
                  setFieldValue(String(field.name), e.target.value)
                  setFieldValue('metric_tensor', createMatrix(e.target.value))
                }}
                label={label}
                autoWidth
                >
              {props.options.map((option)=>{
                  return(
                      <MenuItem value={option} key={option}>{option}</MenuItem>
                      )
                    })}
            </Select>
          </FormControl>
      </Box>
  )
  
}

export const MatrixComponent = ({placeholder, fullWidth=false, ...props}) => {

    const [field, meta] = useField(props);
    const errorText = meta.error || meta.touched ? meta.error : ''

    return (
        <Field
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
        helperText = {errorText}
        error={!!errorText}
        {...field}
        />
    );
};

export const CalculateButton = ({isSubmitting, isValid}) => {
  return (
    <LoadingButton
    type="Submit"
    disabled={isSubmitting || !isValid}
    size="large"
    variant="contained"
    style={{ 
    fontSize: 24, 
    margin: 16,
    borderRadius: '1rem'
    }}
    loading={isSubmitting}
    loadingIndicator="Calculating..."
    sx={styleButton}
    >
    Calculate
    </LoadingButton>
  )
}

export const CommonAlertDialog = ({name, description, open, handleClose, handleClickOpen}) => {

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
      <DialogTitle sx={{textAlign: 'center'}}>
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

export const AlertError = ({isError, setIsError, errorMessage, setErrorMessage}) => {
  return (
    <Snackbar
      open={isError}
      autoHideDuration={3000}
      onClose={()=>{
        setIsError(false);
        setErrorMessage("");
      }}
      >
      <Alert
        severity="error"
        onClose={()=>{
          setIsError(false);
          setErrorMessage("")
        }}
      >
        <AlertTitle>
          Error</AlertTitle> 
        {errorMessage} <br/>
        Please revise your inputs and submit a new request.
      </Alert>
    </Snackbar>
  );
}