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
        maeC: 0,
        mapeC: 0,
        mseC: 0,
        rmseC: 0,
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
                const errorComp = yTrue[i] - yPredComp[i];
                
                maeSum += Math.abs(error);
                mapeSum += Math.abs(error / (yTrue[i] || 1));
                mseSum += error * error;

                maeSumComp += Math.abs(errorComp);
                mapeSumComp += Math.abs(errorComp / (yTrue[i] || 1));
                mseSumComp += errorComp * errorComp;
            }

            const n = yTrue.length;
            const nComp = n;

            const mae = maeSum / n;
            const mape = (mapeSum / n) * 100;
            const mse = mseSum / n;
            const rmse = Math.sqrt(mse);

            const maeC = maeSumComp / nComp;
            const mapeC = (mapeSumComp / nComp) * 100;
            const mseC = mseSumComp / nComp;
            const rmseC = Math.sqrt(mseC);

            setMetrics({
                mae: mae,
                mape: mape,
                mse: mse,
                rmse: rmse,

            });

            setMCompare({
                maeC: maeC,
                mapeC: mapeC,
                mseC: mseC,
                rmseC: rmseC,
            });
        }
    }, [data, model]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Wskaźniki regresji modelu {model}</h2>
            <div className="params">
                <div className="param">
                    <span className="label">MAE:</span>
                    <span className={`value ${ 
                        metrics.mae <= mCompare.maeC ? 'highlight-better' : 'highlight-worse'}`}>
                        {
                            metrics.mae.toFixed(4)
                        }
                    </span>
                </div>
                <div className="param">
                    <span className="label">MAPE:</span>
                    <span className={`value ${ 
                        metrics.mape <= mCompare.mapeC ? 'highlight-better' : 'highlight-worse'}`}>
                        {
                            metrics.mape.toFixed(4)
                        }
                    </span>
                </div>
                <div className="param">
                    <span className="label">MSE:</span>
                    <span className={`value ${ 
                        metrics.mse <= mCompare.mseC ? 'highlight-better' : 'highlight-worse'}`}>
                        {
                            metrics.mse.toFixed(4)
                        }
                    </span>
                </div>
                <div className="param">
                    <span className="label">RMSE:</span>
                    <span className={`value ${ 
                        metrics.rmse <= mCompare.rmseC ? 'highlight-better' : 'highlight-worse'}`}>
                        {
                            metrics.rmse.toFixed(4)
                        }
                    </span>
                </div>

            </div>
        </div>
    );
}