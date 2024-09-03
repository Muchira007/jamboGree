import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import { Customer } from '../../types';
import './customers.scss';
import { fetchAndPrintPDF, fetchAndPrintExcel } from '../../services/fileExecutions';
import axios from 'axios';
import { useGetAllCustomers } from '../../hooks/salesHooks';

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'Name', headerName: 'Name', width: 250 },
  { field: 'PhoneNumber', headerName: 'Phone', width: 150 },
  { field: 'Country', headerName: 'Country', width: 200 },
  { field: 'County', headerName: 'County', width: 200 },
  { field: 'Subcounty', headerName: 'Subcounty', width: 200 },
  { field: 'Village', headerName: 'Village', width: 200 },
  { field: 'CreatedAt', headerName: 'Created At', width: 200 },
  { field: 'UpdatedAt', headerName: 'Updated At', width: 200 },
  { field: 'DeletedAt', headerName: 'Deleted At', width: 200 },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetAllCustomers();
  // const addCustomerMutation = useAddCustomer();

  console.log("Customers data:", data);

  // Extract customers from the data object
  const customers = data?.customers || [];

  // Transform the customers data to match the expected format
  const transformedCustomers = customers.map((customer: Customer) => ({
    id: customer.ID,
    Name: customer.Name,
    PhoneNumber: customer.PhoneNumber || 'N/A', // Default value if PhoneNumber is null
    Country: customer.Country || 'N/A', // Default value if Country is null
    County: customer.County || 'N/A', // Default value if County is null
    Subcounty: customer.Subcounty || 'N/A', // Default value if Subcounty is null
    Village: customer.Village || 'N/A', // Default value if Village is null
    CreatedAt: customer.CreatedAt,
    UpdatedAt: customer.UpdatedAt,
    DeletedAt: customer.DeletedAt,
  }));

  // const handleAddCustomer = (newCustomer: Customer) => {
  //   addCustomerMutation.mutate(newCustomer, {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });
  //   setOpen(false);
  // };

  const handleDeleteCustomer = (id: string) => {
    console.log("Delete customer with ID:", id);
    // Implement delete functionality if needed
  };

  const handlePrintPDF = async () => {
    try {
      const response = await axios.post('http://localhost:3000/download-customer-pdf');
      const { pdfUrl } = response.data;
      await fetchAndPrintPDF(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF URL:', error);
    }
  };

  const handleDownloadExcel = () => {
    axios.post('http://localhost:3000/download-customer-excel')
      .then(response => {
        const { excelUrl } = response.data;
        fetchAndPrintExcel(excelUrl);
      })
      .catch(error => {
        console.error('Error fetching Excel URL:', error);
      });
  };

  if (isLoading) {
    console.log("Loading customers...");
    return <div>Loading...</div>;
  }
  if (error) {
    console.error("Error loading customers:", error);
    return <div>Error loading customers: {error.message}</div>;
  }

  return (
    <div className="customers">
      <div className="info">
        <h1>Customers</h1>
        {/* <button onClick={() => setOpen(true)}>Add New Customer</button> */}
        {/* <button onClick={handlePrintPDF}>Download PDF</button>
        <button onClick={handleDownloadExcel}>Download Excel Report</button> */}
      </div>
      <DataTable 
        slug="customers" 
        columns={columns} 
        rows={transformedCustomers} 
        onDelete={handleDeleteCustomer} 
        onEdit={(id: number) => {
          // handle edit logic here
        }}
        getRowId={(row: Customer) => row.ID}
      />
      {/* {open && <Add slug="customer" columns={columns} setOpen={setOpen} onSave={handleAddCustomer} />} */}
    </div>
  );
};

export default Customers;