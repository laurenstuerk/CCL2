// ProfileLayout.jsx
export default function ProfileLayout({ user, showEdit = false, onEdit }) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-light text-neutral-100 tracking-tight">
                {user.name} {user.surname}
              </h1>
              <p className="text-neutral-400 mt-2 text-lg">@{user.username}</p>
            </div>
            {showEdit && (
              <button 
                onClick={onEdit}
                className="text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* About Section */}
        {user.info && (
          <div className="mb-12">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">About</h2>
            <p className="text-neutral-300 text-lg leading-relaxed">{user.info}</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Contact</h2>
          <div className="flex items-center gap-3 text-neutral-300 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{user.email}</span>
          </div>
        </div>

        {/* Additional Info Section - Only shown in public profile */}
        {!showEdit && user.hero && (
          <div>
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Favorite Hero</h2>
            <p className="text-neutral-300 text-lg">{user.hero}</p>
          </div>
        )}
      </div>
    </div>
  );
}
