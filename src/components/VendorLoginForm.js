// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm({ authenticated, setAuthenticated, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleLogin = async () => {
        const formData = {
            email: email,
            password: password
        }
        console.log(formData);
        const response = await axios.post('http://localhost:5000/v1/auth/login-vendor', formData);
        if (response.data.error === false) {
            console.log(response.data.data);
            onLogin(response.data.data.user.userName);
            localStorage.setItem('token', response.data.data.token);
            setAuthenticated(true);
            Navigate('/home');
        }

    };

    return (
        <div className='container mt-5  d-flex justify-content-center'>
            <form style={{ width: "500px" }}>
                <h2>Login</h2>
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
                <button type='button' className='btn btn-primary mx-3' onClick={handleLogin}>Login</button>
                <Link to={'/signup'}>Do not have account?</Link>
            </form>
        </div >
    );
}

export default LoginForm;



