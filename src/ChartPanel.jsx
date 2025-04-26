import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from "recharts";
  
const dummyData = [
    { x: 1, y: 10 },
    { x: 2, y: 30 },
    { x: 3, y: 20 },
    { x: 4, y: 50 },
];
  
export default function ChartPanel({ title }) 
{
  return (
    <div className="bg-white shadow rounded-xl p-4" style={{ height: "300px" }}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div style={{ height: "240px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}