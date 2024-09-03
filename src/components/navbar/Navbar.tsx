import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { MdDashboard, MdAccountCircle } from 'react-icons/md';
import { Menu, MenuItem, IconButton, Modal, TextField, Button, Box, Typography } from '@mui/material';
import './navbar.scss';
import { updateUser } from '../../services/usersapi';

// Define the type for the user data
interface User {
  id: number;
  national_id?: number;
  email?: string;
  first_name?: string;
  second_name?: string;
  sur_name?: string;
  phone_num?: string;
}

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User | null>(null); // User state
  const [formValues, setFormValues] = useState({
    national_id: '',
    email: '',
    first_name: '',
    second_name: '',
    sur_name: '',
    phone_num: '',
  });

  // Retrieve user data from session storage on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("User Data on Mount:", parsedUser); // Log the user data on mount
      setUser({
        id: parsedUser.ID,
        national_id: parsedUser.NationalID,
        email: parsedUser.Email,
        first_name: parsedUser.FirstName,
        second_name: parsedUser.SecondName,
        sur_name: parsedUser.SurName,
        phone_num: parsedUser.PhoneNum,
      });
    } else {
      console.log("No user data found in sessionStorage.");
    }
  }, []);

  // Function to update user data in session storage
  const updateUserInSession = (updatedUser: User) => {
    console.log("Updating user in session:", updatedUser); // Log the updated user data before storing in session
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Handle user updates using mutation
  const handleUserUpdate = async (updatedData: Partial<User>) => {
    if (!user?.id) throw new Error('User ID not available');
    
    console.log("Attempting to update user with data:", updatedData); // Log the data being sent for update
    
    try {
      const updatedUser = await updateUser(user.id, updatedData);
      console.log("User updated successfully:", updatedUser); // Log the updated user data
      updateUserInSession(updatedUser); // Update session storage
      setOpenModal(false);
    } catch (error) {
      console.error('Error updating user details:', error); // Log any errors encountered
    }
  };

  const handleLogout = () => {
    console.log("Logging out user."); // Log logout action
    sessionStorage.removeItem('user'); // Clear user data from session
    Cookies.remove('authToken'); // Clear the auth token if it's stored
    window.location.href = '/login'; // Redirect to the login page
  };

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    // Populate the form with existing user details
    if (user) {
      setFormValues({
        national_id: user.national_id?.toString() || '',
        email: user.email || '',
        first_name: user.first_name || '',
        second_name: user.second_name || '',
        sur_name: user.sur_name || '',
        phone_num: user.phone_num || '',
      });
    }
    console.log("Opening modal with form values:", formValues); // Log the form values when opening the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal."); // Log modal close action
    setOpenModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log("Form values updated:", { ...formValues, [e.target.name]: e.target.value }); // Log the updated form values
  };

  const handleSubmit = () => {
    // Filter out empty values
    const filteredFormValues = Object.fromEntries(
      Object.entries(formValues).filter(([_, value]) => value !== '')
    );

    console.log("Submitting form with filtered values:", filteredFormValues); // Log the form values being submitted

    handleUserUpdate({
      national_id: filteredFormValues.national_id ? parseInt(filteredFormValues.national_id) : undefined,
      email: filteredFormValues.email || undefined,
      first_name: filteredFormValues.first_name || undefined,
      second_name: filteredFormValues.second_name || undefined,
      sur_name: filteredFormValues.sur_name || undefined,
      phone_num: filteredFormValues.phone_num || undefined,
    });
  };

  return (
    <div className="navbar">
      <div className="logo">
        <MdDashboard style={{ fontSize: '2rem', marginBottom: '8px' }} />
        <span style={{ fontSize: '24px', color: '#333' }}>Dashboard</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="user">
          {!user ? (
            <span>Loading...</span>
          ) : (
            <>
              <IconButton onClick={handleUserClick}>
                <MdAccountCircle style={{ color: 'green', fontSize: '2rem' }} />
              </IconButton>
              <span>{user.first_name || 'User'}</span>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleOpenModal}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>

      {/* Modal for user settings */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid #ddd',
            borderRadius: '20px', // High border radius
            boxShadow: 3, // Border shadow
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            User Settings
          </Typography>
          <TextField
            label="National ID"
            name="national_id"
            value={formValues.national_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="first_name"
            value={formValues.first_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Second Name"
            name="second_name"
            value={formValues.second_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Surname"
            name="sur_name"
            value={formValues.sur_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_num"
            value={formValues.phone_num}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
