import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from '../pages/Auth/Login'; // Adjust the import path accordingly

const UserRoutes = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        if (!storedUser) {
            toast.error("You must be logged in to access this page.");
            setShowModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
            {user ? <Outlet /> : null}
            {showModal && <Login isOpen={showModal} onClose={handleCloseModal} />}
        </>
    );
};

export default UserRoutes;


// import React from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'

// const UserRoutes = () => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     const navigate = useNavigate()
//     return user != null ? <Outlet /> : navigate('/login')
// }

// export default UserRoutes
