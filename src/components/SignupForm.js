// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function LoginForm() {
//     const [user, setUser] = useState([]);
//     async function getUserFromToken() {
//         try {
//             const response = await axios.get('http://localhost:3500/v1/user/get-user-from-token');
//             if (response.data.error == false) {
//                 setVendors(response.data.data.user);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             throw error;
//         }
//     }

//     useEffect(() => {
//         // Fetch data here
//         getUserFromToken()
//     }, []);
//     const [formData, setFormData] = useState({
//         email: null,
//         password: null,
//         // Add more fields as needed
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             // Send form data to the backend API
//             await loginUser(formData);
//         } catch (error) {
//             // Handle any errors
//             console.error(error);
//         }
//     };

//     const loginUser = async (formData) => {
//         try {
//             // Make an HTTP POST request to your API endpoint
//             const response = await axios.post('http://localhost:3500/v1/user/login-user', formData);

//             // Handle the API response
//             console.log('API Response:', response.data.data);
//         } catch (error) {
//             // Handle any API request errors
//             console.error('API Request Error:', error);
//         }
//     };

//     return (
//         <div>
//             <h3>Data Fields: </h3>
//             <form onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                     <label htmlFor="productName" className="col-sm-2 col-form-label">
//                         Product Name
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="productName"
//                             id='productName'
//                             className="col-sm-2 col-form-label"
//                             value={formData.ProductName}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="quantity" className="col-sm-2 col-form-label">
//                         quantity
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="quantity"
//                             id='quantity'
//                             className="col-sm-2 col-form-label"
//                             value={formData.quantity}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="dateOfShipping" className="col-sm-2 col-form-label">
//                         Date of Shipping:
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="quantity"
//                             id='dateOfShipping'
//                             className="col-sm-2 col-form-label"
//                             value={formData.dateOfShipping}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="shippingSchedule1" id='shippingSchedule1' className="col-sm-2 col-form-label">
//                         Shipping Schedule 1:
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="shippingSchedule1"
//                             id='shippingSchedule1'
//                             className="col-sm-2 col-form-label"
//                             value={formData.shippingSchedule1}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="shippingSchedule2" id='shippingSchedule2' className="col-sm-2 col-form-label">
//                         Shipping Schedule 2:
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="shippingSchedule2"
//                             id='shippingSchedule2'
//                             className="col-sm-2 col-form-label"
//                             value={formData.shippingSchedule2}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="shippingSchedule3" id="shippingSchedule3" className="col-sm-2 col-form-label">
//                         Shipping Schedule 3:
//                     </label>
//                     <div className="col-sm-10">
//                         <input
//                             type="text"
//                             name="shippingSchedule3"
//                             id='shippingSchedule3'
//                             className="col-sm-2 col-form-label"
//                             value={formData.shippingSchedule3}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label htmlFor="category" className="col-sm-2 col-form-label">Select Vendor:</label>
//                     <div className="col-sm-10">
//                         <select class="mx-2" id="category" name="category">
//                             <option class="option" value="null" selected="">choose..</option>
//                             {vendors.map((vendor) => (
//                                 <option class="option" value={vendor._id}>{vendor.vendorName}</option>
//                             ))}

//                         </select>
//                     </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     send
//                 </button>
//             </form>
//         </div>

//     );
// }

// export default LoginForm;


// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Navigate, Routes, Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        try {
            // Send form data to the backend API
            const formData = {
                name: name,
                email: email,
                password: password,
                phoneNumber: phoneNumber
            }
            await signupUser(formData);
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    };

    const Navigate = useNavigate();

    const signupUser = async (formData) => {
        // In a real app, you would perform authentication here.
        // For simplicity, we just check if the username is not empty.
        const response = await axios.post('http://localhost:3500/v1/user/create-user', formData);
        if (response.data.error === false) {
            Navigate('/login');
        }

    };

    return (
        <div className='container mt-5 d-flex justify-content-center'>
            <form style={{ width: "500px" }}>
                <h2>Sign Up</h2>
                <div className='mb-3'>
                    <label htmlFor="name" className="col-form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id='name'
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className="col-form-label">
                        Email:
                    </label>
                    <input
                        type="text"
                        name="email"
                        id='email'
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className="col-form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="phoneNumber" className="col-form-label">
                        Phone Number:
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <button type='button' className='btn btn-primary mx-3' onClick={handleSubmit}>SignUp</button>
                <Link to={'/login'}>Already have account?</Link>
            </form>
        </div>
    );
}

export default SignupForm;



