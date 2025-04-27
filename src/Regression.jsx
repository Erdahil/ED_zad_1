import "./Matrix.css";
import React, { useEffect, useState } from "react";

export default function Regression ({data, model})
{
    const [metrics, setMetrics] = useState({
        mae: 0,
        mape: 0,
        mse: 0,
        rmse: 0,
    });
    const [mCompare, setMCompare] = useState({
        mae: 0,
        mape: 0,
        mse: 0,
        rmse: 0,
    });

    useEffect(() => {
        if (data.length > 0) {
            const yTrue = [];
            const yPred = [];
            const yPredComp = [];
    
            data.forEach(row => {
                const rowArray = Object.values(row);
                yTrue.push(Number(rowArray[0]));
                yPred.push(Number(rowArray[model]));
                if(model === 1)
                {
                    yPredComp.push(Number(rowArray[2]));
                }
                else
                {
                    yPredComp.push(Number(rowArray[1]));
                }
            });

            let maeSum = 0;
            let mapeSum = 0;
            let mseSum = 0;

            let maeSumComp = 0;
            let mapeSumComp = 0;
            let mseSumComp = 0;

            for (let i = 0; i < yTrue.length; i++) 
            {
                const error = yTrue[i] - yPred[i];
                maeSum += Math.abs(error);
                mapeSum += Math.abs(error / (yTrue[i] || 1)); // Żeby nie dzielić przez 0 jak debil
                mseSum += error * error;
            }

            const n = yTrue.length;

            const mae = maeSum / n;
            const mape = (mapeSum / n) * 100;
            const mse = mseSum / n;
            const rmse = Math.sqrt(mse);

            setMetrics({
                mae: mae.toFixed(4),
                mape: mape.toFixed(4),
                mse: mse.toFixed(4),
                rmse: rmse.toFixed(4),
            });
        }
    }, [data, model]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Wskaźniki regresji modelu {model}</h2>
            <div className="params">
                <div className="param">MAE: {metrics.mae}</div>
                <div className="param">MAPE: {metrics.mape}%</div>
                <div className="param">MSE: {metrics.mse}</div>
                <div className="param">RMSE: {metrics.rmse}</div>
            </div>
        </div>
    );
}