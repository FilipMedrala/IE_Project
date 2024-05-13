import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import sugarIntake from './data/sugar_consumption.json';

function FoodConsumption() {
  const [yearVisibility, setYearVisibility] = useState({
    '2018-19 (%)': true,
    '2019-20 (%)': true,
    '2020-21 (%)': true,
    '2021-22 (%)': true, 
    '2022-23 (%)': true
  });

  const handleYearFilterChange = (event) => {
    const { name, checked } = event.target;
    setYearVisibility(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Free Sugar Contributions by Food Group: 2018-2023
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {Object.entries(yearVisibility).map(([year, isVisible]) => (
          <label key={year} style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              name={year}
              checked={isVisible}
              onChange={handleYearFilterChange}
            />
            {year}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={sugarIntake}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis type="number" tick={{ fontSize: 14, fill: '#333' }} tickFormatter={(tick) => `${tick}%`} />
          <YAxis type="category" dataKey="Sub-major food group" tick={{ fontSize: 14, fill: '#333' }} width={150} interval={0} />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
            content={({ payload, label, active }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc' }}>
                    <p>{label}</p>
                    {payload.map((entry, index) => (
                      <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}%
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend verticalAlign="top" align="right" height={36} />
          <ReferenceLine
            x={10}
            stroke="red"
            strokeDasharray="5 5"
            strokeOpacity={0.9}
            strokeWidth={3}
            label={{
              position: 'right',
              value: 'WHO Recommendation (<10%)',
              fill: 'red',
              fontSize: 14,
              fontWeight: 'bold'
            }}
          />
          {Object.entries(yearVisibility)
            .filter(([, isVisible]) => isVisible)
            .map(([year], index) => (
              <Bar
                key={year}
                dataKey={year}
                fill={['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'][index % 5]}
                name={year}
                barSize={100}  // Adjusted bar size
              />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FoodConsumption;
