import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=health&apiKey=33756672a5914b3ba7763976dc017413')
      .then(response => response.json())
      .then(data => setArticles(data.articles))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-sky-200 min-h-screen">
      <div className="flex justify-center items-center h-[30vh]">
        <div className="bg-white text-[#3498db] font-bold text-4xl p-4 rounded shadow-lg">
          <div className="overflow-hidden whitespace-nowrap border-r-[0.1em] border-white animate-typing mx-auto">Welcome to Healthwrap</div>
        </div>
      </div>
           <div className="my-8 p-4">
        <div className="flex justify-center gap-8">
          <div className="bg-white p-4 rounded w-1/3 shadow-lg flex flex-col items-center">
            <h3 className="font-bold text-xl mt-4">Calorie Tracker</h3>
            <p className="text-center">Track your Calorie and monitor your progress.</p>
            <Link to="/Tracker" className="bg-sky-400 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300 ease-in-out">Track calories</Link>
          </div>
          {/* Workout Section */}
          <div className="bg-white p-4 rounded w-1/3 shadow-lg flex flex-col items-center">
            <h3 className="font-bold text-xl mt-4">Workout Tracker</h3>
            <p className="text-center">Track your progress towards your fitness goals.</p>
            <Link to="/Workout" className="bg-sky-400 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300 ease-in-out">Start Workout</Link>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg flex flex-col items-center">
            <h3 className="font-bold text-xl mt-4">Shop Products</h3>
            <p className="text-center">Shop health productions at low price.</p>
            <Link to="/Products" className="bg-sky-400 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300 ease-in-out">shop</Link>
          </div>

          {/* Recipe Finder Section */}
          <div className="bg-white p-4 rounded w-1/3 shadow-lg flex flex-col items-center">
            <h3 className="font-bold text-xl mt-4">Recipe Finder</h3>
            <p className="text-center">Find healthy recipes to cook delicious and nutritious meals.</p>
            <Link to="/Recipes" className="bg-sky-400 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300 ease-in-out">Eat healthy</Link>
          </div>
        </div>
      </div>
      <div className="my-8 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Success Stories</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">John Doe</h3>
            <p>"Thanks to Healthwrap, I've lost 20 pounds and feel better than ever!"</p>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">Jane Smith</h3>
            <p>"The workout tracker helped me stay consistent with my fitness routine."</p>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">John Doe</h3>
            <p>"Thanks to Healthwrap, I've lost 20 pounds and feel better than ever!"</p>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">Jane Smith</h3>
            <p>"The workout tracker helped me stay consistent with my fitness routine."</p>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">John Doe</h3>
            <p>"Thanks to Healthwrap, I've lost 20 pounds and feel better than ever!"</p>
          </div>
          <div className="bg-white p-4 rounded w-1/3 shadow-lg">
            <h3 className="font-bold">Jane Smith</h3>
            <p>"The workout tracker helped me stay consistent with my fitness routine."</p>
          </div>
        </div>
      </div>
      <div className="my-8 p-4">
  <div className="my-8 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Health Articles</h2>
        <div className="flex justify-center gap-4">
          {articles.slice(0, 3).map((article, index) => (
            <div key={index} className="bg-white p-4 rounded w-1/3 shadow-lg">
              <h3 className="font-bold">{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Read More</a>
            </div>
          ))}
        </div>
      </div>
</div>
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} Healthwrap. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
