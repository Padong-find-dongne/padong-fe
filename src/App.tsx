import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import HouseInfo from "./components/HouseInfo";
import UseGuide from "./page/UseGuide";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/house" element={<HouseInfo />} />
        <Route path="/guide" element={<UseGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
