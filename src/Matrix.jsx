import "./Matrix.css";
import React from 'react';

export default function Matrix({ data, model }) {
    const confusionMatrix = [
      [0, 0],
      [0, 0],
    ];

    if (data.length > 0) {
        data.forEach(row => {
          const actual = parseInt(Object.values(row)[0]); // kolumna 0 - income
          const predicted = parseInt(Object.values(row)[model]); // kolumna 1 dla model=1, kolumna 3 dla model=2
    
          if (!isNaN(actual) && !isNaN(predicted)) {
            confusionMatrix[actual][predicted]++;
          }
        });
      }
  
    return (
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
    );
  }
  