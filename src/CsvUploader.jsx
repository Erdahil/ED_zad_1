import { useState } from "react";
import Papa from "papaparse";
import "./CsvUploader.css";

export default function CsvUploader({ onDataLoaded }) 
{
  const [visibleData, setVisibleData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data;

        const processedData = rawData.map(row => {
          const entries = Object.entries(row).map(([key, value]) => {
            if (value === "<=50K") return [key, 0];
            if (value === ">50K") return [key, 1];
            return [key, value];
          });
          return Object.fromEntries(entries);
        });

        setVisibleData(rawData);

        if (onDataLoaded) {
          onDataLoaded({ rawData, processedData });
        }
      },
    });
  };

  return (
    <div className="csv-container">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input"
      />

      {visibleData.length > 0 && (
        <table className="csv-table">
          <thead>
            <tr>
              {Object.keys(visibleData[0]).map((key, idx) => (
                <th key={idx}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((val, colIndex) => (
                  <td key={colIndex}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
