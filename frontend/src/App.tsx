import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Readings from "./Readings";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/readings" element={<Readings />} />

      </Routes>
    </Router>
  );
}

export default App;