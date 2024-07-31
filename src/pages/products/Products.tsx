import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import { Product } from '../../types';
import './products.scss';
import { useAddProduct } from '../../hooks/producthooks';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    width: 250,
  },
  {
    field: 'description',
    type: 'string',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'price',
    type: 'number',
    headerName: 'Price',
    width: 200,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 200,
  },
  {
    field: 'color',
    headerName: 'Color',
    type: 'string',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    type: 'string',
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const addProductMutation = useAddProduct();

  const handleAddProduct = (newProduct: Product, imageFile?: File) => {
    addProductMutation.mutate(
      { product: newProduct, imageFile },
      {
        onSuccess: (addedProduct) => {
          setProducts((prevProducts) => [...prevProducts, addedProduct]);
        },
      }
    );
    setOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" colums={columns} rows={products} onDelete={handleDeleteProduct} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} onSave={handleAddProduct} />}
    </div>
  );
};

export default Products;
