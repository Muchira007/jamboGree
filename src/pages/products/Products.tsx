import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import { Product } from '../../types';
import './products.scss';
import { useAddProduct, useGetAllProducts } from '../../hooks/producthooks';
import { fetchAndPrintPDF, fetchAndPrintExcel } from '../../services/fileExecutions';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 90 },
  // {
  //   field: 'ImageData',
  //   headerName: 'Image',
  //   width: 100,
  //   renderCell: (params) => {
  //     const imageUrl = params.row.ImageData || '/noavatar.png';
  //     return <img src={imageUrl} alt="Product" style={{ width: '100%', height: 'auto' }} />;
  //   },
  // },
  { field: 'Name', headerName: 'Name', width: 250 },
  { field: 'Description', headerName: 'Description', width: 150 },
  { field: 'Price', headerName: 'Price', width: 200 },
  { field: 'Quantity', headerName: 'Quantity', width: 200 },
  { field: 'Color', headerName: 'Color', width: 200 },
  { field: 'CreatedAt', headerName: 'Created At', width: 200 },
  { field: 'UpdatedAt', headerName: 'Updated At', width: 200 },
  { field: 'DeletedAt', headerName: 'Deleted At', width: 200 },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetAllProducts();
  const addProductMutation = useAddProduct();

  console.log("Products data:", data); // Debugging line to check the products data

  // Extract posts from the data object
  const posts = data?.posts || []; // Use optional chaining to safely access posts

  // Transform the products data to match the expected format
  const transformedProducts = posts.map((product: Product) => ({
    id: product.ID,
    ImageData: product.ImageData || '/noavatar.png', // Default image if ImageData is null
    Name: product.Name,
    Description: product.Description,
    Price: product.Price,
    Quantity: product.Quantity,
    Color: product.Color,
    CreatedAt: product.CreatedAt,
    UpdatedAt: product.UpdatedAt,
    DeletedAt: product.DeletedAt,
  }));

  const handleAddProduct = (newProduct: Product, imageFile?: File) => {
    addProductMutation.mutate(
      { product: newProduct, imageFile },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    setOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    console.log("Delete product with ID:", id);
    // Implement delete functionality if needed
  };

  const handlePrintPDF = async () => {
    try {
      // Fetch the PDF URL from your API
      const response = await axios.post('http://localhost:3000/download-pdf');
      const { pdfUrl } = response.data; // Assuming your API returns a URL to the PDF file
  
      // Fetch and print the PDF
      await fetchAndPrintPDF(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF URL:', error);
    }
  };
  
  const handleDownloadExcel = () => {
    // Fetch the Excel URL from your API
    axios.post('http://localhost:3000/download-excel')
      .then(response => {
        const { excelUrl } = response.data;
        fetchAndPrintExcel(excelUrl);
      })
      .catch(error => {
        console.error('Error fetching Excel URL:', error);
      });
  };

  if (isLoading) {
    console.log("Loading products...");
    return <div>Loading...</div>;
  }
  if (error) {
    console.error("Error loading products:", error);
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
        <button onClick={handlePrintPDF}>Download PDF</button> {/* Button for PDF */}
        <button onClick={handleDownloadExcel}>Download Excel Report</button> {/* Button for Excel */}
      </div>
      <DataTable 
        slug="products" 
        colums={columns} // Fixed typo from colums to columns
        rows={transformedProducts} 
        onDelete={handleDeleteProduct} 
        getRowId={(row: Product) => row.ID}
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} onSave={handleAddProduct} />}
    </div>
  );
};

export default Products;
