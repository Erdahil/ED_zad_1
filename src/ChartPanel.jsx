import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from "recharts";

import React, { useState, useEffect } from 'react';
import "./Matrix.css";
  
export default function ChartPanel({ title, data, model }) 
{
  const [fpr, setFpr] = useState([]);
  const [tpr, setTpr] = useState([]);
  const [rocData, setRocData] = useState([]);
  const [auc, setAuc] = useState(0);

  useEffect(() => {
    if (data.length > 0) {

      const yTrue = [];
      const yScores = [];

      data.forEach(row => {
        const rowArray = Object.values(row);
        yTrue.push(Number(rowArray[0]));
        yScores.push(Number(rowArray[model === 1 ? 2 : 4]));
      });

      const rocPoints = [];
      let aucValue = 0;

      for (let threshold = 0; threshold <= 1.0001; threshold += 0.05) {
        let tp = 0, fp = 0, tn = 0, fn = 0;

        yTrue.forEach((actual, index) => {
          const predicted = yScores[index] >= threshold ? 1 : 0;

          if (actual === 1 && predicted === 1) tp++;
          if (actual === 0 && predicted === 1) fp++;
          if (actual === 0 && predicted === 0) tn++;
          if (actual === 1 && predicted === 0) fn++;
        });

        const tpr = tp / (tp + fn) || 0;
        const fpr = fp / (fp + tn) || 0;

        rocPoints.push({ fpr, tpr });

        if (rocPoints.length > 1) {
          const prevPoint = rocPoints[rocPoints.length - 2];
          const currPoint = rocPoints[rocPoints.length - 1];
          aucValue += (currPoint.fpr - prevPoint.fpr) * (prevPoint.tpr + currPoint.tpr) / 2;
        }
      }

      setRocData(rocPoints);
      setAuc(aucValue); 
      //console.log("roc:");
      //console.log(rocPoints);
    }
  }, [data, model]);

  return (
    <div className="bg-white shadow rounded-xl p-4" style={{ height: "300px" }}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div style={{ height: "240px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rocData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis type="number" dataKey="fpr" domain={[0, 1]} />
          <YAxis type="number" domain={[0, 1]} />
          <Tooltip />
          <Line type="monotone" dataKey="tpr" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      </div>
      <div className="params">
        <div className="param">
          <span className="label">AUC:</span>
          <span className="value">
            {auc.toFixed(4)*-1}
          </span>
        </div>
      </div>
    </div>
  );
}