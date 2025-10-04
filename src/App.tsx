import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Projects from './pages/Projects'


export type Mode = 'professional' | 'personal'

function App() {
  const [mode, setMode] = useState<Mode>('professional')

  const toggleMode = () => {
    setMode(prev => prev === 'professional' ? 'personal' : 'professional')
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home mode={mode} toggleMode={toggleMode} />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Personal mode uses sections on home page, not separate routes */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
