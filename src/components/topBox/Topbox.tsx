import React, { useEffect, useState } from 'react';
import './topbox.scss';
import { fetchAllUsers } from '../../services/usersapi';

// Define a user type based on your data structure
interface User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    NationalID: number;
    Email: string;
    FirstName: string;
    SecondName: string;
    SurName: string;
    PhoneNum: string;
    Password: string;
    ResetToken: string;
    ResetTokenExpiry: string;
}

const Topbox: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 5;

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Calculate the index range for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="topBox">
            <h1>Top Users</h1>
            <div className="list">
                {currentUsers.map((user) => (
                    <div className="listItem" key={user.ID}>
                        <div className="userTexts">
                            <span className="username">{`${user.FirstName} ${user.SecondName}`}</span>
                            <span className="email">{user.Email}</span>
                            <span className="phone">{user.PhoneNum}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Topbox;
