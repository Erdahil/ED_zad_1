import { useState } from 'react'
import './App.css'
import CsvUploader from "./CsvUploader";
import ChartPanel from "./ChartPanel";
import Matrix from "./Matrix";
import Regression from './Regression';

function App() {

  const [activeModel, setActiveModel] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  //const [csvData, setCsvData] = useState([]); 
  const [processedData, setProcessedData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataLoaded = ({ rawData, processedData}) => {
    //if (isDataLoaded) return;
    setVisibleData(rawData);
    setProcessedData(processedData);
    setIsDataLoaded(true);
    console.log("here");
    console.log(Object.keys(processedData[0]).length);
  };


  return (
    <div className="app-container">
      <h1 className="app-title">Zadanie programistyczne 2</h1>
      
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
        <div className="left-panel">
          <CsvUploader onDataLoaded={handleDataLoaded} />
        </div>

        {/* środek */}
        <div className="center-panel">
        {isDataLoaded && (
          <>
            {activeModel === 1 && processedData.length > 0 && Object.keys(processedData[0]).length === 5 && (
              <>
                <ChartPanel title="Model 1:" data={processedData} model={1} />
                <Matrix data={processedData} model={1} />
              </>
            )}
            {activeModel === 2 && processedData.length > 0 && Object.keys(processedData[0]).length === 3 && (
              <>
                <Regression data={processedData} model={1}/>
              </>
            )}
          </>
        )}
        </div>

        {/* prawa strona */}
        <div className="right-panel">
        {isDataLoaded && (
          <>
            {activeModel === 1 && processedData.length > 0 && Object.keys(processedData[0]).length === 5 && (
              <>
                <ChartPanel title="Model 2:" data={processedData} model={2} />
                <Matrix data={processedData} model={2} />
              </>
            )}
            {activeModel === 2 && processedData.length > 0 && Object.keys(processedData[0]).length === 3 && (
              <>
                <Regression data={processedData} model={2}/>
              </>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;