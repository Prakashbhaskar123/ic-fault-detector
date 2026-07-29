import { motion } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

function Result({ result, inputData, onBack, onAnalyzeAgain }) {
  if (!result) return null

  const isFaulty = result.is_faulty

  const signalData = Object.entries(result.signal_analysis).map(([key, val]) => ({
    name: key.replace('_', ' ').toUpperCase(),
    value: val.value,
    status: val.status,
    unit: val.unit,
    normal_range: val.normal_range
  }))

  const radarData = [
    { subject: 'Voltage', value: result.signal_analysis.voltage.status === 'normal' ? 100 : 30 },
    { subject: 'Current', value: result.signal_analysis.current.status === 'normal' ? 100 : 30 },
    { subject: 'Frequency', value: result.signal_analysis.frequency.status === 'normal' ? 100 : 30 },
    { subject: 'Timing', value: result.signal_analysis.timing_delay.status === 'normal' ? 100 : 30 },
    { subject: 'Signal', value: result.signal_analysis.signal_strength.status === 'normal' ? 100 : 30 },
    { subject: 'Temp', value: result.signal_analysis.temperature.status === 'normal' ? 100 : 30 },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#020817', padding: '2rem' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', maxWidth: '1000px',
        margin: '0 auto 2rem'
      }}>
        <button onClick={onBack} style={{
          background: 'transparent',
          border: '1px solid rgba(99,179,237,0.2)',
          color: '#64748b', padding: '0.5rem 1rem',
          borderRadius: '8px', cursor: 'pointer',
          fontFamily: 'inherit'
        }}>← Home</button>
        <div style={{ fontWeight: 700, color: '#f1f5f9' }}>
          ⚡ IC Fault Detector
        </div>
        <button onClick={onAnalyzeAgain} style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          border: 'none', color: '#fff',
          padding: '0.5rem 1rem', borderRadius: '8px',
          cursor: 'pointer', fontFamily: 'inherit'
        }}>Analyze Again</button>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* RESULT BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: isFaulty
              ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))'
              : 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))',
            border: `1px solid ${isFaulty ? 'rgba(239,68,68,0.4)' : 'rgba(52,211,153,0.4)'}`,
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            style={{ fontSize: '4rem', marginBottom: '1rem' }}
          >
            {isFaulty ? '⚠️' : '✅'}
          </motion.div>

          <h1 style={{
            fontSize: '2.5rem', fontWeight: 800,
            color: isFaulty ? '#f87171' : '#34d399',
            marginBottom: '0.5rem'
          }}>
            {isFaulty ? 'FAULT DETECTED' : 'CIRCUIT NORMAL'}
          </h1>

          <div style={{
            fontSize: '1.3rem', fontWeight: 600,
            color: '#f1f5f9', marginBottom: '0.5rem'
          }}>
            {result.fault_type}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#60a5fa', padding: '0.4rem 1.25rem',
            borderRadius: '100px', fontSize: '0.9rem',
            marginBottom: '1.5rem'
          }}>
            🎯 Confidence: {result.confidence}%
          </div>

          <p style={{
            color: '#94a3b8', fontSize: '1rem',
            lineHeight: 1.8, maxWidth: '600px', margin: '0 auto'
          }}>
            {result.description}
          </p>
        </motion.div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>

          {/* SIGNAL ANALYSIS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(99,179,237,0.1)',
              borderRadius: '16px', padding: '1.5rem'
            }}
          >
            <h3 style={{
              color: '#f1f5f9', fontWeight: 700,
              marginBottom: '1.25rem', fontSize: '1.1rem'
            }}>
              📊 Signal Analysis
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {signalData.map((sig, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: sig.status === 'normal'
                    ? 'rgba(52,211,153,0.05)'
                    : 'rgba(239,68,68,0.05)',
                  border: `1px solid ${sig.status === 'normal'
                    ? 'rgba(52,211,153,0.2)'
                    : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600 }}>
                      {sig.name}
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.72rem' }}>
                      Normal: {sig.normal_range}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      color: sig.status === 'normal' ? '#34d399' : '#f87171',
                      fontWeight: 700, fontFamily: 'monospace'
                    }}>
                      {sig.value}{sig.unit}
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                      {sig.status === 'normal' ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RADAR CHART */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(99,179,237,0.1)',
              borderRadius: '16px', padding: '1.5rem'
            }}
          >
            <h3 style={{
              color: '#f1f5f9', fontWeight: 700,
              marginBottom: '1rem', fontSize: '1.1rem'
            }}>
              🕸️ Circuit Health Radar
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(99,179,237,0.2)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Radar
                  name="Health"
                  dataKey="value"
                  stroke={isFaulty ? '#ef4444' : '#34d399'}
                  fill={isFaulty ? '#ef4444' : '#34d399'}
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* RECOMMENDATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid rgba(99,179,237,0.1)',
            borderRadius: '16px', padding: '1.5rem',
            marginBottom: '1.5rem'
          }}
        >
          <h3 style={{
            color: '#f1f5f9', fontWeight: 700,
            marginBottom: '1.25rem', fontSize: '1.1rem'
          }}>
            🔧 Recommendations
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {result.recommendations.map((rec, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '10px'
              }}>
                <span style={{ color: '#3b82f6', marginTop: '2px' }}>→</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {rec}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MODEL INFO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex', gap: '1rem',
            justifyContent: 'center', flexWrap: 'wrap'
          }}
        >
          {[
            { label: 'Model', value: 'Random Forest' },
            { label: 'Accuracy', value: result.model_accuracy },
            { label: 'Parameters', value: '6 Signals' },
            { label: 'Decision Trees', value: '100' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid rgba(99,179,237,0.1)',
              borderRadius: '10px', padding: '0.75rem 1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                color: '#3b82f6', fontSize: '0.95rem',
                fontWeight: 700, fontFamily: 'monospace'
              }}>
                {item.value}
              </div>
              <div style={{
                color: '#475569', fontSize: '0.72rem',
                textTransform: 'uppercase', letterSpacing: '1px'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default Result