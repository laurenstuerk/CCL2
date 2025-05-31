import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-10 lg:p-16 mt-16">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Big Feature Card */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[400px]">
          <div
            className="h-64 md:h-80 xl:h-[400px] rounded-xl bg-cover bg-center mb-6"
            style={{ backgroundImage: "url('/images/lobby.png')" }}
          />
          <Link to="/feature-one">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition">
              Join Online Lobby
            </button>
          </Link>
        </div>

        {/* Right: Stack of Two Cards */}
        <div className="flex flex-col gap-8">
          {/* Marble Race */}
          <div
            className="rounded-2xl p-4 shadow-md bg-cover bg-center h-48 md:h-56 xl:h-64 flex flex-col justify-end"
            style={{ backgroundImage: "url('/images/marble.png')" }}
          >
            <Link to="/marble-race">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition">
                Marble Race
              </button>
            </Link>
          </div>

          {/* Multiplayer Racing */}
          <div
            className="rounded-2xl p-4 shadow-md bg-cover bg-center h-48 md:h-56 xl:h-64 flex flex-col justify-end"
            style={{ backgroundImage: "url('/images/race.png')" }}
          >
            <Link to="/feature-three">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition">
                Multiplayer Racing
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
