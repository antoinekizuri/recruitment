import React from 'react';
import Logo from "../../assets/COP-Logo.jpg";
import Flag from "../../assets/SouthAfricaFlag.png"; // Add flag image
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo} alt="Polokwane Municipality Logo" className="logo" />
      </div>
      
      <div className="header-center">
        <p className="form-title">Application for Employment</p>
      </div>

      <div className="header-right">
        <img src={Flag} alt="South African Flag" className="flag" />
      </div>
    </header>
  );
};

export default Header;
