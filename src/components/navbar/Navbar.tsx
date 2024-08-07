import React from 'react';
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; // Import the 'Cookies' module
import './navbar.scss';

// Define the type for the user data
interface User {
  FirstName?: string;
  // Add other fields if necessary
}

// Function to fetch user data from the cache with proper typing
const fetchUserFromCache = (queryClient: QueryClient): User => {
  const cachedUser = queryClient.getQueryData<User>(['user']);
  if (!cachedUser) {
    throw new Error('User data not found in cache');
  }
  return cachedUser;
};

const Navbar: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch user data from React Query cache
  const { data: user, error, isLoading } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => fetchUserFromCache(queryClient),
    enabled: !!Cookies.get('authToken'), // Only run if the auth token exists
  });

  // Log the query key and the user data
  console.log('Query Key:', ['user']);
  console.log('User Data:', user);
  console.log('Error:', error);
  console.log('Loading:', isLoading);

  const handleLogout = () => {
    // Clear user data from React Query cache
    queryClient.removeQueries(['user']); // Clear user data from cache
    Cookies.remove('authToken'); // Clear the auth token if it's stored

    // Redirect to the login page
    window.location.href = '/login'; // Adjust the URL to your login page or home page
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <span>Dashboard</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="user">
          {isLoading ? (
            <span>Loading...</span> // Show loading state
          ) : error ? (
            <span>Error loading user data</span> // Show error state
          ) : (
            <>
              <span>{user?.FirstName || 'User'}</span> {/* Use user.FirstName */}
            </>
          )}
          {/* Logout Button - Always displayed */}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
