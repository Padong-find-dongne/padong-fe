import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import LocateInfo from "./page/LocateInfo";
import UseGuide from "./page/UseGuide";
import NewsList from "./page/NewsList";
import FindDong from "./page/FindDong";
import { useState } from "react";
import FindMap from "./page/FindMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/locate" element={<LocateInfo />} />
        <Route path="/guide" element={<UseGuide />} />
        <Route path="/news-list" element={<NewsList />} />
        <Route path="/search" element={<FindMap />} />
        <Route path="/detail-dong" element={<FindDong />} />
      </Routes>
    </Router>
  );
}

export default App;
