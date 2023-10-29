import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default function HomePage({ userName, onLogout }) {
    const [vendors, setVendors] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dateOfShipping, setDateOfShipping] = useState('');
    const [shippingSchedule1, setShippingSchedule1] = useState('');
    const [shippingSchedule2, setShippingSchedule2] = useState('');
    const [shippingSchedule3, setShippingSchedule3] = useState('');

    const [vendorId, setVendorId] = useState('');
    const [userId, setUserId] = useState('');

    async function getUsers() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get('http://localhost:3500/v1/user/get-users', config);
            if (response.data.error == false) {
                setVendors(response.data.data.vendors);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    async function getPurchaseOrders() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const requestBody = {
            }
            const response = await axios.get('http://localhost:8000/v1/purchaseOrder/get-purchase-orders', requestBody, config);
            if (response.data.error == false) {
                setOrders(response.data.data.purchaseOrders);
            }
        } catch (error) {
            throw error;
        }
    }
    async function getVendorFromToken() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get('http://localhost:3500/v1/vendor/get-vendor-from-token', config);
            if (response.data.error == false) {
                setVendorId(response.data.data.user.userId);
            }
        } catch (error) {
            throw (error);
        }
    }

    useEffect(() => {
        // Fetch data here
        getvendors();
        getPurchaseOrders();
    }, []);

    const toggleTitleHome = () => {
        document.title = "Enhance text - Home"
    }
    const toggleTitleAbout = () => {
        document.title = "Enhance text - About"
    }

    const handleSubmit = async () => {
        try {
            await getVendorFromToken();
            console.log(userId);
            const formData = {
                productName: productName,
                quantity: quantity,
                dateOfShipping: dateOfShipping,
                shippingSchedule1: shippingSchedule1 === '' ? null : shippingSchedule1,
                shippingSchedule2: shippingSchedule2 === '' ? null : shippingSchedule2,
                shippingSchedule3: shippingSchedule3 === '' ? null : shippingSchedule3,
                vendorId: vendorId,
                userId: userId
            }
            await sendOrderDetailsToVendor(formData);
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    };

    const sendOrderDetailsToVendor = async (formData) => {
        try {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            // Make an HTTP POST request to your API endpoint
            const response = await axios.post('http://localhost:8000/v1/purchaseOrder/send-purchase-order', formData, config);

            // Handle the API response
            console.log('API Response:', response.data);
            // await getPurchaseOrders();
        } catch (error) {
            // Handle any API request errors
            console.error('API Request Error:', error);
        }
    };
    return (
        <div>
            <Navbar user={userName} toggleTitleHome={toggleTitleHome} toggleTitleAbout={toggleTitleAbout} />
            <div className="container mt-5">
                {/* Button trigger modal */}
                <form >
                    <div className="mb-3">
                        <label htmlFor="productName" className=" col-form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            id='productName'
                            className="form-control"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="quantity" className=" col-form-label">
                            quantity
                        </label>
                        <input
                            type="Number"
                            name="quantity"
                            id='quantity'
                            className=" form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="dateOfShipping" className=" col-form-label">
                            Date of Shipping:
                        </label>
                        <input
                            type="text"
                            name="dateOfShipping"
                            id='dateOfShipping'
                            className="form-control"
                            value={dateOfShipping}
                            onChange={(e) => setDateOfShipping(e.target.value)}
                        />
                    </div>

                    <div className=" mb-3">
                        <label htmlFor="shippingSchedule" id='shippingSchedule' className=" col-form-label">
                            Shipping Schedules:
                        </label>
                        <select class="form-select" multiple aria-label="multiple select example" id='shippingSchedule'>
                            <option className='mt-2' >
                                {/* <label htmlFor="shippingSchedule1" id='shippingSchedule1' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                <input
                                    type="date"
                                    name="shippingSchedule1"
                                    id='shippingSchedule1'
                                    className="form-control"
                                    placeholder='Shipping Schedule 1'
                                    value={shippingSchedule1}
                                    onChange={(e) => setShippingSchedule1(e.target.value)}
                                />
                            </option>
                            <option className='mt-2'>
                                {/* <label htmlFor="shippingSchedule2" id='shippingSchedule2' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                <input
                                    type="date"
                                    name="shippingSchedule2"
                                    id='shippingSchedule2'
                                    className="form-control"
                                    placeholder='Shipping Schedule 2'
                                    value={shippingSchedule2}
                                    onChange={(e) => setShippingSchedule2(e.target.value)}
                                />
                            </option>
                            <option className='mt-2' >
                                {/* <label htmlFor="shippingSchedule3" id='shippingSchedule3' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                <input
                                    type="date"
                                    name="shippingSchedule3"
                                    id='shippingSchedule3'
                                    className="form-control"
                                    placeholder='Shipping Schedule 3'
                                    value={shippingSchedule3}
                                    onChange={(e) => setShippingSchedule3(e.target.value)}
                                />
                            </option>
                        </select>
                    </div>

                </form>

            </div>
        </div>
    )
}
