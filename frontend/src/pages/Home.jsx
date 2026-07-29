import { motion } from 'framer-motion'

function Home({ onStart }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#020817',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* BACKGROUND PARTICLES */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: i % 3 === 0 ? '#3b82f6' :
                          i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* CIRCUIT LINES */}
      <svg style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.05, pointerEvents: 'none'
      }}>
        <line x1="0" y1="30%" x2="100%" y2="30%"
          stroke="#3b82f6" strokeWidth="1"
          strokeDasharray="10 20"/>
        <line x1="0" y1="70%" x2="100%" y2="70%"
          stroke="#8b5cf6" strokeWidth="1"
          strokeDasharray="10 20"/>
        <line x1="20%" y1="0" x2="20%" y2="100%"
          stroke="#3b82f6" strokeWidth="1"
          strokeDasharray="10 20"/>
        <line x1="80%" y1="0" x2="80%" y2="100%"
          stroke="#8b5cf6" strokeWidth="1"
          strokeDasharray="10 20"/>
      </svg>

      {/* MAIN CONTENT */}
      <div style={{ textAlign: 'center', zIndex: 1, maxWidth: '700px' }}>

        {/* ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
        >
          ⚡
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.1
          }}
        >
          <span style={{ color: '#f1f5f9' }}>IC Fault</span>{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Detector
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: '1.15rem',
            color: '#64748b',
            lineHeight: 1.8,
            marginBottom: '1rem'
          }}
        >
          AI-powered integrated circuit fault detection system.
          Enter your circuit parameters and let the ML model
          analyze potential faults with high accuracy.
        </motion.p>

        {/* VLSI BADGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#60a5fa',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            marginBottom: '3rem',
            letterSpacing: '1px'
          }}
        >
          🔬 Powered by Random Forest ML · 100% Accuracy
        </motion.div>

        {/* START BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#fff',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 0 40px rgba(59,130,246,0.4)',
              letterSpacing: '1px'
            }}
          >
            ⚡ Start Analysis
          </motion.button>
        </motion.div>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '4rem'
          }}
        >
          {[
            { num: '100%', label: 'Accuracy' },
            { num: '6', label: 'Parameters' },
            { num: '5+', label: 'Fault Types' },
            { num: 'AI', label: 'Powered' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '0.25rem'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAULT TYPES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginTop: '3rem'
          }}
        >
          {[
            '⏱️ Timing Violation',
            '⚡ Voltage Fault',
            '🔥 Thermal Fault',
            '📡 Signal Integrity',
            '⚠️ Overcurrent'
          ].map((fault, i) => (
            <span key={i} style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(99,179,237,0.15)',
              color: '#64748b',
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              fontSize: '0.8rem'
            }}>
              {fault}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default Home