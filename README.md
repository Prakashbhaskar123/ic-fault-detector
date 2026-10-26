<div align="center">

# ⚡ IC Fault Detector

### AI-Powered Integrated Circuit Fault Detection using Machine Learning

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://ic-fault-detector-6b9g9386b-electrosphere.vercel.app)
[![API](https://img.shields.io/badge/Backend%20API-Live-green?style=for-the-badge&logo=render)](https://ic-fault-detector.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Prakashbhaskar123/ic-fault-detector)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🌟 About The Project

**IC Fault Detector** is a machine learning web application that analyzes the electrical parameters of an integrated circuit and detects whether it is faulty — along with the likely fault type, a confidence score, and recommended fixes.

In the semiconductor industry, chip testing is expensive and time-consuming. Companies use ML-assisted analysis to catch defective ICs early. This project is a simplified, accessible web-based take on that idea, built by combining **VLSI domain knowledge** with **machine learning and full-stack development**.

> 💡 **Why this project?** Existing industrial tools (Siemens Tessent, Synopsys TetraMAX, Cadence Modus) are enterprise-only and expensive. This project demonstrates the same core concept — ML-based fault detection — in a free, browser-based tool anyone can try.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [ic-fault-detector-6b9g9386b-electrosphere.vercel.app](https://ic-fault-detector-6b9g9386b-electrosphere.vercel.app) |
| ⚙️ Backend API | [ic-fault-detector.onrender.com](https://ic-fault-detector.onrender.com) |

> ⚠️ **Note:** The backend runs on Render's free tier and sleeps after 15 minutes of inactivity. The first request may take ~50 seconds to wake up.

---

## ✨ Features

- 🔬 **ML-Powered Detection** — Random Forest classifier trained on 1000 circuit samples
- 📊 **6 Electrical Parameters** analyzed together:
  - Voltage (V)
  - Current (A)
  - Frequency (MHz)
  - Timing Delay (ns)
  - Signal Strength
  - Temperature (°C)
- 🎯 **Confidence Score** — shows how sure the model is about its prediction
- 🧭 **Fault Classification** — identifies the likely fault type:
  - ⏱️ Timing Violation
  - ⚡ Voltage Fault
  - 🔌 Overcurrent Fault
  - 🔥 Thermal Fault
  - 📡 Signal Integrity Fault
  - 📉 Frequency Fault
- 🕸️ **Circuit Health Radar** — visual radar chart of all 6 signals
- ✅ **Per-Signal Analysis** — shows each parameter against its normal range
- 🔧 **Actionable Recommendations** — suggested debugging steps for each fault type
- ⚡ **Quick Fill Buttons** — instantly load sample normal/faulty circuit values
- 🎨 **Animated UI** — smooth transitions with Framer Motion

---

## 🧠 How It Works

```
User enters 6 circuit parameters
            ↓
React frontend sends data → Flask API (POST /predict)
            ↓
StandardScaler normalizes the inputs
            ↓
Random Forest (100 decision trees) votes
            ↓
Prediction + confidence score computed
            ↓
Fault type identified from abnormal signals
            ↓
Result displayed with charts & recommendations
```

### Why Random Forest?

Random Forest is an ensemble of many decision trees, each voting on the outcome. It is robust to noise, handles multiple features well, and provides **feature importance** — telling us which signals matter most.

### Feature Importance (from trained model)

| Signal | Importance |
|---|---|
| ⏱️ Timing Delay | **35.6%** |
| 🔌 Current | 23.5% |
| ⚡ Voltage | 17.6% |
| 📶 Signal Strength | 15.3% |
| 🌡️ Temperature | 7.8% |
| 📡 Frequency | 0.2% |

> 🎓 Timing delay being the top feature aligns with real VLSI practice, where **Static Timing Analysis (STA)** is one of the most critical sign-off checks.

---

## 🛠️ Tech Stack

### Machine Learning & Backend
| Technology | Purpose |
|---|---|
| **Python 3** | Core language |
| **Scikit-learn** | Random Forest model, StandardScaler |
| **Pandas** | Dataset handling |
| **NumPy** | Numerical operations |
| **Flask** | REST API server |
| **Flask-CORS** | Cross-origin request handling |
| **Gunicorn** | Production WSGI server |

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI framework |
| **Vite** | Build tool & dev server |
| **Framer Motion** | Animations |
| **Recharts** | Radar chart visualization |
| **Axios** | HTTP requests to Flask API |

### Deployment
| Service | Usage |
|---|---|
| **Vercel** | Frontend hosting |
| **Render** | Flask backend hosting |
| **GitHub** | Version control & auto-deploy |

---

## 📁 Project Structure

```
ic-fault-detector/
│
├── 📄 app.py                  # Flask API (predict, test, model-info routes)
├── 📄 model.py                # Model training script
├── 📄 data_generator.py       # Synthetic circuit dataset generator
├── 📄 circuit_data.csv        # Generated dataset (1000 samples)
├── 📄 model.pkl               # Trained Random Forest model
├── 📄 scaler.pkl              # Fitted StandardScaler
├── 📄 model_info.json         # Accuracy & feature importance
├── 📄 requirements.txt        # Python dependencies
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 pages/
    │   │   ├── Home.jsx       # Landing page
    │   │   ├── Analyzer.jsx   # Parameter input page
    │   │   └── Result.jsx     # Results & charts page
    │   ├── App.jsx            # Page routing logic
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Prakashbhaskar123/ic-fault-detector.git
cd ic-fault-detector
```

### 2. Set up the backend
```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Generate data & train the model
```bash
python data_generator.py
python model.py
```
This creates `circuit_data.csv`, `model.pkl`, `scaler.pkl`, and `model_info.json`.

### 4. Run the Flask API
```bash
python app.py
```
API runs at `http://localhost:5001`

### 5. Run the frontend
Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

> 📝 **Note:** For local development, set `API_URL` in `frontend/src/pages/Analyzer.jsx` to `http://localhost:5001`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check — returns status & accuracy |
| `POST` | `/predict` | Analyze circuit parameters |
| `GET` | `/test` | Run a sample faulty-circuit prediction |
| `GET` | `/model-info` | Model accuracy & feature importance |

### Example Request

```bash
POST /predict
Content-Type: application/json

{
  "voltage": 2.1,
  "current": 1.2,
  "frequency": 85,
  "timing_delay": 18,
  "signal_strength": 0.5,
  "temperature": 54
}
```

### Example Response

```json
{
  "status": "FAULT DETECTED",
  "is_faulty": true,
  "fault_type": "Timing Violation",
  "confidence": 100.0,
  "description": "Signal arrived too late — setup/hold time violated.",
  "recommendations": [
    "Check setup and hold time margins",
    "Review clock tree synthesis",
    "Consider reducing clock frequency",
    "Inspect critical timing paths"
  ],
  "model_accuracy": "100.00%"
}
```

---

## 📊 Dataset

The dataset is **synthetically generated** (`data_generator.py`) because real chip test data is confidential and not publicly available.

| Property | Normal Circuit | Faulty Circuit |
|---|---|---|
| Voltage | ~3.3 V | ~2.1 V |
| Current | ~0.5 A | ~1.2 A |
| Frequency | ~100 MHz | ~85 MHz |
| Timing Delay | ~10 ns | ~18 ns |
| Signal Strength | ~0.9 | ~0.5 |
| Temperature | ~25 °C | ~45 °C |

- **Total samples:** 1000 (500 normal + 500 faulty)
- **Train / Test split:** 80% / 20%
- **Distributions:** Gaussian, with different means and variances per class

---

## ⚠️ Limitations & Honest Notes

- **Synthetic data:** The model is trained on simulated data, so the 100% accuracy reflects clearly separated classes — not real-world chip performance. Real data is noisier, and accuracy would be lower.
- **Fault type is rule-based:** The model predicts *faulty vs. normal*. The specific fault type (e.g. Timing Violation) is determined by threshold rules on the input values, not by a multi-class ML model.
- **Educational purpose:** This is a learning and demonstration project, not a production chip-testing tool.

---

## 🔮 Future Improvements

- [ ] Multi-class ML model that predicts the fault type directly
- [ ] Upload CSV/waveform files for batch analysis
- [ ] Train on real or benchmark data (e.g. ISCAS circuits)
- [ ] Add model comparison (SVM, Gradient Boosting, Neural Network)
- [ ] Explainability using SHAP values
- [ ] Downloadable PDF analysis report
- [ ] Analysis history with database storage

---

## 🎯 What I Learned

- Applying machine learning to a VLSI/semiconductor problem
- Training and evaluating a Random Forest classifier with scikit-learn
- Building and deploying a REST API with Flask
- Connecting a React frontend to a Python ML backend
- Handling CORS and production deployment issues
- Deploying an ML app on Vercel + Render

---

## 👨‍💻 Author

**Penta Leela Prakash**

[![GitHub](https://img.shields.io/badge/GitHub-Prakashbhaskar123-black?style=flat-square&logo=github)](https://github.com/Prakashbhaskar123)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-leela--prakash--penta-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/leela-prakash-penta)
[![Email](https://img.shields.io/badge/Email-pentaleelaprakash@gmail.com-red?style=flat-square&logo=gmail)](mailto:pentaleelaprakash@gmail.com)

> B.Tech ECE | Vishnu Institute of Technology 
> VLSI Enthusiast × Machine Learning × Full Stack Developer

---

<div align="center">

**⭐ If you found this project interesting, consider giving it a star!**

Made with ❤️ by [Penta Leela Prakash](https://github.com/Prakashbhaskar123)

</div>
