import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const links = {
    product: [
      { label: t('nav.verify'), to: '/verify' },
      { label: t('nav.signIn'), to: '/login' },
      { label: t('login.signUp'), to: '/register' }
    ],
    legal: [
      { label: t('footer.privacy'), to: '#' },
      { label: t('footer.terms'), to: '#' },
    ]
  };

  return (
    <footer className="relative mt-auto">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-border)]/50 to-transparent" />

      <div className="bg-[var(--theme-surface)] border-t border-[var(--theme-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--theme-accent-primary)] to-[var(--theme-accent-hover)] flex items-center justify-center shadow-md">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-xl text-[var(--theme-text-primary)] tracking-tight">
                  {t('footer.brand')}
                </span>
              </Link>

              <p className="text-sm text-[var(--theme-text-secondary)] max-w-sm leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider mb-5">
                {t('footer.product')}
              </h4>
              <ul className="space-y-3">
                {links.product.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent-primary)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider mb-5">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-3">
                {links.legal.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent-primary)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[var(--theme-border)] gap-4">
            <p className="text-sm text-[var(--theme-text-muted)]">
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
