import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/auth/login';
import SignupPage from './components/auth/signup';
import HomePage from './components/home';
import Layout from './components/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path="features" element={<h1>Features Page</h1>} />
          <Route path="pricing" element={<h1>Pricing Page</h1>} />
          <Route path="faqs" element={<h1>FAQs Page</h1>} />
          <Route path="about" element={<h1>About Page</h1>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="signup" element={<SignupPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
