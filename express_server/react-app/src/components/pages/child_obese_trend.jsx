import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import obeseTrend from './data/obese_trend.json';

function ChildObeseTrend() {
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(2006); // Start from 2006
  const [isAnimating, setIsAnimating] = useState(false);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const transformedData = obeseTrend.map(info => ({
      entity: info.Entity || '',
      year: parseInt(info.Year, 10) || 0,
      prevalence: parseFloat(info['Prevalence of overweight among children and adolescents']) || 0
    }));
    setData(transformedData);

    // Generate and set fixed colors for entities
    const entityColors = {};
    const entities = [...new Set(transformedData.map(d => d.entity))];
    entities.forEach((entity, index) => {
      entityColors[entity] = `hsl(${index * 30}, 70%, 50%)`; // Fixed color based on index
    });
    setColors(entityColors);
  }, []);

  const groupedData = data.reduce((acc, cur) => {
    if (!acc[cur.year]) {
      acc[cur.year] = {};
    }
    acc[cur.year][cur.entity] = cur.prevalence;
    return acc;
  }, {});

  let chartData = Object.keys(groupedData).map(year => {
    const entry = { year };
    Object.keys(groupedData[year]).forEach(entity => {
      entry[entity] = groupedData[year][entity];
    });
    return entry;
  }).filter(entry => entry.year >= 2006 && (currentYear === null || entry.year <= currentYear));

  // Sort chart data by year
  chartData = chartData.sort((a, b) => a.year - b.year);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentYear(year => {
          const nextYear = year + 1;
          const maxYear = Math.max(...data.map(d => d.year));
          if (nextYear > maxYear) {
            setIsAnimating(false);
            clearInterval(interval);
            return maxYear;
          }
          return nextYear;
        });
      }, 100); // Adjust time as needed
    }
    return () => clearInterval(interval);
  }, [isAnimating, data]);

  function handlePlay() {
    if (!isAnimating && currentYear < Math.max(...data.map(d => d.year))) {
      setCurrentYear(2006); // Start from 2006 if not already started
      setIsAnimating(true);
    }
  }

  function handleReset() {
    setIsAnimating(false);
    setCurrentYear(2006); // Reset to 2006
  }

  // Custom tooltip component that shows the country name and orders by highest percentage
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Sort payload by value in descending order
      const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`Year: ${label}`}</p>
          {sortedPayload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>{`${entry.name}: ${entry.value}%`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Prevalence of Overweight among Children and Adolescents</h2>
      <button
      onClick={handlePlay}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50', // Green color for "Play"
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px', // Adds space between the buttons
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Adds a subtle shadow
      }}
    >
      Play
    </button>
    <button
      onClick={handleReset}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#F44336', // Red color for "Reset"
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Adds a subtle shadow
      }}
    >
      Reset
    </button>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <XAxis dataKey="year" />
          <YAxis domain={[10, 45]} tickFormatter={value => `${value}%`} /> {/* Limit y-axis to 50 */}
          <Tooltip content={<CustomTooltip />} />
          {Object.keys(colors).map(entity => (
            <Line key={entity} type="monotone" dataKey={entity} name={entity} stroke={colors[entity]}>
              <Label
                position="top"
                content={({ x, y, stroke, index, payload, viewBox }) => {
                  // Only show label for the last entry in the data array
                  if (index === chartData.length - 1) {
                    return (
                      <text x={viewBox.width + 35} y={y} fill={stroke} fontSize={12} textAnchor="end">
                        {payload.entity}
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChildObeseTrend;
