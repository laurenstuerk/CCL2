export default function Overview({ user }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Profile Overview</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-sm text-neutral-400 uppercase mb-1">Full Name</h2>
          <p className="text-lg">{user.name} {user.surname}</p>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400 uppercase mb-1">Username</h2>
          <p className="text-lg">@{user.username}</p>
        </div>
        <div>
          <h2 className="text-sm text-neutral-400 uppercase mb-1">Email</h2>
          <p className="text-lg">{user.email}</p>
        </div>
        {user.info && (
          <div>
            <h2 className="text-sm text-neutral-400 uppercase mb-1">Bio</h2>
            <p className="text-lg text-neutral-300">{user.info}</p>
          </div>
        )}
      </div>
    </div>
  );
}
