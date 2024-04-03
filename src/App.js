import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar/Navbar';
import Products from './Navbar/Products/Products';
import Workout from './Navbar/Workout/Workout';
import Tracker from './Navbar/Tracker/Tracker';
import Recipes from './Navbar/Recipes/Recipes';
import Chat from './Navbar/Chat';
import Home from './Navbar/Home';

function App() {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/chat" element={<Chat />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
