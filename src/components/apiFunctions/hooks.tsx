import React from 'react';
import ChartBox from '../chartBox/ChartBox';

const YourComponent: React.FC = () => {
    const { data: totalProducts, error, isLoading } = useTotalProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching total products</p>;

    // Prepare props for ChartBox
    const chartBoxProps = {
        color: '#8884d8', // Example color
        icon: 'path/to/your/icon.png', // Update with the path to your icon
        title: 'Total Products',
        dataKey: 'totalProducts',
        number: totalProducts,
        percentage: 0, // Adjust based on your needs or calculate percentage
        chartData: [] // Empty array or provide actual chart data if available
    };

    return (
        <div className="box box3">
            <ChartBox {...chartBoxProps} />
        </div>
    );
};

export default YourComponent;
