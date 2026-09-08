import { Bell, CircleHelp, Search, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-white px-6">
      <div className="relative w-[360px]">
        <Search size={17} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input type="text" placeholder="Search organizations..." className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary" />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-primary">
          <Bell size={19} strokeWidth={1.8} />
          <span className="absolute right-[8px] top-[6px] h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-text-primary">
          <CircleHelp size={18} strokeWidth={1.8} />
        </button>
        <button className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-avatar-bg text-sm font-semibold text-primary-dark">MA</div>
          <div className="text-left">
            <p className="text-sm font-semibold text-text-primary">Master Admin</p>
            <p className="text-2xs text-text-muted">Platform Administrator</p>
          </div>
          <ChevronDown size={15} strokeWidth={1.8} className="ml-2 text-text-muted" />
        </button>
      </div>
    </header>
  );
}