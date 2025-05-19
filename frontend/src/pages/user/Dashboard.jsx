import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="bg-black text-white min-h-screen p-8 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Left: Big Image */}
        <div className="flex-1 bg-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div className="h-80 bg-gray-600 rounded-xl mb-6 flex items-center justify-center text-2xl font-semibold">
            Big Image Placeholder
          </div>
          <Link to="/feature-one">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition">
              Explore Main Feature
            </button>
          </Link>
        </div>

        {/* Right: Two Small Images */}
        <div className="flex flex-col gap-8 w-full lg:w-1/3">
          {/* Top Box */}
          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
            <div className="h-36 bg-gray-600 rounded-xl mb-4 flex items-center justify-center text-lg font-medium">
              Small Image 1
            </div>
            <Link to="/feature-two">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition">
                Go to Feature 2
              </button>
            </Link>
          </div>

          {/* Bottom Box */}
          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
            <div className="h-36 bg-gray-600 rounded-xl mb-4 flex items-center justify-center text-lg font-medium">
              Small Image 2
            </div>
            <Link to="/feature-three">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition">
                Go to Feature 3
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
