//import logo from './logo.svg';

import './styles/App.css';
import { HashRouter as Router, Routes, Route, HashRouter} from 'react-router-dom';
import Navbar from './Navbar';
import Home from "./pages/home.js";
import Projects from "./pages/projects.js";
import Skills from "./pages/skills.js";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/projects" element={<Projects/>} />
        </Routes>
      </HashRouter>
    </div>
    
  );
}

export default App;
