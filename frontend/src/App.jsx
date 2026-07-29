import { useState } from 'react'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Result from './pages/Result'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [result, setResult] = useState(null)
  const [inputData, setInputData] = useState(null)

  const goToAnalyzer = () => setPage('analyzer')
  const goToHome = () => setPage('home')

  const handleResult = (data, inputs) => {
    setResult(data)
    setInputData(inputs)
    setPage('result')
  }

  return (
    <div className="app">
      {page === 'home' && (
        <Home onStart={goToAnalyzer} />
      )}
      {page === 'analyzer' && (
        <Analyzer
          onResult={handleResult}
          onBack={goToHome}
        />
      )}
      {page === 'result' && (
        <Result
          result={result}
          inputData={inputData}
          onBack={goToHome}
          onAnalyzeAgain={() => setPage('analyzer')}
        />
      )}
    </div>
  )
}

export default App