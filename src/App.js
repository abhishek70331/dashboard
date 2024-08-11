import './App.css';
import Live from './pages/live_score';
import NavBar from './components/navbar';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={< Dashboard/>}/>
      <Route path="/live" element={<Live />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
