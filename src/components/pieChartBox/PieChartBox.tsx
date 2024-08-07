import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchSalesByGender } from '../apiFunctions/salesApi'; // Update the import path if needed
import { transformSalesData } from '../apiFunctions/utility'; // Update the import path if needed
import './pieChartBox.scss';

const PieChartBox: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchSalesByGender();
        console.log('API Response:', response); // Log the raw response
        const transformedData = transformSalesData(response.data); // Adjust based on actual API response structure
        console.log('Transformed Data:', transformedData); // Log the transformed data
        setData(transformedData);
      } catch (error) {
        console.error('Error loading sales data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="pieChartBox">
      <h1>Gender Distribution</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
