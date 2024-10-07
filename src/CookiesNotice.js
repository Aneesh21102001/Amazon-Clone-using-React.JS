import React from 'react';
import './Notice.css';

function CookiesNotice() {
    return (
        <div className='notice'>
            <h1>Cookies Notice</h1>
            <p>
                <strong>AMAZON FAKE CLONE</strong> uses cookies to improve your browsing experience and personalize the content and advertisements you see.
            </p>
            <h2>What Are Cookies?</h2>
            <p>
                Cookies are small text files that are stored on your device when you visit our website. They help us recognize your preferences and provide personalized services.
            </p>
            <h2>Types of Cookies We Use</h2>
            <ul>
                <li><strong>Essential Cookies:</strong> These cookies are necessary for the basic functionality of our website.</li>
                <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
                <li><strong>Targeting Cookies:</strong> These cookies are used to deliver personalized ads based on your browsing behavior.</li>
            </ul>
            <h2>Managing Cookies</h2>
            <p>
                You can manage or disable cookies in your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website.
            </p>
        </div>
    );
}

export default CookiesNotice;
