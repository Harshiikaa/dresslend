import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        user: null,
    });

    useEffect(() => {
        // Get user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setAuth({
                isLoggedIn: true,
                user: storedUser,
            });
        }
    }, []);

    const checkAuth = () => {
        if (!auth.isLoggedIn) {
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


// import React, { createContext, useState, useEffect } from 'react';

// // Create the AuthContext
// export const AuthContext = createContext();

// // AuthProvider component
// const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({
//         isLoggedIn: false,
//         user: null,
//     });

//     useEffect(() => {
//         // Get user data from local storage
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         if (storedUser) {
//             setAuth({
//                 isLoggedIn: true,
//                 user: storedUser,
//             });
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


