// src/utils/transformData.ts
interface SalesData {
    gender: string;
    count: number;
  }
  
  export const transformSalesData = (data: SalesData[]) => {
    return data.map(item => ({
      name: item.gender,
      value: item.count,
      color: item.gender === 'Male' ? '#0088FE' : '#00C49F' // Customize colors based on gender
    }));
  };
  