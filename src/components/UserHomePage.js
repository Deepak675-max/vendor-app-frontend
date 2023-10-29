import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


export default function HomePage({ userName, onLogout }) {
    const [vendors, setVendors] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dateOfShipping, setDateOfShipping] = useState('');
    const [shippingSchedule1, setShippingSchedule1] = useState('');
    const [shippingSchedule2, setShippingSchedule2] = useState('');
    const [shippingSchedule3, setShippingSchedule3] = useState('');
    const [selectedShippingSchedule, setSelectedShippingSchedule] = useState('');
    const [vendorId, setVendorId] = useState(null);
    const [userId, setUserId] = useState(null);

    const Navigate = useNavigate();


    async function getvendors() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get('http://localhost:3500/v1/user/get-vendors', config);
            if (response.data.error === false) {
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
                userId: userId
            }
            const response = await axios.post('http://localhost:8000/v1/purchaseOrder/get-purchase-orders', requestBody, config);
            if (response.data.error === false) {
                setOrders(response.data.data.purchaseOrders);
            }
            console.log(orders);
        } catch (error) {
            throw error;
        }
    }
    async function getUserFromToken() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await axios.get('http://localhost:5000/v1/auth/get-user-from-token', config);
            if (response.data.error === false) {
                setUserId(response.data.data.user.userId);
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
            await getUserFromToken();
            console.log(userId);
            const formData = {
                productName: productName,
                quantity: quantity,
                dateOfShipping: dateOfShipping,
                shippingSchedule1: shippingSchedule1 === '' ? null : shippingSchedule1,
                shippingSchedule2: shippingSchedule2 === '' ? null : shippingSchedule2,
                shippingSchedule3: shippingSchedule3 === '' ? null : shippingSchedule3,
                selectedShippingSchedule: selectedShippingSchedule === '' ? null : selectedShippingSchedule,
                vendorId: vendorId,
                userId: userId
            }
            await sendOrderDetailsToVendor(formData);
        } catch (error) {
            // Handle any errors
            console.error(error);
        }
    };

    const viewFullOrderDetails = async (orderId) => {
        console.log("orderId= ", orderId);
        Navigate(`/order/${orderId}`);
    }

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

                <button
                    type="button"
                    className="btn btn-primary mb-5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Create Order
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className=" modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Order Details
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
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
                                        <select class="form-select" multiple aria-label="multiple select example" id='shippingSchedule' onChange={(e) => setSelectedShippingSchedule(e.target.value)}>
                                            <option className='mt-2' value={shippingSchedule1}>
                                                {/* <label htmlFor="shippingSchedule1" id='shippingSchedule1' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                                <input
                                                    type="text"
                                                    name="shippingSchedule1"
                                                    id='shippingSchedule1'
                                                    className="form-control"
                                                    placeholder='Shipping Schedule 1'
                                                    value={shippingSchedule1}
                                                    onChange={(e) => setShippingSchedule1(e.target.value)}
                                                />
                                            </option>
                                            <option className='mt-2' value={shippingSchedule2}>
                                                {/* <label htmlFor="shippingSchedule2" id='shippingSchedule2' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                                <input
                                                    type="text"
                                                    name="shippingSchedule2"
                                                    id='shippingSchedule2'
                                                    className="form-control"
                                                    placeholder='Shipping Schedule 2'
                                                    value={shippingSchedule2}
                                                    onChange={(e) => setShippingSchedule2(e.target.value)}
                                                />
                                            </option>
                                            <option className='mt-2' value={shippingSchedule3}>
                                                {/* <label htmlFor="shippingSchedule3" id='shippingSchedule3' className=" col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                                <input
                                                    type="text"
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
                                    <div className=" mb-3">
                                        <label htmlFor="category" className=" col-form-label">Select Vendor:</label>
                                        <select className="mx-2" id="category" name="category" onChange={(e) => setVendorId(e.target.value)}>
                                            <option className="option" value="''" selected="">choose..</option>
                                            {vendors.map((vendor) => (
                                                <option value={vendor._id} >{vendor.vendorName}</option>
                                            ))}

                                        </select>
                                    </div>

                                </form>
                                {/* <MyForm/> */}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button id="addOrder" type="button" onClick={handleSubmit} className="btn btn-primary">
                                    send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Vendor Id</th>
                                <th scope='col'>Product Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return <tr>
                                    <td>{order._id}</td>
                                    <td>{order.vendorId}</td>
                                    <td>{order.productName}</td>
                                    <td><button type='button' value={order._id} onClick={(e) => viewFullOrderDetails(e.target.value)}>View full</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )
}
