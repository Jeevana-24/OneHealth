import React from 'react';
import Quotes from '../components/Quotes'; // Adjust if the path is not correct
import './Home.css'; // Make sure this path points to your CSS file for the Home component

function Home() {
    return (
      <div>
        <div className="home-welcome">
          <div className="Landingpage_heading">welcome to Healthwrap</div>
        </div>
        <Quotes />
      </div>
    );
  }

export default Home;
