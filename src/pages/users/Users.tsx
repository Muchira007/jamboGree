import React, { useState } from 'react';
import { useFetchAllUsers } from '../../hooks/usersHooks';
import DataTable from '../../components/dataTable/DataTable';
import Add from './addUser';

interface User {
  national_id: number;
  email: string;
  first_name: string;
  second_name: string;
  sur_name: string;
  phone_num: string;
  password: string;
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
      {status === 'error' && <p>Error fetching users: {error.message}</p>}
      {status === 'success' && (
        <DataTable 
          slug="users" 
          columns={columns} 
          rows={userRows} 
          onDelete={handleDelete} 
          onEdit={handleEdit} // Pass the onEdit handler
          showEditButton={true} // Show edit button on this page
        />
      )}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} onSave={handleSave} />}
    </div>
  );
};

const handleSave = (newUser: User) => {
  // Implement save logic here
};

const handleDelete = (userId: string) => {
  // Implement delete logic here
};

const handleEdit = (id: number) => {
  // Implement edit logic here
};

export default Users;
