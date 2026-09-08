import { useState } from "react";

function ToggleRow({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-4">
      <div className="pr-4">
        <p className="text-base font-medium text-text-primary">{title}</p>
        <p className="mt-0.5 text-sm text-text-muted">{description}</p>
      </div>

      <button
        onClick={() => setChecked((c) => !c)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-semibold text-text-primary">Password</h2>
        <p className="mb-5 text-sm text-text-muted">Change your account password.</p>

        <div className="space-y-4 sm:max-w-sm">
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Current Password</label>
            <input
              type="password"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">New Password</label>
            <input
              type="password"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            />
          </div>
        </div>

        <button className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white hover:bg-primary-dark">
          Update Password
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-semibold text-text-primary">Account Security</h2>
        <p className="mb-2 text-sm text-text-muted">Manage additional layers of protection.</p>

        <div className="divide-y divide-border">
          <ToggleRow
            title="Two-Factor Authentication"
            description="Require a verification code in addition to your password"
            defaultChecked
          />
          <ToggleRow
            title="Login Alerts"
            description="Get notified by email when a new device signs in"
            defaultChecked
          />
          <ToggleRow
            title="Session Timeout"
            description="Automatically sign out after 30 minutes of inactivity"
          />
        </div>
      </div>
    </div>
  );
}