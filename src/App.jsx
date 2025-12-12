import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Game from './pages/Game'
import Navbar from './components/Navbar'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/:level" element={<Game />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
