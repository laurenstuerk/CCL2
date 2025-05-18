export default function ProfileLayout({ user, showEdit = false, onEdit }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name} {user.surname}</h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>
          {showEdit && (
            <button 
              onClick={onEdit}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        {user.info && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
            <p className="text-gray-300">{user.info}</p>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
