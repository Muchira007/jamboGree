import { useState } from 'react';
import { useCreateUser } from '../../hooks/usersHooks'; // Adjust the path if necessary
import './users.scss';
import { ColDef } from 'ag-grid-community'; // Import the ColDef type from 'ag-grid-community'

interface AddProps {
  slug: string;
  columns: ColDef[]; // Use ColDef instead of GridColDef
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (newUser: User) => void;
}

interface User {
  national_id: number;
  email: string;
  first_name: string;
  second_name: string;
  sur_name: string;
  phone_num: string;
  password: string;
}

const Add = ({ slug, columns, setOpen }: AddProps) => {
  const [newUser, setNewUser] = useState<User>({
    national_id: 0,
    email: '',
    first_name: '',
    second_name: '',
    sur_name: '',
    phone_num: '',
    password: '',
  });

  const { mutate, isError, isSuccess, error } = useCreateUser()!;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: name === 'national_id' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove the leading '+' from phone number if present
    const formattedUser = {
      ...newUser,
      phone_num: newUser.phone_num.replace(/^\+/, ''),
    };
    mutate(formattedUser); // Send the new user data to the endpoint
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
            .filter((item) => item.field !== 'ID') // Adjust if needed
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type === 'number' ? 'number' : 'text'}
                  name={column.field}
                  value={newUser[column.field as keyof User] as string}
                  onChange={handleInputChange}
                  placeholder={column.headerName}
                />
              </div>
            ))}
          <button type="submit">
            Send
          </button>
          {isError && <p className="error">Error creating user: {error.message}</p>}
          {isSuccess && <p className="success">User created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Add;
