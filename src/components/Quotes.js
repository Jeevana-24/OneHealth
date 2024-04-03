import React from 'react';

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
  const imagePath = '/images/motive.jpg'; 

  return (
    <div className="flex flex-wrap justify-center gap-4 my-5">
  <div className="w-[45%] bg-gray-200 p-5 rounded-lg relative" style={{ height: 'calc(45vw - 2rem)' /* Subtract the total horizontal padding + gap */ }}>
    <img src={imagePath} alt="Motive backdrop" className="w-full h-full object-cover rounded-lg absolute top-0 left-0 z-0" />
    <div className="relative z-10 flex flex-col justify-between h-full">
      <h2 className="text-lg text-white font-semibold mb-4 bg-black bg-opacity-50 p-2 rounded">Motive of the Day</h2>
      <blockquote className="italic text-white bg-black bg-opacity-50 p-2 rounded">
        "{quoteOfTheDay.text}"
        <footer className="text-right font-bold">- {quoteOfTheDay.author}</footer>
      </blockquote>
    </div>
  </div>

      <div className="flex-1 min-w-[45%] bg-blue-100 p-5 rounded-lg">
        <h2 className="text-lg text-gray-800 font-semibold mb-4">Health Tip of the Day</h2>
        <p className="italic">{tipOfTheDay}</p>
      </div>
    </div>
  );
}

export default Quotes;
