import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css'

function Navbar() {
    const location = useLocation()
    const isGame = location.pathname.startsWith('/game')

    return (
        <motion.nav
            className="navbar glass"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🧠</span>
                    <span className="logo-text">
                        Neuro<span className="gradient-text">Bridge</span>
                    </span>
                </Link>

                <div className="navbar-links">
                    <Link
                        to="/"
                        className={`nav-link ${!isGame ? 'active' : ''}`}
                    >
                        Ana Sayfa
                    </Link>
                    <Link
                        to="/game"
                        className={`nav-link ${isGame ? 'active' : ''}`}
                    >
                        Oyna
                    </Link>
                </div>

                <Link to="/game" className="btn btn-primary navbar-cta">
                    <span>Başla</span>
                    <span className="cta-icon">▶</span>
                </Link>
            </div>
        </motion.nav>
    )
}

export default Navbar
