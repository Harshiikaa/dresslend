import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import blankProfile from '../../assets/images/blankProfile.png'
import { getSingleUserApi, updateUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const EditMyProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userImage, setUserImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
        getSingleUserApi(user._id).then((res) => {
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setPhoneNumber(res.data.user.phoneNumber);
            setEmail(res.data.user.email);
            setUserImage(res.data.user.userImage);
            setOldImage(res.data.user.userImage);
        });
    }, [user._id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('previewImage', previewImage);
        formData.append('userImage', userImage);
        // formData.append('oldImage', oldImage);

        updateUserApi(user._id, formData)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message);
                    setPreviewImage(URL.createObjectURL(userImage));
                    navigate('/myProfile');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => {
                toast.error('Server Error');
            });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setUserImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Set previewImage immediately
    };



    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* <!-- Profile Photo --> */}
            <div class="w-40 h-40 rounded-full overflow-hidden mb-4">
                {/* {userImage ? (
                    <img src={userImage} className='object-fit-cover rounded-3' height={200} width={200} alt='Profile' />
                ) : (
                    <img src={blankProfile} className='object-fit-cover rounded-3' height={200} width={200} alt='Placeholder' />
                )}
                <hr /> */}
                {/* <h6>Old image</h6> */}
                {oldImage ? (
                    <img src={oldImage} className='object-fit-cover rounded-3' height={200} width={200} alt='' />
                ) : (
                    <img src={blankProfile} className='object-fit-cover rounded-3' height={200} width={200} alt='' />
                )}
                <hr />
                {previewImage && (
                    <>
                        <h6 className='mt-3'>New image</h6>
                        <img src={previewImage} className='object-fit-cover rounded-3' height={200} width={200} alt='' />
                    </>
                )}
            </div>
            {/* <button class="mb-8 bg-white text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-200">Upload Photo</button> */}
            <input onChange={handleImageUpload} type="file" className="form-control mb-2" />

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

                <div class="flex justify-center">
                    <button onClick={handleSubmit} class="bg-blue-500 text-white py-2 px-6 rounded mt-4 hover:bg-blue-600">
                        SAVE
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditMyProfile
