import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { Product } from '../../types';
import './add.scss';

interface AddProps {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (newProduct: Product) => void;
}

const Add = ({ slug, columns, setOpen, onSave }: AddProps) => {
  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    color: '',
    price: 0,
    producer: '',
    createdAt: '',
    inStock: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(newProduct);
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
            .filter((item) => item.field !== 'id' && item.field !== 'img')
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === 'boolean' ? (
                  <input
                    type="checkbox"
                    name={column.field}
                    checked={newProduct[column.field as keyof Product] as boolean}
                    onChange={handleCheckboxChange}
                  />
                ) : (
                  <input
                    type={column.type === 'number' ? 'number' : 'text'}
                    name={column.field}
                    value={newProduct[column.field as keyof Product] as string}
                    onChange={handleInputChange}
                    placeholder={column.field}
                  />
                )}
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
