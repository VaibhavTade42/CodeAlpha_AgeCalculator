
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import { useState } from 'react';
import RefreshHandler from './components/RefreshHandler/RefreshHandler';
import AgeCalculator from './components/AgeCalculator/AgeCalculator';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) =>{
      return  isAuthenticated ? element : <Navigate to={"/login"}/>
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/age-calculator' element={<AgeCalculator/>}/>
        <Route path='/weather' element={<WeatherForecast/>}/>
      </Routes>
    </div>
  );
}

export default App;
