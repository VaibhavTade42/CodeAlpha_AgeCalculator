import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../Utils/util'
//import {toast} from 'react-toastify'
import './Signup.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        firstName :'',
        lastName:'', 
        email:'', 
        password:'', 
        state:'', 
        city:'', 
        pincode:'', 
        dateOfBirth:''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);

    }
    console.log("Login Info: ", signupInfo);

    const  handleSignup = async (e) => {
        e.preventDefault();
        
        const { firstName , lastName, email, password,  state,  city, pincode, dateOfBirth } = signupInfo
        if(!firstName || !lastName || !email || !password ||  !state ||  !city || !pincode || !dateOfBirth){
            return handleError('All fields are required')
        
        }
        try{
            const url = "http://localhost:9090/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(signupInfo)
            });

            // if (response.status === 409) {
            //     toast.error('User with this email already exists.', {
            //         position: 'top-center'
            //     });
            // } else if (!response.ok) {
            //     toast.error('Something went wrong.', {
            //         position: 'top-center'
            //     });
            // } else {
            //     toast.success('User created successfully.', {
            //         position: 'top-center'
            //     });
            // }

            const result = await response.json();
          
            const {message, success, error} = result;
            if(success){
                handleSuccess(message); 
                setTimeout(() => { 
                    navigate('/login');
                },1500)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        
        } catch(err){
            handleError(err);
     
    }
       
    }

    

  return (
    
    <div className='container'>
        <div className='pageheading'>Signup</div>
    <form onSubmit={handleSignup}>
        <div>
           <label htmlFor='firstName'>First Name</label>
           <input 
                 onChange={handleChange}
                 type='text'
                 name='firstName'
                 autoFocus
                 placeholder='Enter your first name'
                 value={signupInfo.firstName}
           />
        </div>
        <div>
           <label htmlFor='lastName'>Last Name</label>
           <input 
                 onChange={handleChange}
                 type='text'
                 name='lastName'
                 autoFocus
                 placeholder='Enter your last name'
                 value={signupInfo.lastName}
           />
        </div>
        <div>
           <label htmlFor='email'>Email</label>
           <input 
                 onChange={handleChange}
                 type='email'
                 name='email'
                 placeholder='Enter your Email'
                 value={signupInfo.email}
           />
        </div>
        <div>
           <label htmlFor='password'>Password</label>
           <input 
                 onChange={handleChange}
                 type='password'
                 name='password'
                 placeholder='Enter your password'
                 value={signupInfo.password}
           />
        </div>
        <div>
           <label htmlFor='state'>State</label>
           <input 
                 onChange={handleChange}
                 type='text'
                 name='state'
                 autoFocus
                 placeholder='Enter your state'
                 value={signupInfo.state}
           />
        </div>
        <div>
           <label htmlFor='city'>City</label>
           <input 
                 onChange={handleChange}
                 type='text'
                 name='city'
                 autoFocus
                 placeholder='Enter your city'
                 value={signupInfo.city}
           />
        </div>
        <div>
           <label htmlFor='pincode'>Pincode</label>
           <input
                 onChange={handleChange} 
                 type='text'
                 name='pincode'
                 autoFocus
                 placeholder='Enter your pincode'
                 value={signupInfo.pincode}
           />
        </div>
        <div>
           <label htmlFor='dateOfBirth'>Date of Birth</label>
           <input 
                 onChange={handleChange}
                 type='text'
                 name='dateOfBirth'
                 autoFocus
                 placeholder='Enter your Date of Birth'
                 value={signupInfo.dateOfBirth}
           />
        </div>
        
            <button type='submit'>Signup</button>
            <span>Already have an account?
                <Link to="/login">Login</Link>
            </span>
       
       
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Signup