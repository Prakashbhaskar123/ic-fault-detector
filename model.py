import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import pickle
import json

def train_model():
    print("🔄 Loading circuit data...")
    data = pd.read_csv('circuit_data.csv')
    
    # Features and target
    features = ['voltage', 'current', 'frequency', 
                'timing_delay', 'signal_strength', 'temperature']
    X = data[features]
    y = data['fault']
    
    print(f"📊 Total samples: {len(data)}")
    print(f"   Normal circuits: {len(data[data['fault']==0])}")
    print(f"   Faulty circuits: {len(data[data['fault']==1])}")
    
    # Split 80% training, 20% testing
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"\n📚 Training samples: {len(X_train)}")
    print(f"🧪 Testing samples: {len(X_test)}")
    
    # Scale the numbers
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest
    print("\n🤖 Training Random Forest...")
    print("   100 decision trees voting...")
    
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    # Test accuracy
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\n✅ Training Complete!")
    print(f"🎯 Accuracy: {accuracy * 100:.2f}%")
    print("\n📊 Detailed Results:")
    print(classification_report(y_test, y_pred,
          target_names=['Normal ✅', 'Faulty ❌']))
    
    # Feature importance
    importance = dict(zip(features,
                    model.feature_importances_))
    
    print("⚡ Which signals matter most?")
    for feat, imp in sorted(importance.items(),
                            key=lambda x: x[1],
                            reverse=True):
        bar = "█" * int(imp * 50)
        print(f"   {feat:20s}: {bar} {imp:.4f}")
    
    # Save everything
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    
    model_info = {
        'accuracy': float(accuracy),
        'features': features,
        'feature_importance': {
            k: float(v) for k, v in importance.items()
        },
        'training_samples': len(X_train),
        'testing_samples': len(X_test)
    }
    
    with open('model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print("\n💾 Saved: model.pkl")
    print("💾 Saved: scaler.pkl")
    print("💾 Saved: model_info.json")
    print("\n🚀 Ready to detect IC faults!")
    
    return model, scaler, accuracy

if __name__ == "__main__":
    train_model()