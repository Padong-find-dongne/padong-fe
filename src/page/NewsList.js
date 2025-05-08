import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { useNewsStore } from "../store/newsStore";
import Header from "../components/Header";
const NewsList = () => {
    const { youthHousingNews, housingPriceNews, fetchAllNews } = useNewsStore();
    useEffect(() => {
        fetchAllNews();
    }, []);
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsxs("section", { className: "my-5 px-20 max-w-screen-xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "News" }), _jsx("hr", { className: "absolute left-0 w-screen border-t border-[#E5E5E5]" }), _jsxs("div", { className: "relative z-10 mt-15", children: [_jsx("span", { className: "border-b text-xl font-bold", children: "\uCCAD\uB144\uC548\uC2EC\uC8FC\uD0DD" }), _jsx("p", { className: "my-3 text-[#818181]", children: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC\uC758 \uCCAD\uB144\uC548\uC2EC\uC8FC\uD0DD\uC0AC\uC5C5\uC758 \uB2E4\uC591\uD55C \uC815\uBCF4\uB97C \uCC3E\uC544\uBCF4\uC138\uC694." })] }), _jsx("div", { className: "flex overflow-x-auto scroll-pl-6 snap-x ", children: _jsx("div", { className: "flex w-max space-x-4", children: youthHousingNews.map((news, index) => (_jsx("div", { className: "snap-start shrink-0 w-[calc(25%-1rem)] min-w-[100px]", children: _jsx(NewsCard, { ...news }) }, index))) }) }), _jsxs("div", { className: "mt-10", children: [_jsx("span", { className: "border-b text-xl font-bold mb-2", children: "\uC8FC\uD0DD \uC18C\uC2DD" }), _jsx("p", { className: "my-3 text-[#818181]", children: "\uC8FC\uD0DD \uC815\uBCF4 \uBC0F \uB274\uC2A4\uB97C \uD655\uC778\uD558\uC138\uC694." }), _jsx("div", { className: "flex overflow-x-auto scroll-pl-6 snap-x", children: _jsx("div", { className: "flex w-max space-x-4", children: housingPriceNews.map((news, index) => (_jsx("div", { className: "snap-start shrink-0 w-[calc(25%-1rem)] min-w-[100px]", children: _jsx(NewsCard, { ...news }) }, index))) }) })] })] })] }));
};
export default NewsList;
