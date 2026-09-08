export default function ProfileSettings() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-text-primary">Profile</h2>
      <p className="mb-5 text-sm text-text-muted">Update your personal information.</p>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-avatar-bg text-lg font-semibold text-primary-dark">
          MA
        </div>
        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-primary-light">
          Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-base font-medium text-text-primary">Full Name</label>
          <input
            type="text"
            defaultValue="Master Admin"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-base font-medium text-text-primary">Email</label>
          <input
            type="email"
            defaultValue="admin@instaattend.com"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-base font-medium text-text-primary">Job Title</label>
          <input
            type="text"
            defaultValue="Platform Administrator"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-base font-medium text-text-primary">Phone</label>
          <input
            type="tel"
            placeholder="+91 00000 00000"
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
          />
        </div>
      </div>

      <button className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white hover:bg-primary-dark">
        Save Changes
      </button>
    </div>
  );
}