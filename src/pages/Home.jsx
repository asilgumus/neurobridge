import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

function Home() {
    const features = [
        {
            icon: '🎨',
            title: 'Renklerle Öğren',
            description: 'Her renk bir komuta karşılık gelir. Görsel hafızanı kullanarak algoritma mantığını kolayca kavra.'
        },
        {
            icon: '🧩',
            title: 'Sürükle & Bırak',
            description: 'Renkli blokları sürükleyerek programını oluştur. Kod yazmadan programlama mantığını keşfet.'
        },
        {
            icon: '🚀',
            title: 'Seviye Seviye İlerle',
            description: '20 farklı seviye ile adım adım öğren. Her seviye yeni bir kavram ekler.'
        },
        {
            icon: '🎮',
            title: 'Eğlenceli Oyun',
            description: 'Robotu hedefe ulaştır! Başarılarını kutla ve yıldız topla.'
        },
        {
            icon: '🧠',
            title: 'DEHB Dostu',
            description: 'Kısa dikkat sürelerine uygun, görsel ağırlıklı ve ödüllendirici bir deneyim.'
        },
        {
            icon: '✨',
            title: 'Anında Geri Bildirim',
            description: 'Her adımda görsel geri bildirim. Hataları hemen gör ve düzelt.'
        }
    ]

    const commands = [
        { color: '#10B981', name: 'İLERİ', icon: '↑' },
        { color: '#3B82F6', name: 'SOL', icon: '←' },
        { color: '#F59E0B', name: 'SAĞ', icon: '→' },
        { color: '#8B5CF6', name: 'TEKRAR', icon: '🔄' },
        { color: '#F97316', name: 'EĞER', icon: '❓' },
        { color: '#EF4444', name: 'DUR', icon: '⏹' }
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
                            Renklerle <span className="gradient-text">Algoritma</span> Öğren
                        </h1>
                        <p className="hero-description">
                            DEHB'li çocuklar için tasarlanmış, görsel hafızayı kullanarak
                            programlama mantığını öğreten eğlenceli bir oyun.
                        </p>

                        <div className="hero-actions">
                            <Link to="/game" className="btn btn-primary btn-lg">
                                <span>Oynamaya Başla</span>
                                <span>🎮</span>
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
                                            {i === 0 && <span className="robot">🤖</span>}
                                            {i === 24 && <span className="target">🎯</span>}
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
                        <h2>Renk Komutları</h2>
                        <p>Her renk bir programlama komutuna karşılık gelir</p>
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

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Neden NeuroBridge?</h2>
                        <p>Görsel öğrenme ile algoritma temelleri</p>
                    </motion.div>

                    <div className="features-grid">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="feature-card card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="feature-icon">{feature.icon}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
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

                    <div className="steps-grid">
                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>Haritayı İncele</h3>
                                <p>Robotun nerede olduğunu ve hedefe nasıl ulaşacağını düşün.</p>
                            </div>
                            <div className="step-visual">
                                <div className="mini-grid">
                                    <span className="robot">🤖</span>
                                    <span className="arrow">→</span>
                                    <span className="target">🎯</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>Komutları Sırala</h3>
                                <p>Renkli blokları sürükleyerek doğru sırayla yerleştir.</p>
                            </div>
                            <div className="step-visual">
                                <div className="mini-commands">
                                    <div className="mini-cmd" style={{ background: '#10B981' }}>↑</div>
                                    <div className="mini-cmd" style={{ background: '#F59E0B' }}>→</div>
                                    <div className="mini-cmd" style={{ background: '#10B981' }}>↑</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>Çalıştır & Kutla!</h3>
                                <p>Programını çalıştır ve robotun hedefe ulaşmasını izle!</p>
                            </div>
                            <div className="step-visual">
                                <span className="celebration">🎉</span>
                            </div>
                        </motion.div>
                    </div>
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
                            <p>Hemen başla ve renklerle algoritma öğrenmenin keyfini çıkar!</p>
                        </div>
                        <Link to="/game" className="btn btn-primary btn-lg">
                            <span>Hemen Başla</span>
                            <span>🚀</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <span className="logo-icon">🧠</span>
                            <span className="logo-text">NeuroBridge</span>
                        </div>
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
