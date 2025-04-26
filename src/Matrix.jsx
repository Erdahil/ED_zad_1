import "./Matrix.css";
import React, { useState, useEffect } from 'react';

export default function Matrix({ data, model }) {
    const [confusionMatrix, setConfusionMatrix] = useState([
        [0, 0],
        [0, 0],
    ]);

    useEffect(() => {
        if (data.length > 0) {
          const newConfusionMatrix = [
            [0, 0],
            [0, 0],
          ];

          data.forEach(row => {
            const rowArray = Object.values(row);
            const actual = Number(rowArray[0]);
            const predicted = Number(rowArray[model === 1 ? 1 : 3]);

            
            
            if ((actual === 0 || actual === 1) && (predicted === 0 || predicted === 1)) {
                newConfusionMatrix[actual][predicted]++;
            } else {
                console.log(`Pominięto wiersz - nieprawidłowe wartości: actual=${actual}, predicted=${predicted}`);
            }
            
        });
        

        setConfusionMatrix(newConfusionMatrix);
    }

    }, [data, model]);


    
  
    return (
        <>
        <div className="confusion-matrix">
            <div className="top-title">Przewidywane Ŷ</div>
            <div className="matrix-content">
                <div className="left-title">Faktyczne Y</div>
                <div className="matrix-grid">
                    <div className="matrix-header-cell"></div>
                    <div className="matrix-header-cell">0</div>
                    <div className="matrix-header-cell">1</div>
        
                    {confusionMatrix.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="matrix-header-cell">{rowIndex}</div>
                        {row.map((num, colIndex) => (
                        <div key={colIndex} className="matrix-cell">
                            {num}
                        </div>
                        ))}
                    </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
        <div className="params">
            <div className="param">
                <span className="label">Trafność:</span>
                <span className="value">
                    {Math.round(((confusionMatrix[0][0]+confusionMatrix[1][1]) /
                    (confusionMatrix[0][0]+confusionMatrix[1][1]+confusionMatrix[1][0]+confusionMatrix[0][1])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Całkowity współczynnik błędu:</span>
                <span className="value">
                    {Math.round(((confusionMatrix[0][1]+confusionMatrix[1][0]) /
                    (confusionMatrix[0][0]+confusionMatrix[1][1]+confusionMatrix[1][0]+confusionMatrix[0][1])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Czułość:</span>
                <span className="value">
                    {Math.round((confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[1][0])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Wskaźnik fałszywie negatywnych:</span>
                <span className="value">
                    {Math.round((confusionMatrix[1][0] /
                    (confusionMatrix[1][1]+confusionMatrix[1][0])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Swoistość:</span>
                <span className="value">
                    {Math.round((confusionMatrix[0][0] /
                    (confusionMatrix[0][0]+confusionMatrix[0][1])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Wskaźnik fałszywie pozytywnych:</span>
                <span className="value">
                    {Math.round((confusionMatrix[0][1] /
                    (confusionMatrix[0][0]+confusionMatrix[0][1])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Precyzja:</span>
                <span className="value">
                    {Math.round((confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[0][1])).toFixed(4) * 10000)/100}%
                </span>
            </div>
            <div className="param">
                <span className="label">Wskaźnik F1:</span>
                <span className="value">
                    {Math.round(((2*(confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[1][0])) * (confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[0][1]))) / 
                    ((confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[1][0])) + 
                    (confusionMatrix[1][1] /
                    (confusionMatrix[1][1]+confusionMatrix[0][1])))).toFixed(4) * 10000)/100}%
                </span>
            </div>
        </div>

        </>
        
    );
  }
  