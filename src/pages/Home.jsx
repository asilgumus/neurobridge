import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import robotImage from '../assets/neurobridge-robot.png'
import Logo from '../components/Logo'
import './Home.css'

function Home() {
    const commands = [
        { color: '#10B981', name: 'YUKARI', icon: '↑' },
        { color: '#EF4444', name: 'AŞAĞI', icon: '↓' },
        { color: '#06B6D4', name: 'SOL', icon: '←' },
        { color: '#F472B6', name: 'SAĞ', icon: '→' }
    ]

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-gradient"></div>
                    <div className="hero-pattern"></div>
                </div>

                <div className="container hero-content">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>
                            Küçük adımlarla <span className="gradient-text">yol bul</span>
                        </h1>
                        <p className="hero-description">
                            Sadece yön seç. Noktayı yıldıza ulaştır. Her seviye kısa ve anlaşılır.
                        </p>

                        <div className="hero-actions">
                            <Link to="/game" className="btn btn-primary btn-lg">
                                <span>Oyuna başla</span>
                            </Link>
                            <a href="#how-it-works" className="btn btn-secondary btn-lg">
                                Nasıl Çalışır?
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="hero-card glass">
                            <div className="hero-demo">
                                <div className="demo-grid">
                                    {[...Array(25)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`demo-cell ${i === 0 ? 'start' : ''} ${i === 24 ? 'end' : ''}`}
                                        >
                                            {i === 0 && <img className="robot" src={robotImage} alt="Robot" />}
                                            {i === 24 && <span className="target">★</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="demo-commands">
                                    {commands.slice(0, 4).map((cmd, i) => (
                                        <motion.div
                                            key={i}
                                            className="demo-command"
                                            style={{ backgroundColor: cmd.color }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                        >
                                            {cmd.icon}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Commands Section */}
            <section className="commands-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Dört basit yön</h2>
                        <p>İhtiyacın olan bütün hareketler burada.</p>
                    </motion.div>

                    <div className="commands-grid">
                        {commands.map((cmd, i) => (
                            <motion.div
                                key={i}
                                className="command-card"
                                style={{ '--command-color': cmd.color }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div
                                    className="command-icon"
                                    style={{ backgroundColor: cmd.color }}
                                >
                                    {cmd.icon}
                                </div>
                                <span className="command-name">{cmd.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Nasıl Çalışır?</h2>
                        <p>3 basit adımda algoritma öğren</p>
                    </motion.div>

                    <motion.ol className="learning-route" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <li><span className="route-stop">1</span><div><h3>Haritaya bak</h3><p>Robotun ve hedefin yerini gör.</p></div></li>
                        <li><span className="route-stop">2</span><div><h3>Yönleri seç</h3><p>İhtiyacın olan okları sıraya koy.</p></div></li>
                        <li><span className="route-stop">3</span><div><h3>Yolu çalıştır</h3><p>Robotun hedefe gidişini izle.</p></div></li>
                    </motion.ol>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <motion.div
                        className="cta-card glass"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="cta-content">
                            <h2>Öğrenmeye Hazır mısın?</h2>
                            <p>Bir yön seçerek ilk seviyeyi bitir.</p>
                        </div>
                        <Link to="/game" className="btn btn-primary btn-lg">
                            <span>Hemen başla</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <Logo />
                        <p className="footer-text">
                            DEHB'li çocuklar için algoritma öğrenme platformu
                        </p>
                        <p className="footer-credit">
                            4th Dimension - 6429
                            adg
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
