import pandas as pd
import numpy as np

def generate_circuit_data(samples=1000):
    np.random.seed(42)
    
    # Normal circuit signals
    normal = pd.DataFrame({
        'voltage': np.random.normal(3.3, 0.1, samples//2),
        'current': np.random.normal(0.5, 0.02, samples//2),
        'frequency': np.random.normal(100, 2, samples//2),
        'timing_delay': np.random.normal(10, 0.5, samples//2),
        'signal_strength': np.random.normal(0.9, 0.05, samples//2),
        'temperature': np.random.normal(25, 2, samples//2),
        'fault': 0  # No fault
    })

    # Faulty circuit signals
    faulty = pd.DataFrame({
        'voltage': np.random.normal(2.1, 0.5, samples//2),
        'current': np.random.normal(1.2, 0.3, samples//2),
        'frequency': np.random.normal(85, 8, samples//2),
        'timing_delay': np.random.normal(18, 2, samples//2),
        'signal_strength': np.random.normal(0.5, 0.15, samples//2),
        'temperature': np.random.normal(45, 8, samples//2),
        'fault': 1  # Fault detected
    })

    data = pd.concat([normal, faulty], ignore_index=True)
    data = data.sample(frac=1).reset_index(drop=True)
    
    return data

if __name__ == "__main__":
    data = generate_circuit_data()
    data.to_csv('circuit_data.csv', index=False)
    print(f"✅ Dataset created: {len(data)} samples")
    print(f"Normal circuits: {len(data[data['fault']==0])}")
    print(f"Faulty circuits: {len(data[data['fault']==1])}")
    print(data.head())