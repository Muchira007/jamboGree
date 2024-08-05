import React, { useEffect, useState } from 'react';
import { useFetchAllUsers } from '../../hooks/usersHooks';
import DataTable from '../../components/dataTable/DataTable'; // Adjust the path to your DataTable component
import Add from './addUser'; // Adjust the path to your Add component

interface User {
  national_id: number;
  email: string;
  first_name: string;
  second_name: string;
  sur_name: string;
  phone_num: string;
  password: string; // Include password here but not in the table
}


const Users = () => {
  const [open, setOpen] = useState(false);
  const { data: users, status, error } = useFetchAllUsers();

  const columns = [
  { field: 'national_id', headerName: 'National ID', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'second_name', headerName: 'Second Name', width: 150 },
  { field: 'sur_name', headerName: 'Surname', width: 150 },
  { field: 'phone_num', headerName: 'Phone Number', width: 150 },
  // { field: 'password', headerName: 'Password', width: 150 },
  // Add other columns if needed
];


const userRows = users?.map((user) => ({
  id: user.NationalID,
  email: user.Email,
  first_name: user.FirstName,
  second_name: user.SecondName,
  sur_name: user.SurName,
  phone_num: user.PhoneNum,
})) || [];

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* {status === 'loading' && <p>Loading...</p>} */}
      {status === 'error' && <p>Error fetching users: {error.message}</p>}
      {status === 'success' && (
        <DataTable slug="users" colums={columns} rows={userRows} onDelete={handleDelete} />
      )}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} onSave={handleSave} />}
    </div>
  );
};

const handleSave = (newUser: User) => {
  // Implement save logic here, e.g., call a mutation to create the user
};

const handleDelete = (userId: string) => {
  // Implement delete logic here, e.g., call a mutation to delete the user
};

export default Users;
