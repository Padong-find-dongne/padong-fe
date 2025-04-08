import React from "react";
import "../styles/Header.css";
import padongLogo from "../../public/images/padong-logo.png";
const Header = () => {
  return (
    <div className="flex items-center justify-center bg-[#2e58e4] py-2 Header">
      <img className="padong-logo w-7" src={padongLogo} />
    </div>
  );
};

export default Header;
