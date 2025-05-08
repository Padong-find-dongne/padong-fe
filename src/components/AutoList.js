import { jsx as _jsx } from "react/jsx-runtime";
import { useAutoStore } from "../store/AutoStore";
const AutoList = ({ onSelect }) => {
    const { suggestions, clear } = useAutoStore();
    if (!suggestions.length)
        return null;
    return (_jsx("ul", { className: "absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md", children: suggestions.map((item, idx) => (_jsx("li", { onClick: () => {
                onSelect(item); // 선택 시 상위에서 전달받은 함수 호출
                clear(); // 리스트 닫기
            }, className: "px-4 py-2 hover:bg-blue-100 cursor-pointer", children: item }, idx))) }));
};
export default AutoList;
