import { useState } from "react";
import Papa from "papaparse";
import "./CsvUploader.css";

export default function CsvUploader({ model }) 
{
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data;

        const processedData = rawData.map(row => {
          const entries = Object.entries(row);
          const newRow = {};

          entries.forEach(([key, value], index) => {
            if ([0, 1, 3].includes(index)) {
              if (value === "<=50K") {
                newRow[key] = 0;
              } else if (value === ">50K") {
                newRow[key] = 1;
              } else {
                newRow[key] = value;
              }
            } else {
              newRow[key] = value;
            }
          });

          return newRow;
        });

        setData(processedData);
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

      {data.length > 0 && (
        <table className="csv-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, idx) => (
                <th key={idx}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
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
