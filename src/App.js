import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import LocateInfo from "./page/LocateInfo";
import UseGuide from "./page/UseGuide";
import NewsList from "./page/NewsList";
import FindDong from "./page/FindDong";
import FindMap from "./page/FindMap";
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Main, {}) }), _jsx(Route, { path: "/locate", element: _jsx(LocateInfo, {}) }), _jsx(Route, { path: "/guide", element: _jsx(UseGuide, {}) }), _jsx(Route, { path: "/news-list", element: _jsx(NewsList, {}) }), _jsx(Route, { path: "/search", element: _jsx(FindMap, {}) }), _jsx(Route, { path: "/detail-dong", element: _jsx(FindDong, {}) })] }) }));
}
export default App;
