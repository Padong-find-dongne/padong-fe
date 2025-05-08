import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/SearchStore";
import SeoulMap from "../components/SeoulMap";
import Header from "../components/Header";
import "../styles/Media.css";
const FindMap = () => {
    const { recommendations } = useSearchStore();
    const { singleDestination, multiDestinations, inputType } = useSearchStore();
    const navigate = useNavigate();
    const { setSelectedRecommendation } = useSearchStore();
    const handleDong = (data) => () => {
        setSelectedRecommendation(data);
        navigate("/detail-dong");
    };
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsxs("div", { className: "mt-5 ml-10 mr-10 flex flex-row space-x-10", children: [_jsxs("aside", { className: "basis-1/2 w-100 flex flex-col ", children: [inputType === "option1" ? (_jsx("div", { children: _jsxs("div", { className: "p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2", children: [_jsx("span", { className: "font-[600] mr-2", children: "\uCD9C\uADFC\uC9C0" }), _jsx("span", { className: "text-lg text-[#818181] mb-0.3 mr-5", children: "|" }), _jsx("span", { className: "text-[#818181]", children: singleDestination?.dongName || "" })] }) })) : (_jsxs("div", { className: "p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2", children: [_jsxs("div", { className: "border-b border-gray-200", children: [_jsx("span", { className: "font-[600] mr-2", children: "\uCD9C\uADFC\uC9C01" }), _jsx("span", { className: "text-lg text-[#818181] mb-0.3 mr-5", children: "|" }), _jsx("span", { className: "text-[#818181]", children: multiDestinations[0]?.dongName || "" })] }), _jsxs("div", { children: [_jsx("span", { className: "font-[600] mr-2", children: "\uCD9C\uADFC\uC9C02" }), _jsx("span", { className: "text-lg text-[#818181] mb-0.3 mr-5", children: "|" }), _jsx("span", { className: "text-[#818181]", children: multiDestinations[1]?.dongName || "" })] })] })), _jsx("div", { className: "mt-15 not-first-of-type:h-[700px] snap-y overflow-y-auto", children: recommendations.map((rec) => (_jsxs("div", { className: "mb-15", onClick: handleDong(rec), children: [_jsx("p", { className: "snap-start text-[#3D3D3D] font-bold text-[20px]", children: rec.departureDong.address }), _jsx("div", { className: "score snap-start mt-5 ", children: _jsxs("div", { className: "grid grid-col-2 gap-3 mt-3 ", children: [_jsxs("div", { className: "flex col-span-2 ", children: [_jsx("span", { children: "\uD30C\uB3D9 \uC810\uC218" }), _jsx("div", { className: "px-2 py-0.5 bg-[#3356CC] border rounded-lg text-xs text-white", children: rec.score })] }), _jsxs("div", { children: [" ", _jsx("span", { children: "\uC548\uC804\uB4F1\uAE09" }), " ", rec.safety] }), _jsxs("div", { children: [" ", _jsx("span", { children: "\uC778\uAD6C\uBC00\uB3C4" }), rec.density] }), _jsxs("div", { children: [" ", _jsx("span", { children: "\uD3C9\uADE0 \uC6D4\uC138" }), rec.avgMonthlyRent] }), _jsxs("div", { children: [" ", _jsx("span", { children: "\uD3C9\uADE0 \uC804\uC138" }), " ", rec.avgJeonseDeposit] }), _jsxs("div", { className: "mt-1 col-span-2", children: [_jsx("hr", { className: "mb-3 text-[#F2F2F2]" }), _jsx("span", { children: "\uCD9C\uD1F4\uADFC \uC2DC\uAC04" }), rec.avgTime] }), _jsxs("div", { className: "col-span-2", children: [" ", _jsx("span", { children: "\uCD9C\uD1F4\uADFC \uAC70\uB9AC" }), rec.totalMobility] })] }) })] }, rec.departureDong.adminDongCode))) })] }), _jsx(SeoulMap, {})] })] }));
};
export default FindMap;
