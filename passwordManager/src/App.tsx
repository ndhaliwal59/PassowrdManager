import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPasswordPage from './pages/mainPasswordPage';

const App: React.FC = () => {
  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<LoginPage />} />
    //       <Route path="/signup" element={<SignupPage />} />
    //     </Routes>
    //   </div>
    // </Router>
    <div className="App">
    <MainPasswordPage />
  </div>
  );
};

export default App;