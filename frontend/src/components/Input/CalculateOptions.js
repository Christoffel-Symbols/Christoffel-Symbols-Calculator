import React from 'react'
import { useField, useFormikContext } from "formik";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const CalculateOptionSelect = ({ options, ...props }) => {

    const [field] = useField(props);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFieldValue(field.name,
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 400 }}>
            <Select
                {...field}
                multiple
                values={field.value}
                fullWidth
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                }}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ fontSize: '1.2rem' }} />
                        ))}
                    </Box>
                )}
            >
                {options.map((option) => {
                    return (
                        <MenuItem
                            value={option}
                            key={option}
                            sx={{
                                justifyContent: 'center',
                                margin: '0.5rem 0.2rem',
                                borderRadius: '1rem',
                                fontFamily: 'Roboto'
                            }}>
                            <span style={{
                                fontSize: '1.5rem',
                                fontFamily: 'Roboto'
                            }}>
                                {option}
                            </span>
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

const CalculateSimplifyCheckBox = ({ ...props }) => {

    const [field] = useField(props);
    const { setFieldValue } = useFormikContext();

    return (
        <FormControlLabel
            checked={field.value}
            onChange={(e) => {
                setFieldValue(field.name, e.target.checked)
            }}
            control={
                <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
            label={<article
                style={{
                    marginTop: '0.2rem',
                    fontSize: '1.7rem',
                    fontFamily: 'Roboto',
                    display: 'flex',
                    gap: '0.1rem',
                    alignItems: 'center',
                }}>
                Simplify
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={<span style={{
                        fontSize: '1rem'
                    }}>Takes longer to compute!</span>}
                    arrow
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -10],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    <InfoIcon sx={{ fontSize: '1.6rem', color: 'red' }} />
                </Tooltip>
            </article>}
            labelPlacement="end"
        />
    )
}

const CalculateOptions = ({ myInitialValues }) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <article className='panelHeading' style={{
                fontSize: '2.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                textAlign: 'center'
            }}>
                Calculate Options
            </article>
            <div style={{
                border: 'solid #244855',
                padding: '0.5rem',
                borderRadius: '1rem',
                gap: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CalculateOptionSelect
                    name="calculate_options"
                    values={myInitialValues.calculate_options}
                    options={['Christoffel Symbols first kind', 'Christoffel Symbols second kind', 'Riemann Tensor first kind', 'Riemann Tensor second kind', 'Ricci Tensor', 'Ricci Scalar', 'Einstein Tensor']}
                />
                <CalculateSimplifyCheckBox
                    name="simplify"
                    values={myInitialValues.simplify}
                />
            </div>
        </div>
    )
}

export default CalculateOptions