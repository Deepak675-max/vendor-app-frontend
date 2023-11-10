import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from './Notification'
export default function Navbar(props) {
      const [notices, setNotices] = useState('');

      const getNotifications = async () => {
            try {
                  const token = localStorage.getItem('token');
                  const config = {
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                        }
                  }
                  const
                  const response = await axios.get('http://localhost:6000/v1/user/get-Notifications', config);
            } catch (error) {
                  console.log(error);
            }
      }

      return (
            <nav className={`navbar navbar-expand-lg`}>
                  <div className="container-fluid">
                        <Link className="navbar-brand" to="#">Vendor App</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

                              </ul>
                              <div className='d-flex'>
                                    <Notification width={"30px"} color={"#122C84"} count={10} />
                                    <div className="dropdown">

                                          <Link
                                                className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                                                id="dropdownUser3"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false" to="#"
                                          >
                                                {props.user}
                                          </Link>
                                          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                                                <li><Link className="dropdown-item" to="#">New project...</Link></li>
                                                <li><Link className="dropdown-item" to="#">Settings</Link></li>
                                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                          </ul>
                                    </div>
                              </div>

                        </div>
                  </div>
            </nav >
      )
}
