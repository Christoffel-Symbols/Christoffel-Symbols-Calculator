import React from 'react'
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import '../App.css'

const styleIcon = {
  fontSize: '2rem',
  color: 'white'
}

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; DHANANJHAY BANSAL - ALL RIGHTS RESERVED</p>
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <Link href="https://www.linkedin.com/in/dhananjhay-bansal-637105193/">
        <LinkedInIcon sx={styleIcon} />
        </Link>
        <Link href="https://github.com/Dhananjhay">
        <GitHubIcon sx={styleIcon} />
        </Link>
        <Link href="mailto:dhananjhay03@gmail.com">
        <EmailIcon sx={styleIcon} />
        </Link>
      </div>
    </div>
  )
}

export default Footer