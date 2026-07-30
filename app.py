from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Load trained model and scaler
print("🔄 Loading AI model...")
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('model_info.json', 'r') as f:
    model_info = json.load(f)

print("✅ Model loaded successfully!")
print(f"🎯 Model accuracy: {model_info['accuracy']*100:.2f}%")

# Fault types based on which signals are abnormal
def get_fault_type(voltage, current, frequency, 
                   timing_delay, signal_strength, temperature):
    
    if timing_delay > 14:
        return "Timing Violation"
    elif voltage < 2.5:
        return "Voltage Fault"
    elif current > 0.8:
        return "Overcurrent Fault"
    elif temperature > 35:
        return "Thermal Fault"
    elif signal_strength < 0.7:
        return "Signal Integrity Fault"
    elif frequency < 90:
        return "Frequency Fault"
    else:
        return "Unknown Fault"

def get_fault_description(fault_type):
    descriptions = {
        "Timing Violation": "Signal arrived too late — setup/hold time violated. Common in high-speed designs.",
        "Voltage Fault": "Supply voltage dropped below threshold. Power delivery issue detected.",
        "Overcurrent Fault": "Current exceeded safe operating limit. Possible short circuit.",
        "Thermal Fault": "Operating temperature too high. Risk of permanent damage.",
        "Signal Integrity Fault": "Signal strength degraded. Possible noise or impedance mismatch.",
        "Frequency Fault": "Clock frequency degraded. Timing closure issues detected.",
        "Unknown Fault": "Multiple parameters abnormal. Full diagnostic required."
    }
    return descriptions.get(fault_type, "Unknown fault detected")

def get_recommendations(fault_type):
    recommendations = {
        "Timing Violation": [
            "Check setup and hold time margins",
            "Review clock tree synthesis",
            "Consider reducing clock frequency",
            "Inspect critical timing paths"
        ],
        "Voltage Fault": [
            "Check power supply unit",
            "Inspect voltage regulators",
            "Review power delivery network",
            "Check for IR drop issues"
        ],
        "Overcurrent Fault": [
            "Check for short circuits",
            "Review current limiting resistors",
            "Inspect power rails",
            "Check for electromigration"
        ],
        "Thermal Fault": [
            "Improve heat dissipation",
            "Check thermal interface material",
            "Review power consumption",
            "Consider thermal throttling"
        ],
        "Signal Integrity Fault": [
            "Check trace impedance matching",
            "Review signal routing",
            "Add termination resistors",
            "Inspect for EMI interference"
        ],
        "Frequency Fault": [
            "Check PLL lock status",
            "Review clock source",
            "Inspect clock distribution",
            "Check for jitter issues"
        ]
    }
    return recommendations.get(fault_type, 
           ["Run full diagnostic", "Check all parameters"])

# ─── ROUTES ───────────────────────────────────────

# Test route
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': '⚡ IC Fault Detector API Running!',
        'accuracy': f"{model_info['accuracy']*100:.2f}%",
        'status': 'ready'
    })

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract values
        voltage = float(data['voltage'])
        current = float(data['current'])
        frequency = float(data['frequency'])
        timing_delay = float(data['timing_delay'])
        signal_strength = float(data['signal_strength'])
        temperature = float(data['temperature'])
        
        print(f"\n📊 Analyzing circuit:")
        print(f"   Voltage: {voltage}V")
        print(f"   Current: {current}A")
        print(f"   Frequency: {frequency}MHz")
        print(f"   Timing Delay: {timing_delay}ns")
        print(f"   Signal Strength: {signal_strength}")
        print(f"   Temperature: {temperature}°C")
        
        # Prepare input
        features = np.array([[
            voltage, current, frequency,
            timing_delay, signal_strength, temperature
        ]])
        
        # Scale input
        features_scaled = scaler.transform(features)
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]
        confidence = float(max(probability)) * 100
        
        # Determine result
        is_faulty = bool(prediction == 1)
        
        if is_faulty:
            fault_type = get_fault_type(
                voltage, current, frequency,
                timing_delay, signal_strength, temperature
            )
            description = get_fault_description(fault_type)
            recommendations = get_recommendations(fault_type)
            status = "FAULT DETECTED"
        else:
            fault_type = "No Fault"
            description = "All circuit parameters are within normal operating range."
            recommendations = ["Circuit is operating normally", 
                             "Continue regular monitoring"]
            status = "NORMAL"
        
        # Signal analysis
        signal_analysis = {
            'voltage': {
                'value': voltage,
                'unit': 'V',
                'normal_range': '3.1V - 3.5V',
                'status': 'normal' if 3.1 <= voltage <= 3.5 else 'abnormal'
            },
            'current': {
                'value': current,
                'unit': 'A',
                'normal_range': '0.4A - 0.6A',
                'status': 'normal' if 0.4 <= current <= 0.6 else 'abnormal'
            },
            'frequency': {
                'value': frequency,
                'unit': 'MHz',
                'normal_range': '95MHz - 105MHz',
                'status': 'normal' if 95 <= frequency <= 105 else 'abnormal'
            },
            'timing_delay': {
                'value': timing_delay,
                'unit': 'ns',
                'normal_range': '9ns - 11ns',
                'status': 'normal' if 9 <= timing_delay <= 11 else 'abnormal'
            },
            'signal_strength': {
                'value': signal_strength,
                'unit': '',
                'normal_range': '0.8 - 1.0',
                'status': 'normal' if 0.8 <= signal_strength <= 1.0 else 'abnormal'
            },
            'temperature': {
                'value': temperature,
                'unit': '°C',
                'normal_range': '20°C - 30°C',
                'status': 'normal' if 20 <= temperature <= 30 else 'abnormal'
            }
        }
        
        result = {
            'status': status,
            'is_faulty': is_faulty,
            'fault_type': fault_type,
            'confidence': round(confidence, 2),
            'description': description,
            'recommendations': recommendations,
            'signal_analysis': signal_analysis,
            'model_accuracy': f"{model_info['accuracy']*100:.2f}%"
        }
        
        print(f"\n🎯 Result: {status}")
        print(f"   Fault Type: {fault_type}")
        print(f"   Confidence: {confidence:.2f}%")
        
        return jsonify(result)
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Model info route
@app.route('/model-info', methods=['GET'])
def get_model_info():
    return jsonify({
        'accuracy': f"{model_info['accuracy']*100:.2f}%",
        'features': model_info['features'],
        'feature_importance': model_info['feature_importance'],
        'training_samples': model_info['training_samples'],
        'testing_samples': model_info['testing_samples']
    })

# Sample test route
@app.route('/test', methods=['GET'])
def test_prediction():
    # Test with a faulty circuit
    test_data = {
        'voltage': 2.1,
        'current': 1.2,
        'frequency': 85,
        'timing_delay': 18,
        'signal_strength': 0.5,
        'temperature': 54
    }
    
    features = np.array([[
        test_data['voltage'],
        test_data['current'],
        test_data['frequency'],
        test_data['timing_delay'],
        test_data['signal_strength'],
        test_data['temperature']
    ]])
    
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]
    probability = model.predict_proba(features_scaled)[0]
    
    return jsonify({
        'test_input': test_data,
        'prediction': 'FAULTY' if prediction == 1 else 'NORMAL',
        'confidence': f"{max(probability)*100:.2f}%"
    })

if __name__ == '__main__':
    import os
    # Grab the port Render assigns, or default to 5001 locally
    port = int(os.environ.get("PORT", 5001))
    
    print("\n🚀 Starting IC Fault Detector API...")
    print(f"📡 API running on port: {port}")
    
    # host="0.0.0.0" is the key that lets Render connect!
    app.run(host="0.0.0.0", port=port)