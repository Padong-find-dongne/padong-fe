import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import "../styles/Media.css";
import { BiSolidQuoteLeft } from "react-icons/bi";
const Main = () => {
    const { youthHousingNews, housingPriceNews, fetchAllNews } = useNewsStore();
    const navigate = useNavigate();
    // 페이지 이동
    const handleGuideClick = () => {
        navigate("/guide");
    };
    const handleNewsClick = () => {
        navigate("/news-list");
    };
    //뉴스 렌더링
    useEffect(() => {
        fetchAllNews();
    }, []);
    return (_jsxs("div", { className: "mb-20", children: [_jsx(Header, {}), _jsx("div", { className: "flex items-center justify-center bg-[url(/images/banner1.png)] bg-center bg-cover Banner", children: _jsxs("div", { className: "main-search-place", children: [_jsxs("div", { className: "space-y-2 flex flex-col align-center justify-center py-12 banner-text", children: [_jsx(BiSolidQuoteLeft, { className: "text-2xl opacity-25" }), _jsx("span", { className: "text-[#2e58e4] text-4xl font-semibold ", children: "\uCD9C\uADFC\uAE38" }), _jsx("span", { className: "text-3xl", children: "\uC5B4\uB514\uC11C \uC2DC\uC791\uD558\uC2DC\uB098\uC694 ?" })] }), _jsx(SearchBar, {}), _jsx("div", { className: "flex justify-end mt-2", children: _jsx("button", { onClick: handleGuideClick, className: "bg-[#2e58e4] text-white text-xs py-1 px-3 mb-5 rounded-lg use-guide", children: "\uC774\uC6A9\uAC00\uC774\uB4DC >" }) })] }) }), _jsxs("div", { className: "news-list m-20 px-5", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "inline-flex flex-col", children: [_jsx("span", { className: "text-3xl font-bold border-b", children: "News" }), _jsx("span", { className: "text-[#818181] mt-3", children: "\uC8FC\uD0DD \uC815\uBCF4 \uBC0F \uB274\uC2A4\uB97C \uD655\uC778\uD558\uC138\uC694." })] }), _jsx("span", { onClick: handleNewsClick, className: "text-[#6D6D6D]", children: "\uB354\uBCF4\uAE30" })] }), _jsx("div", { className: "news-grid mt-10 grid grid-cols-4 gap-4", children: [
                            ...youthHousingNews.slice(0, 2),
                            ...housingPriceNews.slice(0, 2),
                        ].map((item, index) => (_jsx(NewsCard, { ...item }, index))) })] })] }));
};
export default Main;
