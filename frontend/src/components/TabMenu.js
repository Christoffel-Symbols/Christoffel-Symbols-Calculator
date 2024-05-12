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
        Christoffel Symbols Calculator is a mathematical tool with a Graphical User Interface that helps you calculate Christoffel Symbols from a Metric Tensor, along with non-zero components of the Riemann Tensor and the Christoffel Symbols of first kind, Ricci Tensor, Ricci Scalar and the Einstein Tensor. 
        <br/>
        <br/>
        You can work with a 2,3,4-Dimensional coordinate system and specify and reserve parameters that you want to include in the Metric Tensor (i.e., symbol <b>a</b> can be reserved as the scale factor <b>a(t)</b> or can be used as a constant).
        <br/>
        <br/>
        If you are a first-time user, please check out the <b>EXAMPLES</b> section: it has a bunch of pre-defined cases of popular metric tensors in relativistic and gravitational astrophysics. The <b>QUICK GUIDE</b> section gives a detailed step by step instructions on how to use this tool. 
        <br/>
        <br/>
        It is a project still very much in development and as the mission matures, we expect it to become more efficient and sophisticated. Thank you for using the tool!
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
      }}><b>
        Given below are a bunch of pre-defined 
        <br/> 
        metric tensors that are popular in astrophyiscs. 
        <br/>
        Please select one.
        </b>
        </FormLabel>
      <RadioGroup
        name="tab-menu-radio-buttons-group"
        onChange={handleRadioChange}
        sx={{
         alignContent: 'center'
        }}
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
        <br/>
        <br/>
        Step 2: Reserve symbols from a given list of symbols that you want to include in the metric tensor.
        <br/>
        <br/>
        Step 3: Defined atmost 3 variable parameters that you want to include in the metric tensor.
        <br/>
        <br/>
        Step 4: Fill the metric tensor.
        <br/>
        <br/>
        Step 5: Calculate Away!  
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
