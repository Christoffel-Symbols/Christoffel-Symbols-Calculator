import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useField, useFormikContext } from "formik";

function createMatrix(numCoords) {

  var dummyList = [];
  for (let row = 0; row < numCoords; row++) {
    var arr = [];
    for (let col = 0; col < numCoords; col++) {
      arr.push(0);
    }
    dummyList.push(arr);
  }

  return dummyList;
}


const DimensionSelect = ({ options, label, ...props }) => {

  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <Box
      sx={{
        minWidth: 120,
        padding: '1rem',
        backgroundColor: 'white'
      }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          {...field}
          onChange={(e) => {
            setFieldValue(field.name, e.target.value);
            setFieldValue('metric_tensor', createMatrix(e.target.value))
            switch (e.target.value) {
              case 2:
                setFieldValue('coordinates.coordinate0', 'r')
                setFieldValue('coordinates.coordinate1', 'theta')
                setFieldValue('coordinates.coordinate2', '')
                setFieldValue('coordinates.coordinate3', '')
                break;
              case 3:
                setFieldValue('coordinates.coordinate0', 'r')
                setFieldValue('coordinates.coordinate1', 'theta')
                setFieldValue('coordinates.coordinate2', 'phi')
                setFieldValue('coordinates.coordinate3', '')
                break;
              case 4:
                setFieldValue('coordinates.coordinate0', 't')
                setFieldValue('coordinates.coordinate1', 'r')
                setFieldValue('coordinates.coordinate2', 'theta')
                setFieldValue('coordinates.coordinate3', 'phi')
                break;
            }
          }
          }
          label={label}
          autoWidth
        >
          {options.map((option) => {
            return (
              <MenuItem value={option} key={option}>{option}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )

}

const Dimensions = ({ myInitialValues }) => {

  return (
    <div>
      <article className='panelHeading' style={{
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
      }}>
        Number of Dimensions
      </article>
      <DimensionSelect
        name="coordinates.num_coordinates"
        values={myInitialValues.coordinates}
        label="Dimensions"
        options={[2, 3, 4]}
      />
    </div>
  )
}

export default Dimensions
