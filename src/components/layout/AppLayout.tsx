import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const navItems = [
  ["Trending", "/trending"],
  ["AI Insights", "/ai-insights"],
  ["In Your Area", "/nearby"],
  ["World", "/category/World"],
  ["Technology", "/category/Technology"],
  ["Business", "/category/Business"],
  ["Science", "/category/Science"],
];

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors dark:bg-midnight dark:text-white">
      <header className="sticky top-0 z-40 border-b border-black/[.07] bg-paper/90 backdrop-blur-xl dark:border-white/[.08] dark:bg-midnight/90">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-signal text-sm font-black text-white shadow-lg shadow-signal/20">
              S
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-paper bg-white dark:border-midnight" />
            </span>
            <span className="font-serif text-2xl tracking-tight">Signal</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? "text-signal" : "text-muted hover:text-ink dark:text-slate-400 dark:hover:text-white"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={submitSearch} className="hidden items-center rounded-full border border-black/10 bg-white/60 px-3 py-2 focus-within:border-signal dark:border-white/10 dark:bg-white/[.04] sm:flex">
              <Search size={16} className="text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the signal"
                className="w-32 bg-transparent px-2 text-xs outline-none placeholder:text-muted lg:w-44"
              />
              <kbd className="hidden rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-muted dark:bg-white/10 sm:block">⌘ K</kbd>
            </form>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-black/5 hover:text-signal dark:text-slate-400 dark:hover:bg-white/10">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation" className="flex h-10 w-10 items-center justify-center rounded-full text-muted lg:hidden">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="animate-fade-in border-t border-black/10 bg-paper px-5 py-6 dark:border-white/10 dark:bg-midnight lg:hidden">
            <form onSubmit={submitSearch} className="mb-5 flex items-center rounded-xl border border-black/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[.05]">
              <Search size={17} className="text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the signal"
                className="w-full bg-transparent px-3 text-sm outline-none"
              />
            </form>
            <nav className="grid gap-1">
              {[...navItems, ["Bookmarks", "/bookmarks"], ["Intelligence", "/intelligence/night-cities"]].map(([label, href]) => (
                <NavLink key={href} onClick={() => setMobileOpen(false)} to={href} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-black/5 dark:hover:bg-white/5">
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="border-t border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/[.02]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-xs font-black text-white">S</span>
              <span className="font-serif text-2xl">Signal</span>
            </div>
            <p className="mt-3 text-sm text-muted dark:text-slate-500">News, understood.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-muted dark:text-slate-400">
            <Link to="/trending" className="hover:text-signal">Trending</Link>
            <Link to="/ai-insights" className="hover:text-signal">AI Insights</Link>
            <Link to="/nearby" className="hover:text-signal">In Your Area</Link>
            <Link to="/bookmarks" className="hover:text-signal">Bookmarks</Link>
            <Link to="/intelligence/night-cities" className="hover:text-signal">Intelligence</Link>
            <span>Fictional editorial demo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
