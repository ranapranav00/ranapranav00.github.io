//import logo from './logo.svg';

import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Home from "./pages/home.js";
import Projects from "./pages/projects.js";
import Skills from "./pages/skills.js";


function App() {
  return (
    <div className="App">
      {/* BrowserRouter basename={process.env.PUBLIC_URL} */}
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/projects" element={<Projects/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
