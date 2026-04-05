import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  ShieldCheck,
  Users,
  FileText
} from 'lucide-react';
import { cn } from '../../utils/cn';

const sidebarItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/verify', label: 'Verify', icon: Search },
  { to: '/fraud-scan', label: 'AI Scan', icon: ShieldCheck },
  { to: '/portfolio', label: 'Portfolio', icon: Users },
  { to: '/certificate', label: 'Certificates', icon: FileText }
];

export default function Sidebar() {
  return (
    <aside className="hidden xl:block w-72 sticky top-24 h-[calc(100vh-6rem)]">

      <div className="relative h-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-[var(--theme-shadow-lg)]">

        <div className="absolute inset-0 rounded-2xl bg-[var(--theme-hover-surface)]/15 pointer-events-none" />

        <div className="relative mb-6 px-2">
          <h2 className="text-xs font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider">
            Navigation
          </h2>
        </div>

        <nav className="relative flex flex-col gap-1">
          {sidebarItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] shadow-[var(--theme-shadow-sm)]'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]',
                  'active:scale-[0.98]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-4 w-4 transition',
                      isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    )}
                    aria-hidden
                  />
                  <span className="tracking-tight">{label}</span>
                  <span
                    className={cn(
                      'ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent-primary)] transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    )}
                    aria-hidden
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

      </div>
    </aside>
  );
}
