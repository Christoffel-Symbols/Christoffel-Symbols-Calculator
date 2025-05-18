import React from 'react';
import pp from '../prp.webp';

const Donate = () => {
    const koFiUrl = 'https://ko-fi.com/christoffelsymbolscalculator';

    return (
        <div style={styles.container}>
            <img src={pp} alt="Dhananjhay Bansal" style={styles.photo} />
            <p style={styles.text}>
                If you find this calculator useful, please consider donating! ❤️
            </p>
            <a
                href={koFiUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.button}
            >
                Donate
            </a>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        margin: '1rem auto',
        padding: '1rem',
        width: '50%',        // responsive width for mobile
        maxWidth: '320px',   // cap width on larger screens
        border: '2px solid #244855',
        borderRadius: '1rem',
        boxSizing: 'border-box',
    },
    photo: {
        width: '50%',         // scale photo relative to container
        maxWidth: '150px',
        height: '50%',       // maintain aspect ratio
        borderRadius: '50%',
        objectFit: 'cover',
    },
    text: {
        marginBottom: '1rem',
        fontSize: '1.25rem',  // slightly reduced for mobile
        color: '#333',
    },
    button: {
        display: 'block',     // full-width button
        width: '100%',
        backgroundColor: '#244855',
        color: '#fff',
        padding: '0.75rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '1.25rem',  // responsive font size
        fontWeight: '500',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        transition: 'transform 0.1s ease-in-out',
        boxSizing: 'border-box',
    }
};

export default Donate;
