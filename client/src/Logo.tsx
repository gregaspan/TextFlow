import React from 'react';
import LogoSVG from './assets/TextFlowLogo2.svg';  // Adjust the path according to your project structure

const Logo: React.FC = () => {
    return (
        <div style={{ display: 'inline-block' }}>
            <img src={LogoSVG} alt="Logo" style={{ width: '70px', height: 'auto' }} />
        </div>
    );
};

export default Logo;
