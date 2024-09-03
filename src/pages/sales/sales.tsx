import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable'; // Data table component
import { Sales } from '../../types'; // Sales type
import './sales.scss';
import { useGetAllSales } from '../../hooks/salesHooks'; // Custom hook for sales

const columns: GridColDef[] = [
    { field: 'ID', headerName: 'ID', width: 90 },
    { field: 'ProductName', headerName: 'Product Name', width: 250 },
    { field: 'CustomerName', headerName: 'Customer Name', width: 250 },
    { field: 'CustomerPhoneNumber', headerName: 'Customer Phone Number', width: 200 },
    // { field: 'CustomerNationalID', headerName: 'Customer National ID', width: 200 },
    { field: 'Quantity', headerName: 'Quantity', width: 150 },
    { field: 'Total', headerName: 'Total', width: 200 },
    { field: 'DateOfSale', headerName: 'Date of Sale', width: 200 },
    { field: 'PaymentOption', headerName: 'Payment Option', width: 200 },
    { field: 'StatusOfAccount', headerName: 'Status', width: 200 },
];

const SalesRecorded = () => {
    const [open, setOpen] = useState(false);
    const { data, error, isLoading } = useGetAllSales();

    console.log("Sales data:", data); // Debugging line to check the sales data

    // Extract sales from the data object
    const sales = data?.sales || [];

    // Transform the sales data to match the expected format
    const transformedSales = sales.map((sale) => ({
        id: sale.ID,
        ProductName: sale.Product.Name,
        CustomerName: sale.Customer.Name,
        CustomerPhoneNumber: sale.Customer.PhoneNumber, // Add phone number
        CustomerNationalID: sale.Customer.NationalID, // Add ID number
        Quantity: sale.Quantity,
        Total: sale.Total,
        DateOfSale: new Date(sale.DateOfSale).toLocaleString(), // Format date
        PaymentOption: sale.PaymentOption,
        StatusOfAccount: sale.StatusOfAccount,
    }));

    if (isLoading) {
        console.log("Loading sales...");
        return <div>Loading...</div>;
    }
    if (error) {
        console.error("Error loading sales:", error);
        return <div>Error loading sales: {error.message}</div>;
    }

    return (
        <div className="sales">
            <h1>Sales</h1>
            <DataTable 
                slug="sales"
                columns={columns}
                rows={transformedSales}
                getRowId={(row) => row.id}
                onDelete={(id) => console.log('Delete:', id)} // Implement your delete logic
            />
        </div>
    );
};

export default SalesRecorded;
