import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import padongLogo from "../../public/images/padong-logo.png";
const Header = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "flex items-center justify-center bg-[#2e58e4] py-2 Header", children: _jsx("img", { className: "padong-logo w-7", src: padongLogo, onClick: () => navigate("/") }) }));
};
export default Header;
