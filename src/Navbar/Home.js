import React from 'react';
import Quotes from '../components/Quotes';

function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-[20vh] mt-12">
        <div className="bg-white text-[#3498db] font-bold text-3xl p-4 rounded">
          <div className="overflow-hidden whitespace-nowrap border-r-[0.1em] border-white animate-typing mx-auto" style={{ maxWidth: '100%' }}>welcome to Healthwrap</div>
        </div>
      </div>
      <Quotes />
    </div>
  );
}
export default Home;
