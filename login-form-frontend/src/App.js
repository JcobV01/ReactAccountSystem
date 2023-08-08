import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm'
import InsidePanel from './components/InsidePanel/InsidePanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='home' element={<InsidePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
