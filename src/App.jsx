import { useState } from 'react'
import './App.css'
import CsvUploader from "./CsvUploader";
import ChartPanel from "./ChartPanel";
import Matrix from "./Matrix";

function App() {

  const [activeModel, setActiveModel] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  //const [csvData, setCsvData] = useState([]); 
  const [processedData, setProcessedData] = useState([]);

  const handleDataLoaded = ({ rawData, processedData}) => {
    setVisibleData(rawData);
    setProcessedData(processedData);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">CSV Viewer + Wykresy</h1>
      
      {/* wybor modelu */}
      <div className="toggle-buttons">
        <button
          onClick={() => setActiveModel(1)}
          className={`toggle-btn ${activeModel === 1 ? "active" : ""}`}
        >
          Model klasyfikacyjny
        </button>

        <button
          onClick={() => setActiveModel(2)}
          className={`toggle-btn ${activeModel === 2 ? "active" : ""}`}
        >
          Model regresyjny
        </button>
      </div>
      
      <div className="main-flex">
        {/* lewa strona */}
        <div className="">
          <CsvUploader onDataLoaded = {handleDataLoaded}/>
        </div>

        {/* model 1 */}
        <div className="flex flex-col gap-4">
          <ChartPanel title="Wykres modelu 1" />
          {activeModel === 1 ? <Matrix data={processedData} model={1}/> : <ButtonGrid />}
        </div>
        {/* model 2 */}
        <div className="flex flex-col gap-4">
          <ChartPanel title="Wykres modelu 2" />
          {activeModel === 1 ? <Matrix data={processedData} model={2}/> : <ButtonGrid />}
        </div>
      </div>
    </div>
  );
}

// Komponent ButtonGrid: 3x3 przyciski
function ButtonGrid() {
  return (
    <div className="matrix">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {[...Array(3)].map((_, colIndex) => (
            <button key={colIndex} className="matrix-cell">
              {/* Puste przyciski */}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;