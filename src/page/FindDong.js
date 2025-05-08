import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchStore } from "../store/SearchStore";
import Header from "../components/Header";
const FindMap = () => {
    const { selectedRecommendation } = useSearchStore();
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx("div", { className: "mt-5 ml-10 mr-10 flex flex-row space-x-10", children: _jsx("aside", { className: "basis-1/2 w-100 flex flex-col ", children: _jsxs("div", { children: [_jsxs("div", { className: "p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2", children: [_jsx("span", { className: "font-[600] mr-2", children: "\uCD9C\uADFC\uC9C0" }), _jsx("span", { className: "text-lg text-[#818181] mb-0.3 mr-5", children: "|" }), _jsx("span", { className: "text-[#818181]", children: selectedRecommendation?.departureDong.address })] }), _jsxs("div", { className: "text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold flex flex-col mt-2", children: [_jsx("span", { className: "text-[#4A6CDF]", children: selectedRecommendation?.departureDong.address }), _jsx("span", { children: "\uD589\uC815\uB3D9 \uC815\uBCF4" })] })] }) }) })] }));
};
export default FindMap;
