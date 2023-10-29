import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

export default function OrderPage(props) {
    const [purchaseOrder, setPurchaseOrder] = useState([{
        productName: '',
        quantity: '',
        dateOfShipping: '',
        shippingSchedule1: '',
        shippingSchedule2: '',
        shippingSchedule3: '',
        userId: '',
        vendorId: '',
    }]);
    const [selectedShippingSchedule, setSelectedShippingSchedule] = useState('');
    const { orderId } = useParams();
    async function getPurchaseOrder() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const requestBody = {
                orderId: orderId,
            }
            console.log("order id = ", orderId);
            const response = await axios.post('http://localhost:8000/v1/purchaseOrder/get-purchase-orders', requestBody, config);
            if (response.data.error == false) {
                setPurchaseOrder(response.data.data.purchaseOrders);
            }
            console.log('order details = ', purchaseOrder);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    async function updatePurchaseOrder() {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const requestBody = {
                orderId: orderId,
                selectedShippingSchedule: selectedShippingSchedule
            }
            const response = await axios.post('http://localhost:8000/v1/purchaseOrder/update-purchase-order', requestBody, config);
            if (response.data.error == false) {
                console.log(response.data.data.message);
            }
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }

    useEffect(() => {
        // Fetch data here
        getPurchaseOrder()
    }, []);
    return (
        <div>
            <Navbar user={props.userName} />
            <div className="container mt-2 d-flex justify-content-center">
                <div>
                    <h2>Data Fields:</h2>
                    <form style={{ width: "500px" }}>
                        <div className="mb-3 row">
                            <label htmlFor="productName" className=" col-sm-2 col-form-label">
                                Product Name
                            </label>
                            <div class="col-sm-10">
                                <input
                                    type="text"
                                    name="productName"
                                    id='productName'
                                    className="form-control"
                                    value={purchaseOrder[0].productName}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="quantity" className=" col-sm-2 col-form-label">
                                quantity
                            </label>
                            <div class="col-sm-10">
                                <input
                                    type="Number"
                                    name="quantity"
                                    id='quantity'
                                    className=" form-control"
                                    value={purchaseOrder[0].quantity}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="dateOfShipping" className=" col-sm-2 col-form-label">
                                Date of Shipping:
                            </label>
                            <div class="col-sm-10">
                                <input
                                    type="text"
                                    name="dateOfShipping"
                                    id='dateOfShipping'
                                    className="form-control"
                                    value={purchaseOrder[0].dateOfShipping}
                                />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="shippingSchedule" id='shippingSchedule' className=" col-sm-2 col-form-label">
                                Shipping Schedules:
                            </label>
                            <select class="form-select" multiple aria-label="multiple select example" id='shippingSchedule' onChange={(e) => setSelectedShippingSchedule(e.target.value)}>
                                <option className='mt-2' value={purchaseOrder[0].shippingSchedule1}>
                                    {/* <label htmlFor="shippingSchedule1" id='shippingSchedule1' className=" col-sm-2 col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                    <input
                                        type="text"
                                        name="shippingSchedule1"
                                        id='shippingSchedule1'
                                        className="form-control"
                                        placeholder='Shipping Schedule 1'
                                        value={purchaseOrder[0].shippingSchedule1}
                                    />
                                </option>
                                <option className='mt-2' value={purchaseOrder[0].shippingSchedule2}>
                                    {/* <label htmlFor="shippingSchedule2" id='shippingSchedule2' className=" col-sm-2 col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                    <input
                                        type="text"
                                        name="shippingSchedule2"
                                        id='shippingSchedule2'
                                        className="form-control"
                                        placeholder='Shipping Schedule 2'
                                        value={purchaseOrder[0].shippingSchedule2}
                                    />
                                </option>
                                <option className='mt-2' value={purchaseOrder[0].shippingSchedule3}>
                                    {/* <label htmlFor="shippingSchedule3" id='shippingSchedule3' className=" col-sm-2 col-form-label">
                                                Shipping Schedule 2:
                                            </label> */}
                                    <input
                                        type="text"
                                        name="shippingSchedule3"
                                        id='shippingSchedule3'
                                        className="form-control"
                                        placeholder='Shipping Schedule 3'
                                        value={purchaseOrder[0].shippingSchedule3}
                                    />
                                </option>
                            </select>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="vendorId" className=" col-sm-2 col-form-label">Vendor Id:</label>
                            <input
                                type="text"
                                name="vendorId"
                                id='vendorId'
                                className="form-control"
                                placeholder='vendorId'
                                value={purchaseOrder[0].vendorId}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={updatePurchaseOrder}>save</button>
                    </form>
                </div>
            </div>

        </div>

    )
}
