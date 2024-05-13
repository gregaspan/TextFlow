import React from 'react';
import LogoSVG from './assets/TextFlowLogo.svg';  // Adjust the path according to your project structure

const Logo: React.FC = () => {
    return (
        <div style={{ display: 'inline-block' }}>
            <img src={LogoSVG} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
    );
};

export default Logo;
