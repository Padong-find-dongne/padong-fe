import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import HouseInfo from "./components/HouseInfo";
import UseGuide from "./page/UseGuide";
import NewsList from "./page/NewsList";
import FindMap from "./page/FingMap";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/house" element={<HouseInfo />} />
        <Route path="/guide" element={<UseGuide />} />
        <Route path="/newsList" element={<NewsList search="youth-house" />} />

        <Route path="/search" element={<FindMap />} />
      </Routes>
    </Router>
  );
}

export default App;
