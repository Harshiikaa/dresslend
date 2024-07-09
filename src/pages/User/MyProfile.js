import React, { useEffect, useState } from 'react'
import { deleteUserApi, getSingleUserApi } from '../../apis/Api';
import { Link, useNavigate } from 'react-router-dom';
import blankProfile from '../../assets/images/blankProfile.png'
import { toast } from 'react-toastify';


const MyProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id);
    const id = user.id;

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userImage, setUserImage] = useState(null);


    useEffect(() => {
        getSingleUserApi(user._id).then((res) => {
            console.log(res.data);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setPhoneNumber(res.data.user.phoneNumber);
            setEmail(res.data.user.email);
            setUserImage(res.data.user.userImage);

        });
    }, [user]);

    // const handleDeleteUser = (id) => {
    //     const confirmDialog = window.confirm('Are you sure, you want to delete your account?')
    //     if (!confirmDialog) {
    //         return;
    //     }
    //     else {
    //         deleteUserApi(id).then((res) => {
    //             if (res.data.success == true) {
    //                 window.location.reload()
    //                 localStorage.clear();
    //                 toast.success(res.data.success)
    //                 navigate('/')
    //             }
    //             else {
    //                 toast.error(res.data.message)
    //             }

    //         })
    //     }
    // }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* <!-- Profile Photo --> */}
            <div class="w-40 h-40 rounded-full overflow-hidden mb-4">
                {userImage ? (
                    <img src={userImage} className='object-fit-cover rounded-3' height={200} width={200} alt='Profile' />
                ) : (
                    <img src={blankProfile} className='object-fit-cover rounded-3' height={200} width={200} alt='Placeholder' />
                )}
                <hr />
            </div>
            {/* <!-- Form --> */}
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first-name">
                            First Name
                        </label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="first-name" type="text" placeholder="First Name" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="last-name">
                            Last Name
                        </label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Last Name" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="contact-number">
                            Contact Number
                        </label>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="contact-number" type="text" placeholder="Contact Number" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                            Email
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email" />
                    </div>



                </div>
                {/* <div className="items-center"> */}
                <Link to="/editMyProfile" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </Link>
                {/* <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button> */}
                {/* </div> */}
            </form>
        </div>
    )
}

export default MyProfile
