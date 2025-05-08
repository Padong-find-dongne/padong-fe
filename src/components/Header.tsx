import { useNavigate } from "react-router-dom";

import padongLogo from "../../public/images/padong-logo.png";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-[#2e58e4] py-2 Header">
      <img
        className="padong-logo w-7"
        src={padongLogo}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Header;
