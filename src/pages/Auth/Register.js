import React, { useState } from 'react';
import { UserIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon, XIcon, PhoneIcon } from '@heroicons/react/outline';
import { registerUserApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter'; // Ensure the path is correct

const Register = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
        setFirstNameError(validateFirstName(e.target.value));
    };
    const changeLastName = (e) => {
        setLastName(e.target.value);
        setLastNameError(validateLastName(e.target.value));
    };
    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
        setPhoneNumberError(validatePhoneNumber(e.target.value));
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError(validateEmail(e.target.value));
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
    };

    const validateFirstName = (name) => {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(name) ? '' : 'First name must contain only letters.';
    };

    const validateLastName = (name) => {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(name) ? '' : 'Last name must contain only letters.';
    };

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email) ? '' : 'Please enter a valid email address.';
    };

    const validatePhoneNumber = (number) => {
        const pattern = /^\d{10}$/;
        return pattern.test(number) ? '' : 'Phone number must be 10 digits long.';
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        return pattern.test(password) ? '' : 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstNameError = validateFirstName(firstName);
        const lastNameError = validateLastName(lastName);
        const emailError = validateEmail(email);
        const phoneNumberError = validatePhoneNumber(phoneNumber);
        const passwordError = validatePassword(password);

        setFirstNameError(firstNameError);
        setLastNameError(lastNameError);
        setEmailError(emailError);
        setPhoneNumberError(phoneNumberError);
        setPasswordError(passwordError);

        if (firstNameError || lastNameError || emailError || phoneNumberError || passwordError) {
            return;
        }

        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        };
        registerUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);

                    // Show server-side error if needed
                } else {
                    // Handle successful registration
                    toast.success(res.data.message);
                    onClose();
                    navigate('/');
                }
            })
            .catch((err) => {
                // Handle server error if needed
                console.log(err.message);
            });
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                <div className="relative w-full max-w-md h-full md:h-auto">
                    <div className="bg-white rounded-3xl shadow relative">
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                onClick={onClose}
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form className="space-y-4 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
                            <h3 className="text-3xl font-medium text-gray-900 text-center">
                                Register your account
                            </h3>
                            <h2 className="text-2xl font-medium text-gray-900 text-center">
                                for better experience
                            </h2>
                            <div className="relative">
                                <div className="flex items-center">
                                    <div className="absolute left-3 h-5 w-5 text-gray-400">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={changeFirstName}
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className={`bg-gray-50 border ${firstNameError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10`}
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
                            </div>

                            <div className="relative">
                                <div className="flex items-center">
                                    <div className="absolute left-3 h-5 w-5 text-gray-400">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={changeLastName}
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className={`bg-gray-50 border ${lastNameError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10`}
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                                {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
                            </div>
                            <div className="relative">
                                <div className="flex items-center">
                                    <div className="absolute left-3 h-5 w-5 text-gray-400">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={changePhoneNumber}
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className={`bg-gray-50 border ${phoneNumberError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10`}
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>
                                {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
                            </div>
                            <div className="relative">
                                <div className="flex items-center">
                                    <div className="absolute left-3 h-5 w-5 text-gray-400">
                                        <MailIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={changeEmail}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={`bg-gray-50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10`}
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                            </div>
                            <div className="relative">
                                <div className="flex items-center">
                                    <div className="absolute left-3 h-5 w-5 text-gray-400">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={changePassword}
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className={`bg-gray-50 border ${passwordError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10 pr-10`} // Adjust padding-right
                                        required
                                    />
                                    <div
                                        className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer"
                                        onClick={handleTogglePassword}
                                    >
                                        {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                    </div>
                                </div>
                                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                                <PasswordStrengthMeter password={password} />
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default Register;


// import React, { useState } from 'react';
// import { UserIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon, XIcon, PhoneIcon } from '@heroicons/react/outline';
// import { toast } from 'react-toastify';
// import { registerUserApi } from '../../apis/Api';
// import { useNavigate } from 'react-router-dom';

// const PasswordStrengthMeter = ({ password }) => {
//     const calculatePasswordStrength = (password) => {
//         let score = 0;
//         if (password.length >= 8) score += 1;
//         if (/[A-Z]/.test(password)) score += 1;
//         if (/[a-z]/.test(password)) score += 1;
//         if (/\d/.test(password)) score += 1;
//         if (/[@$!%*?&#]/.test(password)) score += 1;
//         return score;
//     };

//     const score = calculatePasswordStrength(password);
//     const strength = ["Weak", "Fair", "Good", "Strong", "Very Strong"][score];

//     return (
//         <div className="password-strength-meter">
//             <div className={`strength-${score}`}>
//                 {strength}
//             </div>
//         </div>
//     );
// };

// const Register = ({ isOpen, onClose }) => {
//     const navigate = useNavigate();

//     const [showPassword, setShowPassword] = useState(false);
//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const changeFirstName = (e) => {
//         setFirstName(e.target.value);
//     };
//     const changeLastName = (e) => {
//         setLastName(e.target.value);
//     };
//     const changePhoneNumber = (e) => {
//         setPhoneNumber(e.target.value);
//     };
//     const changeEmail = (e) => {
//         setEmail(e.target.value);
//     };

//     const changePassword = (e) => {
//         setPassword(e.target.value);
//     };

//     const validateFirstName = (name) => {
//         const pattern = /^[A-Za-z]+$/;
//         if (!pattern.test(name)) {
//             return 'First name must contain only letters.';
//         }
//         return null;
//     };

//     const validateLastName = (name) => {
//         const pattern = /^[A-Za-z]+$/;
//         if (!pattern.test(name)) {
//             return 'Last name must contain only letters.';
//         }
//         return null;
//     };

//     const validateEmail = (email) => {
//         const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!pattern.test(email)) {
//             return 'Please enter a valid email address.';
//         }
//         return null;
//     };

//     const validatePhoneNumber = (number) => {
//         const pattern = /^\d{10}$/;
//         if (!pattern.test(number)) {
//             return 'Phone number must be 10 digits long.';
//         }
//         return null;
//     };

//     const validatePassword = (password) => {
//         const minLength = 8;
//         const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//         if (password.length < minLength) {
//             return `Password must be at least ${minLength} characters long.`;
//         }

//         if (!pattern.test(password)) {
//             return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
//         }

//         return null;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const firstNameError = validateFirstName(firstName);
//         const lastNameError = validateLastName(lastName);
//         const emailError = validateEmail(email);
//         const phoneNumberError = validatePhoneNumber(phoneNumber);
//         const passwordError = validatePassword(password);

//         if (firstNameError || lastNameError || emailError || phoneNumberError || passwordError) {
//             if (firstNameError) toast.error(firstNameError);
//             if (lastNameError) toast.error(lastNameError);
//             if (emailError) toast.error(emailError);
//             if (phoneNumberError) toast.error(phoneNumberError);
//             if (passwordError) toast.error(passwordError);
//             return;
//         }

//         const data = {
//             firstName: firstName,
//             lastName: lastName,
//             phoneNumber: phoneNumber,
//             email: email,
//             password: password,
//         };
//         registerUserApi(data)
//             .then((res) => {
//                 if (res.data.success === false) {
//                     toast.error(res.data.message);
//                 } else {
//                     toast.success(res.data.message);
//                     navigate('/');
//                 }
//             })
//             .catch((err) => {
//                 toast.error('Server Error');
//                 console.log(err.message);
//             });
//     };

//     return (
//         isOpen && (
//             <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
//                 <div className="relative w-full max-w-md h-full md:h-auto">
//                     <div className="bg-white rounded-3xl shadow relative">
//                         <div className="flex justify-end p-2">
//                             <button
//                                 type="button"
//                                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//                                 onClick={onClose}
//                             >
//                                 <XIcon className="w-5 h-5" />
//                             </button>
//                         </div>
//                         <form className="space-y-4 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
//                             <h3 className="text-3xl font-medium text-gray-900 text-center">
//                                 Register your account
//                             </h3>
//                             <h2 className="text-2xl font-medium text-gray-900 text-center">
//                                 for better experience
//                             </h2>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <UserIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeFirstName}
//                                     type="text"
//                                     name="firstName"
//                                     id="firstName"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="First Name"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <UserIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeLastName}
//                                     type="text"
//                                     name="lastName"
//                                     id="lastName"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Last Name"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <PhoneIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changePhoneNumber}
//                                     type="tel"
//                                     name="contactNumber"
//                                     id="contactNumber"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Contact Number"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <MailIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeEmail}
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Email"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     onChange={changePassword}
//                                     name="password"
//                                     id="password"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Password"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleTogglePassword}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                                 >
//                                     {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                                 </button>
//                                 <PasswordStrengthMeter password={password} />
//                             </div>

//                             <button
//                                 onClick={handleSubmit}
//                                 type="submit"
//                                 className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
//                             >
//                                 Register
//                             </button>

//                             <div className="text-sm font-medium text-gray-500 text-center">
//                                 Already have an account{' '}
//                                 <button
//                                     type="button"
//                                     className="text-blue-700 hover:underline focus:outline-none"
//                                 >
//                                     Login
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default Register;

// import React, { useState } from 'react';
// import { UserIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon, XIcon, PhoneIcon } from '@heroicons/react/outline';
// import { toast } from 'react-toastify';
// import { registerUserApi } from '../../apis/Api';
// import { useNavigate } from 'react-router-dom';

// const Register = ({ isOpen, onClose }) => {
//     const navigate = useNavigate();

//     // to view the password
//     const [showPassword, setShowPassword] = useState(false);
//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const changeFirstName = (e) => {
//         setFirstName(e.target.value);
//     };
//     const changeLastName = (e) => {
//         setLastName(e.target.value);
//     };
//     const changePhoneNumber = (e) => {
//         setPhoneNumber(e.target.value);
//     };
//     const changeEmail = (e) => {
//         setEmail(e.target.value);
//     };

//     const changePassword = (e) => {
//         setPassword(e.target.value);
//     };

//     const validatePassword = (password) => {
//         const minLength = 8;
//         const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Adjust this regex as needed

//         if (password.length < minLength) {
//             return `Password must be at least ${minLength} characters long.`;
//         }

//         // if (!pattern.test(password)) {
//         //     return 'Password must contain at least one letter and one number.';
//         // }

//         return null;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const passwordError = validatePassword(password);
//         if (passwordError) {
//             toast.error(passwordError);
//             return;
//         }

//         const data = {
//             firstName: firstName,
//             lastName: lastName,
//             phoneNumber: phoneNumber,
//             email: email,
//             password: password,
//         };
//         registerUserApi(data)
//             .then((res) => {
//                 if (res.data.success === false) {
//                     toast.error(res.data.message);
//                 } else {
//                     toast.success(res.data.message);
//                     navigate('/');
//                 }
//             })
//             .catch((err) => {
//                 toast.error('Server Error');
//                 console.log(err.message);
//             });
//     };

//     return (
//         isOpen && (
//             <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
//                 <div className="relative w-full max-w-md h-full md:h-auto">
//                     <div className="bg-white rounded-3xl shadow relative">
//                         <div className="flex justify-end p-2">
//                             <button
//                                 type="button"
//                                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//                                 onClick={onClose}
//                             >
//                                 <XIcon className="w-5 h-5" />
//                             </button>
//                         </div>
//                         <form className="space-y-4 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
//                             <h3 className="text-3xl font-medium text-gray-900 text-center">
//                                 Register your account
//                             </h3>
//                             <h2 className="text-2xl font-medium text-gray-900 text-center">
//                                 for better experience
//                             </h2>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <UserIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeFirstName}
//                                     type="text"
//                                     name="firstName"
//                                     id="firstName"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="First Name"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <UserIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeLastName}
//                                     type="text"
//                                     name="lastName"
//                                     id="lastName"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Last Name"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <PhoneIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changePhoneNumber}
//                                     type="tel"
//                                     name="contactNumber"
//                                     id="contactNumber"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Contact Number"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <MailIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     onChange={changeEmail}
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Email"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                     <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     onChange={changePassword}
//                                     name="password"
//                                     id="password"
//                                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
//                                     placeholder="Password"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleTogglePassword}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                                 >
//                                     {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                                 </button>
//                             </div>

//                             <button
//                                 onClick={handleSubmit}
//                                 type="submit"
//                                 className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
//                             >
//                                 Register
//                             </button>

//                             <div className="text-sm font-medium text-gray-500 text-center">
//                                 Already have an account{' '}
//                                 <button
//                                     type="button"
//                                     className="text-blue-700 hover:underline focus:outline-none"
//                                 >
//                                     Login
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )

//     );
// };

// export default Register;

