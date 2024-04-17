import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton'; 

function Navbar() {
  
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="bg-white-200 p-4 flex justify-between items-center">
      <h1 className="text-xl text-[#3498db] font-bold">Healthwrap</h1>
      <ul className="flex gap-4">
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Home" className="text-gray-800 hover:text-blue-500">Home</Link>
        </li>
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Products" className="text-gray-800 hover:text-blue-500">Products</Link>
        </li>
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Recipes" className="text-gray-800 hover:text-blue-500">Recipes</Link>
        </li>
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Workout" className="text-gray-800 hover:text-blue-500">Workout</Link>
        </li>
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Tracker" className="text-gray-800 hover:text-blue-500">Tracker</Link>
        </li>
        <li className="bg-sky-200 p-2 rounded">
          <Link to="/Chat" className="text-gray-800 hover:text-blue-500">Support</Link>
        </li>
        {isAuthenticated && (
          <li className="bg-sky-200 p-2 rounded">
            <LogoutButton />
          </li>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
