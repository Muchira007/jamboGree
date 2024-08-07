import React from 'react';
import BarChartBox from '../../components/barChartBox/BarChartBox';
import BigChartBox from '../../components/bigChartBox/BigChartBox';
import ChartBox from '../../components/chartBox/ChartBox';
import MapDistribution from '../../components/MapComponent/mapDistribution';
import PieChartBox from '../../components/pieChartBox/PieChartBox';
import Topbox from '../../components/topBox/Topbox';

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxRevenue,
  chartBoxUser,
} from '../../data';
import './home.scss';
import { useTotalProducts } from '../../components/apiFunctions/productsApi';

const Home = () => {
  const { data: totalProducts, error, isLoading } = useTotalProducts();

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // Prepare props for ChartBox
  const chartBoxProductProps = {
    color: '#8884d8', // Example color, replace with actual color
    icon: '/productIcon.svg', // Update with the path to your icon
    title: 'Total Products',
    dataKey: 'totalProducts',
    number: totalProducts?.toString() ?? '', // Convert to string or use empty string if totalProducts is undefined
    percentage: 0, // Adjust based on your needs or calculate percentage
    chartData: [] // Empty array or provide actual chart data if available
  };

  return (
    <div className="home">
      {/* .box.box$*10{box$} */}
      <div className="box box1">
        <Topbox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProductProps} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      {/* <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div> */}
      {/* <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div> */}
      <div className="box box7">
        <BigChartBox />
      </div>
      {/* <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div> */}
      {/* <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
      <div className="box box10">
        <MapDistribution />
      </div>
    </div>
  );
};

export default Home;
