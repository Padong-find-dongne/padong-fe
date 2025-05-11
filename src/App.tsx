import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import UseGuide from "./page/UseGuide";
import NewsList from "./page/NewsList";
import FindDong from "./page/FindDong";
import FindMap from "./page/FindMap";
import MultiFindMap from "./page/MultiFindMap";
import MultiFindDong from "./page/MultiFindDong";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/guide" element={<UseGuide />} />
        <Route path="/news-list" element={<NewsList />} />
        <Route path="/search" element={<FindMap />} />
        <Route path="/detail-dong" element={<FindDong />} />
        <Route path="/search-multi" element={<MultiFindMap />} />
        <Route path="/multi/detail-dong" element={<MultiFindDong />} />
      </Routes>
    </Router>
  );
}

export default App;
