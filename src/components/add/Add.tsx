import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { Product } from '../../types';
import './add.scss';

interface AddProps {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (newProduct: Product, imageFile?: File | undefined) => void;
}

const Add = ({ slug, columns, setOpen, onSave }: AddProps) => {
  const [newProduct, setNewProduct] = useState<Product>({
    ID: 0,
    Name: '',
    Description: '',
    Price: 0,
    Quantity: 0,
    Color: '',
    ImageData: null,
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  });
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting product:', newProduct);
    console.log('With image file:', imageFile);
  
    onSave(newProduct, imageFile); // Pass the image file along with product data
  };
  
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== 'ID' && item.field !== 'ImageData' && item.field !== 'CreatedAt' && item.field !== 'UpdatedAt' && item.field !== 'DeletedAt')
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type === 'number' ? 'number' : 'text'}
                  name={column.field}
                  value={newProduct[column.field as keyof Product] as string}
                  onChange={handleInputChange}
                  placeholder={column.headerName}
                />
              </div>
            ))}
          <div className="item">
            <label>Image</label>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

