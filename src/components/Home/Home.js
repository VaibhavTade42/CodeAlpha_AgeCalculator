// import React, { useEffect, useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom';
// import {ToastContainer} from 'react-toastify'
// import { handleSuccess } from '../Utils/util';
// //import './Home.css'; // Import the CSS file



// function Home() {

//   const navigate = useNavigate();
   
//   const[loggedInUser, setLoggedInUser] = useState('');

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));

//   },[])

//   const handleLogout = (e) => {
//     const user = localStorage.getItem('loggedInUser')
//     localStorage.removeItem('jwtToken');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess(`${user} Loggedout successfully`);
//     setTimeout(() => {
//         navigate('/login');
//     }, 1500)
//   }

//   return (
//     // <div>
//     //   <h1>Welcome, {loggedInUser}</h1>
//     // <button onClick={handleLogout}>Logout</button>
//     // <ToastContainer/>
//     // </div>

//     <div className='homepage'>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/age-calculator">Age Calculator</Link>
//           <Link to="/weather">Weather Forecast</Link>
//         </div>
//         <div className="navbar-right">
//           {loggedInUser ? (
//             <>
//               <span>Welcome, {loggedInUser}</span>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <Link to="/signup">Signup</Link>
//           )}
//         </div>
        
//       </nav>
//       {/* <h1>Welcome, {loggedInUser}</h1>
//       <button onClick={handleLogout}>Logout</button> */}
//       <ToastContainer />
//     </div>
//   );
  
// }

// export default Home

//2nd attempt
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils/util';
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [ageCalculator, setAgeCalculator] = useState('');

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    const user = localStorage.getItem('loggedInUser');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    handleSuccess(`${user} Logged out successfully`);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const fetchAgeCalculator = async() => {
    try{
    const url = "http://localhost:3000/age-calculator";
    const headers = {
      headers:{
        'Authorization' : localStorage.getItem('jwtToken')
      }
    }

    const response = await fetch(url ,headers);
    const result = await response.json();
    console.log(result);
    setAgeCalculator(result);
  }
catch(err){
  handleError(err);
}

  return (
    <div className="home-page">
      <nav className="home-navbar">
        <div className="home-navbar-left">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/age-calculator">Age Calculator</Link>
          <Link to="/weather">Weather Forecast</Link>
        </div>
        <div className="home-navbar-right">
          {loggedInUser ? (
            <>
              <span>Welcome, {loggedInUser}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/signup">Signup</Link>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}
}
export default Home;


