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
          /*console.log(data);
    
          data.forEach(row => {
            const actual = row[0];// === "<=50K" ? 0 : 1; // Faktyczne Y
            const predicted = row[model === 1 ? 1 : 3];// === "<=50K" ? 0 : 1; // Przewidywane Y
    
            newConfusionMatrix[actual][predicted]++;
          });
    
          setConfusionMatrix(newConfusionMatrix);
        }*/

          data.forEach(row => {
            const rowArray = Object.values(row);
            //console.log(row["income"], row[1], row[2], row[3], row[4]);
            // Sprawdzamy, czy wiersz zawiera odpowiednie wartości w odpowiednich kolumnach
            const actual = Number(rowArray[0]);   // Faktyczne Y, czyli 0 lub 1
            const predicted = Number(rowArray[model === 1 ? 1 : 3]); // Przewidywane Y (0 lub 1)

            
            // Aktualizuj macierz tylko dla wybranego modelu
            
            if ((actual === 0 || actual === 1) && (predicted === 0 || predicted === 1)) {
                newConfusionMatrix[actual][predicted]++;
            } else {
                console.log(`Pominięto wiersz - nieprawidłowe wartości: actual=${actual}, predicted=${predicted}`);
            }
            
            // Upewniamy się, że actual i predicted są poprawnymi wartościami (0 lub 1)
            /*if (actual === 0 || actual === 1) {
                if (predicted === 0 || predicted === 1) {
                    newConfusionMatrix[actual][predicted]++;
                }
            }*/
           /*
                if ((actual === 0 || actual === 1) && (predicted === 0 || predicted === 1)) {
                    newConfusionMatrix[actual][predicted]++;
                } else {
                    console.log(`Błędne dane: actual=${actual}, predicted=${predicted}`); // Jeśli są błędne dane, logujemy
                }*/
        });
        

        setConfusionMatrix(newConfusionMatrix);
    }

    }, [data, model]);


    
  
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
  