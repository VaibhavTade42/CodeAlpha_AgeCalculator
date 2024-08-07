import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'
//rfce
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  function RefreshHandler({setIsAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            setIsAuthenticated(true);
            if(
                location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup' // ||
                // location.pathname === '/age-calculator' ||
                // location.pathname === '/weather'
            ){
                navigate('/home', {replace:false})

            }
            // else if(
            //   location.pathname === '/home'
            // ){
            //   navigate('/age-calculator', {replace: true});
            //   navigate('/weather', {replace: true});

            // }
            // else if(
            //   location.pathname === '/age-calculator'
            // ){
            //   navigate('/weather', {replace: true});
            // }
            // else if(
            //   location.pathname === '/weather'
            // ){
            //   navigate('/age-calculator', {replace: true});
            // }
        }
    },[location, navigate, setIsAuthenticated])

  return (
   null
  )
}

export default RefreshHandler