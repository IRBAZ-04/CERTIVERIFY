import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const links = {
    product: [
      { label: t('footer.product'), to: '/verify' },
      { label: t('nav.aiScan'), to: '/fraud-scan' },
      { label: t('nav.portfolio'), to: '/portfolio' },
      { label: t('nav.login'), to: '/login' },
    ],
    legal: [
      { label: t('footer.privacy'), to: '#' },
      { label: t('footer.terms'), to: '#' },
    ]
  };

  return (
    <footer className="relative mt-auto">

      {/* top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-border)]/40 to-transparent" />

      <div className="bg-[var(--theme-surface)] border-t border-[var(--theme-border)]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center border border-[var(--theme-border)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                </div>
                <span className="font-semibold text-lg text-[var(--theme-text-primary)] tracking-tight">
                  {t('footer.brand')}
                </span>
              </Link>

              <p className="text-sm text-[var(--theme-text-secondary)] max-w-xs leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider mb-4">
                {t('footer.product')}
              </h4>
              <ul className="space-y-2">
                {links.product.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-all duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider mb-4">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-2">
                {links.legal.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-all duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-[var(--theme-border)] gap-4">
            <p className="text-xs text-[var(--theme-text-secondary)]">
              © {year} {t('footer.brand')}. {t('footer.rights')}
            </p>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;