import React, {useState} from 'react'
import { CommonAlertDialog } from './CommonFormElements';
import '../App.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { examplesData } from '../data/examples';
import { Link } from '@mui/material';


const aboutDescription = () => {
    return(
      <>
        Christoffel Symbols Calculator is an online mathematical tool with a Graphical User Interface that helps you calculate <b>torsion-free</b> Christoffel Symbols (both first and second kinds) along with non-zero components of the Riemann Tensor, Ricci Tensor, Ricci Scalar, and Einstein Tensor. 
        <br/>
        <br/>
        You can work with a 2,3, or 4-Dimensional coordinate system and specify at most 3 variable parameters that you want to include in the metric tensor. You can also include any implicit function in the Metric Tensor (for example <b>a(t)</b>, which is most popularly known as the scale factor in cosmology, or pressure as a function of time <b>p(t)</b>, and etcetera).
        <br/>
        <br/>
        If you are a first-time user, please use the <b>QUICK GUIDE</b> section to get a detailed step-by-step overview on how to use this tool. You can also try working with some pre-defined metric tensors in the <b>EXAMPLES</b> section. To understand the physics behind their origin, please check out <Link href="https://profoundphysics.com/">Profound Physics</Link>.        
        <br/>
        <br/>
        This project is still very much in development, and as the mission matures, you can expect the software to become more efficient and sophisticated. Happy Calculating!
      </>
    )
  }

  const quickGuideDescription = () => {
    return (
      <>
        Step 1: Select the number of dimensions of your space-time from the drop-down menu in the <b>
          Number of Dimensions
          </b> section. 
        <br/>
        <br/>
        Step 2: Define at most 3 variable parameters in the <b>Define Variable Parameters</b> section that you want to include in the metric tensor. 
        <br/>
        <br/>
        Step 3: Fill the metric tensor with the appropriate expressions and values. 
        <br/>
        <br/>
        Step 4: In the <b>Calculate Options</b>, choose whether you want to calculate only Christoffel Symbols (both first and second kinds) or calculate tensors along with Christoffel Symbols.
        <br/>
        <br/>
        Step 5 (a): After the inputted values and expressions have been validated, click on <b>Calculate</b>. 
        <br/>
        <br/>
        Step 5 (b): If you want to start all over again, you can click on the <b>Reset</b> button. 
      </>
    )
  }

const TabMenu = ({incrNumChristoffelCalculated}) => {
  
  const [selected, setSelected] = useState('');

  const FORM_SESSION = "christoffelForm"; // key for sessionStorage (user inputs)
  const FORM_PARAMS = "christoffelParams"; // key for sessionStorage (API results)

  let christoffelParams = JSON.parse(`${sessionStorage.getItem(FORM_PARAMS)}`);

  const handleClickOpen = (name) => {
    setSelected(name);
  }

  const handleClose = () => {
    setSelected('');
  }

  const tabMenuRadioButtonsGroup = () => {

    const handleRadioChange = (e) => {
      const data = examplesData.filter((object)=> object.value === e.target.value);

      // fills the input parameters and set it in the session storage
      sessionStorage.setItem(FORM_SESSION, JSON.stringify(data[0]));
      handleClose();
      if(christoffelParams){
        sessionStorage.setItem(FORM_PARAMS, JSON.stringify({...christoffelParams, "metric_tensor": null}));
      }

      // we re-render after setting the parameters in the sessionstorage.
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
        defaultValue={''}
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
        label="Kerr Metric (response time ~ 40 sec)" />
        <FormControlLabel 
        value="example-7" 
        control={<Radio />} 
        label="Weak-Field Metric" />
        <FormControlLabel 
        value="example-8" 
        control={<Radio />} 
        label="Pressure-density Metric" />
      </RadioGroup>
    </FormControl>
    );
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
