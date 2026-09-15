export default function PlatformSettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-semibold text-text-primary">General</h2>
        <p className="mb-5 text-sm text-text-muted">Platform-wide defaults and branding.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Platform Name</label>
            <input
              type="text"
              defaultValue="Insta Attend"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Support Email</label>
            <input
              type="email"
              defaultValue="support@instaattend.com"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Default Timezone</label>
            <select className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary">
              <option>Asia/Kolkata (IST)</option>
              <option>UTC</option>
              <option>America/New_York (EST)</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Default Currency</label>
            <select className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>

        <button className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white hover:bg-primary-dark">
          Save Changes
        </button>
      </div>
    </div>
  );
}