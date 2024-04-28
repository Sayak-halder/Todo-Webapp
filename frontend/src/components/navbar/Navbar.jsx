import React, { useEffect } from 'react';
import './Navbar.css';
import { MdCollectionsBookmark } from "react-icons/md";
import { Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar=()=> {

  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  const dispatch=useDispatch();

  const logout=()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };


  return (
    <div>
        <nav className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand" to="/"><b><MdCollectionsBookmark/> TODO</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav ms-auto mx-2 my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
        <li className="nav-item mx-1">
          <Link className="nav-link active p-2" aria-current="page" to="/">Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active p-2" aria-current="page" to="/todo">Todos </Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link active p-2" aria-current="page" to="/about">About Us </Link>
        </li>
        {!isLoggedIn && <>
          <li className="nav-item mx-1">
          <Link className="nav-link active p-2 btn-nav" aria-current="page" to="/signup">SignUp </Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link active p-2 btn-nav" aria-current="page" to="/signin">SignIn </Link>
        </li>
        </>}
        {isLoggedIn && 
        <li className="nav-item mx-1">
        <Link className="nav-link active p-2 btn-nav" aria-current="page" onClick={logout} to="/signup">Log Out </Link>
      </li>}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar