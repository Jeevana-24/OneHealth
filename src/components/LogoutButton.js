// src/components/LogoutButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
      <div>
        <button onClick={() => loginWithRedirect()}>Logout</button>
      </div>
    );
};

export default LogoutButton;
