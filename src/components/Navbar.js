import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

 const Navbar = () => {
    return (
        <div className="Navbar">
           <ul className = "Navbar-link">
               <li><Link to="/">HOME</Link></li>
               <li><Link to="/signup">SIGNUP</Link></li>
               <li><Link to="/signin">SIGNIN</Link></li>
           </ul>
        </div>
    )
}

export default Navbar