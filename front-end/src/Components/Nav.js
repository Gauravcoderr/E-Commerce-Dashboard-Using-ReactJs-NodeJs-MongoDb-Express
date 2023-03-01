import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
    const auth = localStorage.getItem("user");

    const navigate = useNavigate();


    const logout = () => {

        localStorage.clear();
        navigate("/signup")

    }

    return (
        <div >
            <img className="logo" src="https://static.vecteezy.com/system/resources/thumbnails/004/206/311/small/my-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg" alt="logo"/>
            {
                auth ? <ul className="nav-ul">

                    <li><Link to="/">Products</Link></li>
                    <li> <Link to="/add">Add Products</Link></li>
                    <li>  <Link to="/update">Update Products</Link></li>
                      <li>  <Link to="/profile">Profile</Link></li>
                    <li> <Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link> </li>
{/* 
string to json json.parse */}

                </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li>  <Link to="/login">Login</Link></li>
                        <li> <Link to="/signup">Sign Up</Link> </li>
                    </ul>
            }
        </div>
    )

}
export default Nav;