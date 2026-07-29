import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const API_URL = 'https://ic-fault-detector.onrender.com'

const defaultValues = {
  voltage: '',
  current: '',
  frequency: '',
  timing_delay: '',
  signal_strength: '',
  temperature: ''
}

const fields = [
  {
    key: 'voltage',
    label: 'Voltage',
    unit: 'V',
    placeholder: 'e.g. 3.3',
    normal: '3.1 - 3.5V',
    icon: '⚡',
    hint: 'Supply voltage to the circuit'
  },
  {
    key: 'current',
    label: 'Current',
    unit: 'A',
    placeholder: 'e.g. 0.5',
    normal: '0.4 - 0.6A',
    icon: '🔌',
    hint: 'Operating current draw'
  },
  {
    key: 'frequency',
    label: 'Frequency',
    unit: 'MHz',
    placeholder: 'e.g. 100',
    normal: '95 - 105 MHz',
    icon: '📡',
    hint: 'Clock frequency of the circuit'
  },
  {
    key: 'timing_delay',
    label: 'Timing Delay',
    unit: 'ns',
    placeholder: 'e.g. 10',
    normal: '9 - 11 ns',
    icon: '⏱️',
    hint: 'Signal propagation delay (STA)'
  },
  {
    key: 'signal_strength',
    label: 'Signal Strength',
    unit: '',
    placeholder: 'e.g. 0.9',
    normal: '0.8 - 1.0',
    icon: '📶',
    hint: 'Output signal quality (0 to 1)'
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    placeholder: 'e.g. 25',
    normal: '20 - 30°C',
    icon: '🌡️',
    hint: 'Operating temperature'
  }
]

function Analyzer({ onResult, onBack }) {
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }))
    setError('')
  }

  const handleSubmit = async () => {
    // Validate
    for (const field of fields) {
      if (!values[field.key]) {
        setError(`Please enter ${field.label}`)
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      const res = await axios.post(`${API_URL}/predict`, {
        voltage: parseFloat(values.voltage),
        current: parseFloat(values.current),
        frequency: parseFloat(values.frequency),
        timing_delay: parseFloat(values.timing_delay),
        signal_strength: parseFloat(values.signal_strength),
        temperature: parseFloat(values.temperature)
      })

      onResult(res.data, values)

    } catch (err) {
      setError('Cannot connect to AI server. Make sure Flask is running!')
    }

    setLoading(false)
  }

  const fillNormal = () => {
    setValues({
      voltage: '3.3',
      current: '0.5',
      frequency: '100',
      timing_delay: '10',
      signal_strength: '0.9',
      temperature: '25'
    })
  }

  const fillFaulty = () => {
    setValues({
      voltage: '2.1',
      current: '1.2',
      frequency: '85',
      timing_delay: '18',
      signal_strength: '0.5',
      temperature: '54'
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020817',
      padding: '2rem'
    }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        maxWidth: '800px',
        margin: '0 auto 3rem'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid rgba(99,179,237,0.2)',
            color: '#64748b',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '0.9rem'
          }}
        >
          ← Back
        </button>
        <div style={{
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#f1f5f9'
        }}>
          ⚡ IC Fault Detector
        </div>
        <div style={{ width: '80px' }} />
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: '0.5rem'
          }}>
            Enter Circuit Parameters
          </h1>
          <p style={{ color: '#64748b' }}>
            Input the measured values from your IC for fault analysis
          </p>
        </motion.div>

        {/* QUICK FILL BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            justifyContent: 'center'
          }}
        >
          <button
            onClick={fillNormal}
            style={{
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.3)',
              color: '#34d399',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.85rem'
            }}
          >
            ✅ Fill Normal Values
          </button>
          <button
            onClick={fillFaulty}
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.85rem'
            }}
          >
            ❌ Fill Faulty Values
          </button>
        </motion.div>

        {/* INPUT GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}
        >
          {fields.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              style={{
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(99,179,237,0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
                transition: 'border-color 0.3s'
              }}
            >
              {/* LABEL */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  {field.icon} {field.label}
                </span>
                <span style={{
                  color: '#334155',
                  fontSize: '0.72rem',
                  fontFamily: 'monospace'
                }}>
                  Normal: {field.normal}
                </span>
              </div>

              {/* INPUT */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(2,8,23,0.8)',
                border: '1px solid rgba(99,179,237,0.15)',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                gap: '0.5rem'
              }}>
                <input
                  type="number"
                  step="any"
                  placeholder={field.placeholder}
                  value={values[field.key]}
                  onChange={e => handleChange(field.key, e.target.value)}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#e2e8f0',
                    fontSize: '1rem',
                    fontFamily: 'inherit'
                  }}
                />
                {field.unit && (
                  <span style={{
                    color: '#3b82f6',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: 'monospace'
                  }}>
                    {field.unit}
                  </span>
                )}
              </div>

              {/* HINT */}
              <p style={{
                color: '#334155',
                fontSize: '0.72rem',
                marginTop: '0.5rem'
              }}>
                {field.hint}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}
          >
            ❌ {error}
          </motion.div>
        )}

        {/* ANALYZE BUTTON */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            background: loading
              ? 'rgba(59,130,246,0.3)'
              : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#fff',
            border: 'none',
            padding: '1.1rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 0 30px rgba(59,130,246,0.3)',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '🔄 Analyzing Circuit...' : '⚡ Analyze Circuit'}
        </motion.button>

      </div>
    </div>
  )
}

export default Analyzer