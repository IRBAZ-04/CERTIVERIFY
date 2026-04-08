import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  Upload
} from 'lucide-react';
import { cn } from '../../utils/cn';

const sidebarItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/verify', label: 'Verify', icon: Search },
  { to: '/upload-excel', label: 'Bulk Upload', icon: Upload },
  { to: '/excel-upload', label: 'Excel Upload', icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24">
        <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 shadow-[var(--theme-shadow-sm)]">
          <div className="mb-5 px-2">
            <h2 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider">
              Navigation
            </h2>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[var(--theme-accent-primary)] text-white shadow-sm'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]',
                  )
                }
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
