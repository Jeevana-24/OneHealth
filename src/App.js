import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Products from './Navbar/Products/Products';
import Workout from './Navbar/Workout/Workout';
import Tracker from './Navbar/Tracker/Tracker';
import Recipes from './Navbar/Recipes/Recipes';
import Chat from './Navbar/Chat';
import Home from './Navbar/Home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Recipes" element={<Recipes />} />
          <Route path="/Workout" element={<Workout />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
