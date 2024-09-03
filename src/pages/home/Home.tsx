import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import BarChartBox from '../../components/barChartBox/BarChartBox';
import BigChartBox from '../../components/bigChartBox/BigChartBox';
import ChartBox from '../../components/chartBox/ChartBox';
import MapDistribution from '../../components/MapComponent/mapDistribution';
import PieChartBox from '../../components/pieChartBox/PieChartBox';
import Topbox from '../../components/topBox/Topbox';
import { useTotalProducts } from '../../components/apiFunctions/productsApi';
import './home.scss';
import { useGetAllCustomers } from '../../hooks/salesHooks';

// Dummy data generation for customer data
const generateDummyCustomerData = (range: string) => {
  const baseData = Array(30).fill(null).map((_, i) => ({
    date: `2023-07-${i + 1}`,
    value: Math.floor(Math.random() * 1000)
  }));

  const growthRate = Math.floor(Math.random() * 20) - 10; // Growth rate can be negative or positive
  const total = baseData.reduce((acc, item) => acc + item.value, 0); // Sum of all customer values

  return {
    chartData: baseData,
    total,
    growthRate,
  };
};

// Date range options
const dateRanges = {
  // lastWeek: 'Last Week',
  // oneMonth: '1 Month',
  // threeMonths: '3 Months',
  // halfYear: 'Half Year',
  // oneYear: '1 Year'
};

const Home = () => {
  const { data: totalProducts, error, isLoading } = useTotalProducts();
  const { data: customerData, error: customerError, isLoading: customerLoading } = useGetAllCustomers();
  // const [selectedRange, setSelectedRange] = useState(dateRanges.lastWeek);
  // const [customerData, setCustomerData] = useState(generateDummyCustomerData(dateRanges.lastWeek));

  // Update customer data when date range changes
  // useEffect(() => {
  //   const data = generateDummyCustomerData(selectedRange);
  //   setCustomerData(data);
  // }, [selectedRange]);

  // Handle loading and error states for products
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // Prepare chart props for products
  const chartBoxProductProps = {
    color: '#8884d8',
    icon: '/productIcon.svg',
    title: 'Total Products',
    number: totalProducts?.toString() ?? '0',
    percentage: 0,
    chartData: [], // Use appropriate product data if available
    dataKey: 'value',
    link: '/products', // Link to products page
  };

    // Prepare chart props for customers
    const chartBoxCustomerProps = {
      color: '#82ca9d',
      icon: '/customerIcon.svg', // Update the icon as needed
      title: 'Total Customers',
      number: customerData?.customers.length.toString() ?? '0', // Total number of customers
      percentage: 0,
      chartData: [], // Use appropriate customer data if available
      dataKey: 'value',
      link: '/customers', // Link to customers page
    };

  return (
    <div className="home">
      <div className="box box1">
        <Topbox />
      </div>
      <div className="box box2">
        {/* <Box sx={{ p: 3 }}> */}
          {/* <Typography variant="h6" gutterBottom>
            Total Customers
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {Object.keys(dateRanges).map((key) => (
              <Button
                key={key}
                variant={selectedRange === dateRanges[key] ? 'contained' : 'outlined'}
                onClick={() => setSelectedRange(dateRanges[key])}
              >
                {dateRanges[key]}
              </Button>
            ))}
          </Box> */}
          <ChartBox {...chartBoxCustomerProps} />
        {/* </Box> */}
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProductProps} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      {/* <div className="box box10">
        <MapDistribution />
      </div> */}
    </div>
  );
};

export default Home;


// import React from 'react';
// import BarChartBox from '../../components/barChartBox/BarChartBox';
// import BigChartBox from '../../components/bigChartBox/BigChartBox';
// import ChartBox from '../../components/chartBox/ChartBox';
// import MapDistribution from '../../components/MapComponent/mapDistribution';
// import PieChartBox from '../../components/pieChartBox/PieChartBox';
// import Topbox from '../../components/topBox/Topbox';

// import {
//   barChartBoxRevenue,
//   barChartBoxVisit,
//   chartBoxConversion,
//   chartBoxRevenue,
//   chartBoxUser,
// } from '../../data';
// import './home.scss';
// import { useTotalProducts } from '../../components/apiFunctions/productsApi';

// const Home = () => {
//   const { data: totalProducts, error, isLoading } = useTotalProducts();

//   // Handle loading and error states
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching data</div>;

//   // Prepare props for ChartBox
//   const chartBoxProductProps = {
//     color: '#8884d8', // Example color, replace with actual color
//     icon: '/productIcon.svg', // Update with the path to your icon
//     title: 'Total Products',
//     dataKey: 'totalProducts',
//     number: totalProducts?.toString() ?? '', // Convert to string or use empty string if totalProducts is undefined
//     percentage: 0, // Adjust based on your needs or calculate percentage
//     chartData: [] // Empty array or provide actual chart data if available
//   };

//   return (
//     <div className="home">
//       {/* .box.box$*10{box$} */}
//       <div className="box box1">
//         <Topbox />
//       </div>
//       <div className="box box2">
//         <ChartBox {...chartBoxUser} />
//       </div>
//       <div className="box box3">
//         <ChartBox {...chartBoxProductProps} />
//       </div>
//       <div className="box box4">
//         <PieChartBox />
//       </div>
//       {/* <div className="box box5">
//         <ChartBox {...chartBoxConversion} />
//       </div> */}
//       {/* <div className="box box6">
//         <ChartBox {...chartBoxRevenue} />
//       </div> */}
//       <div className="box box7">
//         <BigChartBox />
//       </div>
//       {/* <div className="box box8">
//         <BarChartBox {...barChartBoxVisit} />
//       </div> */}
//       {/* <div className="box box9">
//         <BarChartBox {...barChartBoxRevenue} />
//       </div> */}
//       <div className="box box10">
//         <MapDistribution />
//       </div>
//     </div>
//   );
// };

// export default Home;
