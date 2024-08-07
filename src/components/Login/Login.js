import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../Utils/util'
//import {toast} from 'react-toastify'

function Login() {
    const [loginInfo, setLoginInfo] = useState({
       
        email:'', 
        password:'', 

    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);

    }
    console.log("Login Info: ", loginInfo);

    const  handleLogin = async (e) => {
        e.preventDefault();
        
        const {  email, password } = loginInfo
        if( !email || !password){
            return handleError('Email and password are Required')
        
        }
        try{
            const url = "http://localhost:9090/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(loginInfo)
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
          
            const {message, success, error, jwtToken, firstName} = result;
            if(success){
                handleSuccess(message); 
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('loggedInUser', firstName);
                setTimeout(() => { 
                    navigate('/home');
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
    
    <div className='container' id='login_page'>
        <div className='pageheading'>Login</div>
    <form onSubmit={handleLogin} >
       
        
        <div>
           <label htmlFor='email'>Email</label>
           <input 
                 onChange={handleChange}
                 type='email'
                 name='email'
                 placeholder='Enter your Email'
                 value={loginInfo.email}
           />
        </div>
        <div>
           <label htmlFor='password'>Password</label>
           <input 
                 onChange={handleChange}
                 type='password'
                 name='password'
                 placeholder='Enter your password'
                 value={loginInfo.password}
           />
        </div>
       
      
            <button type='submit'>Login</button>
            <span>Don't have an Account?
                <Link to="/signup">Signup</Link>
            </span>
       
       
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Login;