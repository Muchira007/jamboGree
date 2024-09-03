import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import { Product } from '../../types';
import './products.scss';
import { useAddProduct, useGetAllProducts, useUpdateProduct } from '../../hooks/producthooks';
import { fetchAndPrintPDF, fetchAndPrintExcel } from '../../services/fileExecutions';
import axios from 'axios';
import EditProductModal from '../../components/modals/EditProductModal';

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'Name', headerName: 'Name', width: 250 },
  { field: 'Description', headerName: 'Description', width: 150 },
  { field: 'Price', headerName: 'Price', width: 200 },
  { field: 'Quantity', headerName: 'Quantity', width: 200 },
  { field: 'Color', headerName: 'Description', width: 200 },
  { field: 'CreatedAt', headerName: 'Created At', width: 200 },
  { field: 'UpdatedAt', headerName: 'Updated At', width: 200 },
  { field: 'DeletedAt', headerName: 'Deleted At', width: 200 },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, error, isLoading, refetch } = useGetAllProducts();
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();

  const posts = data?.posts || [];

  const transformedProducts = posts.map((product: Product) => ({
    id: product.ID,
    ImageData: product.ImageData || '/noavatar.png',
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

  const handleEditProduct = (updatedProduct: Product) => {
    if (selectedProduct) {
      updateProductMutation.mutate({ id: selectedProduct.ID, product: updatedProduct }, {
        onSuccess: () => {
          refetch();
          setEditModalOpen(false);
        },
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    // Implement delete functionality if needed
  };

  const handlePrintPDF = async () => {
    try {
      const response = await axios.post('http://localhost:3000/download-pdf');
      const { pdfUrl } = response.data;
      await fetchAndPrintPDF(pdfUrl);
    } catch (error) {
      console.error('Error fetching PDF URL:', error);
    }
  };

  const handleDownloadExcel = () => {
    axios.post('http://localhost:3000/download-excel')
      .then(response => {
        const { excelUrl } = response.data;
        fetchAndPrintExcel(excelUrl);
      })
      .catch(error => {
        console.error('Error fetching Excel URL:', error);
      });
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
        <button onClick={handlePrintPDF}>Download PDF</button>
        <button onClick={handleDownloadExcel}>Download Excel Report</button>
      </div>
      <DataTable 
        slug="products" 
        columns={columns}
        rows={transformedProducts} 
        onDelete={handleDeleteProduct} 
        onEdit={handleOpenEditModal} 
        showEditButton={true}
        getRowId={(row: Product) => row.ID}
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} onSave={handleAddProduct} />}
      {editModalOpen && selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
