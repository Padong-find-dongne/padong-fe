import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NewsCard = ({ newsTitle, newsSummary, newsImage, }) => {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: _jsxs("div", { className: "p-4 rounded", children: [_jsx("img", { src: newsImage, alt: newsTitle, className: "w-full h-48 object-cover rounded mb-2" }), _jsx("h3", { className: "text-lg font-bold", children: newsTitle }), _jsx("p", { className: "text-sm text-gray-600", children: newsSummary })] }) }));
};
export default NewsCard;
