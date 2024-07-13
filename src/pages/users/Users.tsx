// import { GridColDef } from '@mui/x-data-grid';
// import { useState } from 'react';
// import Add from '../../components/add/Add';
// import DataTable from '../../components/dataTable/DataTable';
// import { userRows } from '../../data';
// import './users.scss';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'img',
//     headerName: 'Avatar',
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || '/noavatar.png'} alt="" />;
//     },
//   },
//   {
//     field: 'firstName',
//     type: 'string',
//     headerName: 'First name',
//     width: 150,
//   },
//   {
//     field: 'lastName',
//     type: 'string',
//     headerName: 'Last name',
//     width: 150,
//   },
//   {
//     field: 'email',
//     type: 'string',
//     headerName: 'Email',
//     width: 200,
//   },
//   {
//     field: 'phone',
//     type: 'string',
//     headerName: 'Phone',
//     width: 200,
//   },
//   {
//     field: 'createdAt',
//     headerName: 'Created At',
//     width: 200,
//     type: 'string',
//   },
//   {
//     field: 'verified',
//     headerName: 'Verified',
//     width: 150,
//     type: 'boolean',
//   },
// ];
// const Users = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="users">
//       <div className="info">
//         <h1>Users</h1>
//         <button onClick={() => setOpen(true)}>Add New User</button>
//       </div>
//       <DataTable slug="users" colums={columns} rows={userRows} />
//       {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from 'react';
import { useFetchAllUsers } from '../../services/apiServices'; // Adjust the path as per your project structure
import DataTable from '../../components/dataTable/DataTable'; // Adjust the path to your DataTable component
import Add from '../../components/add/Add'; // Adjust the path to your Add component

const Users = () => {
  const [open, setOpen] = useState(false);
  const { mutate: fetchAllUsers, data: users, status, error } = useFetchAllUsers();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add more columns as needed
  ];

  const userRows = users?.map((user, index) => ({
    id: index,
    name: user.name,
    email: user.email,
    // Map more fields as needed
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
        <DataTable slug="users" colums={columns} rows={userRows} />
      )}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
