// src/components/layout/Header.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CircleHelp, Search, ChevronDown } from "lucide-react";
import { searchGlobal, typeConfig } from "../../lib/searchIndex";
import type { SearchResultType } from "../../lib/searchIndex";

export default function Header() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchGlobal(query), [query]);

  const groupedResults = useMemo(() => {
    const groups = new Map<SearchResultType, typeof results>();
    for (const result of results) {
      const existing = groups.get(result.type) ?? [];
      groups.set(result.type, [...existing, result]);
    }
    return Array.from(groups.entries());
  }, [results]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = results[activeIndex];
      if (active) handleSelect(active.path);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-white px-6">
      <div className="relative w-[360px]" ref={containerRef}>
        <Search size={17} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search organizations, licenses, admins..."
          className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
        />

        {open && query.trim() !== "" && (
          <div className="absolute left-0 right-0 top-12 z-50 max-h-[420px] overflow-y-auto rounded-xl border border-border bg-white py-2 shadow-lg">
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-text-muted">
                No results for "{query}"
              </p>
            ) : (
              groupedResults.map(([type, items]) => {
                const config = typeConfig[type];
                const Icon = config.icon;
                return (
                  <div key={type} className="px-2 py-1">
                    <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {config.label}
                    </p>
                    {items.map((item) => {
                      const globalIndex = results.indexOf(item);
                      const isActive = globalIndex === activeIndex;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => handleSelect(item.path)}
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left ${
                            isActive ? "bg-primary-light" : "hover:bg-primary-light"
                          }`}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-avatar-bg text-primary-dark">
                            <Icon size={15} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-base font-medium text-text-primary">{item.title}</p>
                            <p className="truncate text-sm text-text-muted">{item.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        )}
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