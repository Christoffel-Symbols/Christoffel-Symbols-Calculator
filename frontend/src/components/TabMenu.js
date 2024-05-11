import React, {useState} from 'react'
import { CommonAlertDialog } from './CommonFormElements';
import '../App.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { examplesData } from '../data/examples';

const TabMenu = ({incrNumChristoffelCalculated}) => {

  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);


  const [selected, setSelected] = useState('');

  const handleClickOpen = (name) => {
    setSelected(name);
  }

  const handleClose = () => {
    setSelected('');
  }

  const aboutDescription = () => {
    return(
      <>
        Christoffel Symbols Calculator is an online Graphical User Interface that helps you calculate christoffel symbols and a bunch of Tensors (i.e., Riemann Tensor, Ricci Tensor, and etcetera) from a given metric tensor.
      </>
    )
  }

  const tabMenuRadioButtonsGroup = () => {

    const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)

    const handleRadioChange = (e) => {
      const data = examplesData.filter((object)=> object.value === e.target.value);
      sessionStorage.setItem(FORM_SESSION, JSON.stringify(data[0]));
      handleClose();
      if(christoffelParams){
        sessionStorage.setItem(FORM_PARAMS, JSON.stringify({...christoffelParams, "metric_tensor": null}));
      }
      incrNumChristoffelCalculated();
    }


  return (
    <FormControl>
      <FormLabel sx={{
        textAlign: 'center'
      }}>Options</FormLabel>
      <RadioGroup
        name="tab-menu-radio-buttons-group"
        onChange={handleRadioChange}
      >
        <FormControlLabel 
        value="example-1" 
        control={<Radio />} 
        label="2-Sphere"
        />
        <FormControlLabel 
        value="example-2" 
        control={<Radio />}
        label="Spherical Coordinates"
        />
        <FormControlLabel 
        value="example-3" 
        control={<Radio />} 
        label="Schwarzschild Metric"
        />
        <FormControlLabel 
        value="example-4" 
        control={<Radio />} 
        label="Robertson-Walker Metric"
        />
        <FormControlLabel 
        value="example-5" 
        control={<Radio />} 
        label="Reissner-Nordstrom Metric"
        />
        <FormControlLabel 
        value="example-6" 
        control={<Radio />} 
        label="Kerr Metric" />
        <FormControlLabel 
        value="example-7" 
        control={<Radio />} 
        label="Weak-Field Metric" />
      </RadioGroup>
    </FormControl>
    );
  }

  const quickGuideDescription = () => {
    return (
      <>
        Step 1: Select number of dimensions from the drop-down menu below.
      </>
    )
  }

  return (
    <div className='menu'>
        <CommonAlertDialog 
        name={'ABOUT'} 
        description={aboutDescription} 
        open={selected === 'ABOUT'} 
        handleClose={handleClose} 
        handleClickOpen={handleClickOpen}
       />
        <CommonAlertDialog 
        name={'EXAMPLES'} 
        description={tabMenuRadioButtonsGroup} 
        open={selected === 'EXAMPLES'} 
        handleClose={handleClose} 
        handleClickOpen={handleClickOpen}
        />
        <CommonAlertDialog 
        name={'QUICK GUIDE'} 
        description={quickGuideDescription} 
        open={selected === 'QUICK GUIDE'}
        handleClose={handleClose} 
        handleClickOpen={handleClickOpen}
        />
    </div>
  )
}

export default TabMenu;
