import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { Mode } from '../App'

interface NavbarProps {
  mode: Mode
  toggleMode: () => void
}

export default function Navbar({ mode }: NavbarProps) {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState<string>('home')

  // Scroll spy for personal mode
  useEffect(() => {
    if (mode !== 'personal' || location.pathname !== '/') return

    const handleScroll = () => {
      const sections = ['travel', 'music']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Check if we're at the top (home section)
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection('home')
        return
      }

      // Check which section is in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [mode, location.pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="w-full px-8 py-4">
        <div className="flex items-center justify-between">
          {mode === 'personal' && location.pathname === '/' ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="flex items-center"
            >
              <img src="/favicon.ico" alt="Logo" className="h-10 w-10" />
            </a>
          ) : (
            <NavLink to="/" className="flex items-center">
              <img src="/favicon.ico" alt="Logo" className="h-10 w-10" />
            </NavLink>
          )}

          <div className="flex items-center gap-8">
            {mode === 'personal' && location.pathname === '/' ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTop()
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Home
              </a>
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`
                }
              >
                Home
              </NavLink>
            )}
            
            <AnimatePresence mode="wait">
              {mode === 'professional' ? (
                <motion.div key="professional" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex items-center gap-8">
                  <NavLink to="/skills" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Skills</NavLink>
                  <NavLink to="/projects" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Projects</NavLink>
                  <NavLink to="/experience" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>Experience</NavLink>
                </motion.div>
              ) : (
                <motion.div key="personal" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex items-center gap-8">
                  <a 
                    href="#travel" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === 'travel' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      document.getElementById('travel')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}
                  >
                    Travel
                  </a>
                  <a 
                    href="#music" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === 'music' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}
                  >
                    Music
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
