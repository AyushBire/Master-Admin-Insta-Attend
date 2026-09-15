import { useEffect, useRef, useState } from "react";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import SettingsDrawer from "./SettingsDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    // TODO (future): wire to real auth/session teardown once backend exists.
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 shadow-[var(--shadow-soft)] transition-all hover:border-primary/30 hover:shadow-[var(--shadow-raised)]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white gradient-primary">
            MA
          </span>
          <span className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-text-primary">Master Admin</p>
            <p className="text-2xs leading-tight text-text-muted">Platform Administrator</p>
          </span>
          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className={`text-text-muted transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-raised)]">
            <div className="border-b border-border px-4 py-3">
              <p className="truncate text-sm font-semibold text-text-primary">Master Admin</p>
              <p className="truncate text-xs text-text-muted">admin@instaattend.com</p>
            </div>

            <button
              onClick={() => { setMenuOpen(false); setSettingsOpen(true); }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-primary/10 hover:text-primary-dark"
            >
              <Settings size={16} strokeWidth={1.8} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-error transition-colors hover:bg-error-bg"
            >
              <LogOut size={16} strokeWidth={1.8} />
              Logout
            </button>
          </div>
        )}
      </div>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}