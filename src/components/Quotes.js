import React from 'react';
import './Quotes.css'; 

function Quotes() {
  const quotes = [
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Eating well is a form of self-respect.", author: "Unknown" },
    // Add more quotes as needed
  ];

  const tips = [
    "Drink plenty of water throughout the day.",
    "Incorporate more fruits and vegetables into your diet.",
    "Take short breaks during long periods of sitting.",
    // Add more tips as needed
  ];

  // Randomly select a quote and a tip for the day
  const quoteOfTheDay = quotes[Math.floor(Math.random() * quotes.length)];
  const tipOfTheDay = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="quotes-section">
      <h2>Motive of the Day</h2>
      <blockquote>
        "{quoteOfTheDay.text}"
        <footer>- {quoteOfTheDay.author}</footer>
      </blockquote>

      
      <h2>Health Tip of the Day</h2>
      <div className="tip-of-the-day">
        <p>{tipOfTheDay}</p>
      </div>
    </div>
  );
}

export default Quotes;
