import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchStore } from "../store/SearchStore";
import { useAutoStore } from "../store/AutoStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBoundaryStore } from "../store/BoundaryStore";
const SearchBar = () => {
    const { inputType, setInputType, singleDestination, setSingleDestination, multiDestinations, setMultiDestination, } = useSearchStore();
    // 상단 선언
    const { fetchBoundary } = useBoundaryStore();
    const { suggestions, setQuery, fetchSuggestions, clear } = useAutoStore();
    const navigate = useNavigate();
    const { setRecommendations } = useSearchStore();
    const fetchRecommendations = async (address) => {
        try {
            const res = await axios.get(`/api/mobility/address?address=${encodeURIComponent(address)}`);
            return res.data?.data ?? [];
        }
        catch (e) {
            console.error("추천 요청 실패:", e);
            return [];
        }
    };
    const handleInputChange = (index, value) => {
        setMultiDestination(index, { dongName: value, dongCode: "" });
        setQuery(value);
        fetchSuggestions(value);
    };
    const fetchSingleAdminDongCode = async (dongName) => {
        try {
            const res = await fetch(`/api/mobility/address?address=${encodeURIComponent(dongName)}`);
            const data = await res.json();
            return data?.data?.[0]?.departureDong?.adminDongCode ?? null;
        }
        catch {
            return null;
        }
    };
    const fetchMultiAdminDongCodes = async (addr1, addr2) => {
        try {
            const res = await fetch(`/api/mobility/address/multi?address1=${encodeURIComponent(addr1)}&address2=${encodeURIComponent(addr2)}&page=0`);
            const data = await res.json();
            const code1 = data?.data?.firstMobility?.[0]?.departureDong?.adminDongCode;
            const code2 = data?.data?.secondMobility?.[0]?.departureDong?.adminDongCode;
            return code1 && code2 ? [code1, code2] : null;
        }
        catch {
            return null;
        }
    };
    const handleSelect = async (dongName, index = 0) => {
        const dongCode = await fetchSingleAdminDongCode(dongName);
        if (!dongCode)
            return;
        if (inputType === "option1") {
            setSingleDestination({ dongName, dongCode });
        }
        else {
            setMultiDestination(index, { dongName, dongCode });
        }
        clear();
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleNext();
            navigate("/search");
        }
    };
    const handleNext = async () => {
        if (inputType === "option1") {
            const dongName = singleDestination.dongName;
            const code = singleDestination.dongCode ||
                (await fetchSingleAdminDongCode(dongName));
            if (!code)
                return alert("행정동 코드를 찾을 수 없습니다.");
            const _boundary = await fetchBoundary(code);
            const recommendations = await fetchRecommendations(dongName);
            setRecommendations(recommendations); // zustand store에 저장
            navigate("/search");
        }
        else {
            const [addr1, addr2] = multiDestinations.map((d) => d.dongName);
            const codes = await fetchMultiAdminDongCodes(addr1, addr2);
            if (!codes)
                return alert("두 개의 행정동 코드를 찾을 수 없습니다.");
            const [_b1, _b2] = await Promise.all([
                fetchBoundary(codes[0]),
                fetchBoundary(codes[1]),
            ]);
            // 추천은 첫 번째 목적지 기준으로 받아오기
            const recommendations = await fetchRecommendations(addr1);
            setRecommendations(recommendations);
            navigate("/search");
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsxs("div", { className: "flex my-0 space-x-15", children: [_jsx("button", { className: `px-9 py-1 rounded-t-2xl ${inputType === "option1"
                            ? "bg-[#2e58e4] text-white"
                            : "bg-[#A3A3A3] text-white"}`, onClick: () => setInputType("option1"), children: "\uB098 \uD63C\uC790 \uC0B4\uC544\uC694" }), _jsx("button", { className: `px-9 py-2 rounded-t-2xl ${inputType === "option2"
                            ? "bg-[#2e58e4] text-white"
                            : "bg-[#A3A3A3] text-white"}`, onClick: () => setInputType("option2"), children: "\uC6B0\uB9AC \uD568\uAED8 \uC0B4\uC544\uC694" })] }), inputType === "option1" ? (_jsxs("div", { className: "relative items-center w-screen max-w-xl", children: [_jsx("input", { type: "text", value: singleDestination.dongName, onChange: (e) => {
                            const q = e.target.value;
                            setSingleDestination({ dongName: q, dongCode: "" });
                            setQuery(q);
                            fetchSuggestions(q);
                        }, onKeyDown: handleKeyPress, placeholder: "\uBAA9\uC801\uC9C0(\uCD9C\uADFC\uC9C0,\uD68C\uC0AC \uB4F1)\uC758 \uC9C0\uC5ED\uBA85\uC744 \uAC80\uC0C9\uD574\uBCF4\uC138\uC694", className: "w-full pr-10 pl-4 py-2.5 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("div", { className: "absolute top-1 right-3 p-1.5 text-[#2e58e4] rounded-full", children: _jsx(GrSearch, { className: "text-lg cursor-pointer", onClick: handleNext }) }), suggestions.length > 0 && (_jsx("ul", { className: "absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto", children: suggestions.map((item, idx) => (_jsx("li", { onClick: () => handleSelect(item), className: "px-4 py-2 hover:bg-blue-100 cursor-pointer", children: item }, idx))) }))] })) : (_jsxs("div", { className: "relative w-screen max-w-xl border rounded-lg border-[#2e58e4]", children: [[0, 1].map((idx) => (_jsxs("div", { className: "border-b border-gray-300 relative", children: [_jsx("input", { type: "text", value: multiDestinations[idx].dongName, onChange: (e) => handleInputChange(idx, e.target.value), onKeyDown: handleKeyPress, placeholder: "\uBAA9\uC801\uC9C0(\uCD9C\uADFC\uC9C0,\uD68C\uC0AC \uB4F1)\uC758 \uC9C0\uC5ED\uBA85\uC744 \uAC80\uC0C9\uD574\uBCF4\uC138\uC694", className: "w-full pr-10 pl-4 py-2.5 indent-14 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsxs("span", { className: "absolute text-xs text-white bg-[#2e58e4] p-1 rounded-md left-3 top-1/2 transform -translate-y-1/2", children: ["\uCD9C\uADFC\uC9C0 ", idx + 1] }), suggestions.length > 0 && (_jsx("ul", { className: "absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto", children: suggestions.map((item, sIdx) => (_jsx("li", { onClick: () => handleSelect(item, idx), className: "px-4 py-2 hover:bg-blue-100 cursor-pointer", children: item }, sIdx))) }))] }, idx))), _jsx("div", { className: "absolute top-5 right-3 p-1.5 bg-[#2e58e4] text-[#FFFFFF] rounded-full", children: _jsx(GrSearch, { className: "text-lg cursor-pointer", onClick: handleNext }) })] }))] }));
};
export default SearchBar;
