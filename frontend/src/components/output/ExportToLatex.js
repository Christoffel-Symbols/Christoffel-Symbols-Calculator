import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { MathJax } from "better-react-mathjax";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { styleButton } from '../CommonFormElements';
import { Link } from '@mui/material';

import '../../App.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ExportToLatex = ({ name, result }) => {
    const [open, setOpen] = React.useState(false);

    // Preserves the state of which button was clicked.
    const [copy, setCopy] = React.useState(-1);

    const [isCopy, setIsCopy] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCopy(-1);
        setIsCopy(false);
    };

    const handleClick = (index, keyName) => {
        navigator.clipboard.writeText(result[keyName]);
        setCopy(index);
    }

    const resultDisplay = (keyName) => {
        return (
            {
                'christoffel_sk': ["$$" + "\\Gamma^{" + keyName + "}_{\\mu\\nu}" + " = $$"],
                'christoffel_fk': ["$$" + "\\Gamma_{" + keyName + "}" + " = $$"],
                'riemann_tensor': ["$$" + "R^{" + keyName[0] + "}_{" + keyName.slice(1, 4) + "}" + " = $$"],
                'ricci_tensor': ["$$" + "R_{\\mu\\nu}" + " = $$"],
                'ricci_scalar': ["$$" + "R" + " = $$"],
                'einstein_tensor': ["$$" + "G_{\\mu\\nu}" + " = $$"]

            }
        )
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{
                    alignSelf: 'flex-start',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: '0',
                    fontSize: '1rem'
                }}
                sx={styleButton}
            >
                Export LaTeX
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: '#244855' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            EXPORT LATEX
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            CLOSE
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{
                    padding: '0.5rem',

                }}>
                    <div className='citeMe' style={{
                        border: 'solid black',
                        borderRadius: '1rem',
                        marginBottom: '1rem',
                        backgroundImage: 'linear-gradient(to right, #244855 1px, transparent),linear-gradient(to bottom, #244855 1px, transparent 1px)'
                    }}>
                        <img src="ORCID.png" style={{
                            width: '10%',
                            verticalAlign: 'middle',
                        }} />
                        <Link style={{
                            textDecoration: 'none',
                            color: 'black'
                        }} href="https://orcid.org/0009-0004-4161-3601">
                            https://orcid.org/0009-0004-4161-3601
                        </Link>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        justifyContent: 'center'
                    }}>
                        {
                            name === 'ricci_tensor' || name === 'ricci_scalar' || name === 'einstein_tensor'
                                ?
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '1rem',
                                    padding: '1rem',
                                    gap: '1rem',
                                    overflow: 'scroll',
                                    justifyContent: 'safe center',
                                    alignItems: 'safe center'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.2rem',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <MathJax className='mathJax'>
                                            {resultDisplay(name)[name]}
                                        </MathJax>
                                        <div className='resultMathJax'>
                                            <MathJax
                                                className='mathJax'
                                                dynamic
                                            >{"$$" + result + "$$"}</MathJax>
                                        </div>
                                    </div>
                                    <div style={{
                                        border: 'solid black',
                                        borderRadius: '1rem',
                                        fontSize: '1.5rem',
                                        padding: '1rem',
                                    }}>
                                        {result}
                                    </div>
                                    <article style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        fontSize: '2rem',
                                        fontFamily: 'Roboto',
                                        alignItems: 'center'
                                    }}>
                                        <Button
                                            variant='contained'
                                            sx={styleButton}
                                            style={{

                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(result)
                                                setIsCopy(true);
                                            }
                                            }
                                        >COPY</Button>
                                        <article style={{
                                            color: 'red'
                                        }}>
                                            {
                                                isCopy
                                                    ?
                                                    <span>COPIED!</span>
                                                    :
                                                    null
                                            }
                                        </article>
                                    </article>
                                </div>
                                :
                                <>
                                    {Object.keys(result).map((keyName, index) => {
                                        return (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                border: 'solid black',
                                                borderRadius: '1rem',
                                                padding: '1rem',
                                                gap: '1rem',
                                                overflow: 'scroll',
                                                justifyContent: 'safe center',
                                                alignItems: 'safe center'
                                            }}>


                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: '0.2rem',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '1rem',
                                                    }}
                                                    key={keyName}>
                                                    <MathJax className='mathJax'
                                                    >
                                                        {resultDisplay(keyName)[name]}
                                                    </MathJax>
                                                    <MathJax
                                                        className='mathJax'
                                                        dynamic
                                                    >{"$$" + result[keyName] + "$$"}
                                                    </MathJax>
                                                </div>
                                                <div style={{
                                                    border: 'solid black',
                                                    borderRadius: '1rem',
                                                    fontSize: '1.5rem',
                                                    padding: '1rem',
                                                }}>
                                                    {result[keyName]}
                                                </div>


                                                <article style={{
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    fontSize: '2rem',
                                                    fontFamily: 'Roboto',
                                                    alignItems: 'center'
                                                }}>
                                                    <Button
                                                        variant='contained'
                                                        sx={styleButton}
                                                        style={{

                                                        }}
                                                        onClick={() => handleClick(index, keyName)}
                                                    >COPY</Button>
                                                    <article style={{
                                                        color: 'red'
                                                    }}>
                                                        {
                                                            index === copy
                                                                ?
                                                                <span>COPIED!</span>
                                                                :
                                                                null
                                                        }
                                                    </article>
                                                </article>
                                            </div>
                                        )
                                    })}
                                </>
                        }
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
}

export default ExportToLatex;