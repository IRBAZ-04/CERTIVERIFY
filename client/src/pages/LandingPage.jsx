import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { t } = useTranslation();
    const { user, isAdmin } = useAuth();

    return (
        <main>
            {/* Hero Section: Editorial Layout */}
            <section className="grid grid-cols-1 md:grid-cols-12 min-h-[870px]">
                <div className="md:col-span-7 flex flex-col justify-center px-8 md:px-12 py-20 bg-surface">
                    <span className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                        Secure Authentication System
                    </span>
                    <h1 className="font-headline text-5xl md:text-8xl leading-[0.9] tracking-tighter text-on-surface mb-8">
                        Certificate <span className="italic">Verification</span> Reimagined.
                    </h1>
                    <p className="font-body text-lg text-on-surface-variant max-w-lg mb-12 leading-relaxed">
                        CertiVerify provides organizations and students with a reliable platform to securely issue, manage, and instantly authenticate digital certificates.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 md:gap-8">
                        {user ? (
                            <>
                                <Link to="/verify" className="bg-primary-container text-on-primary px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90">
                                    Verify Certificate
                                </Link>
                                {isAdmin && (
                                    <Link to="/admin-dashboard" className="font-label text-[11px] font-bold uppercase tracking-[0.1em] flex items-center gap-2 group">
                                        Admin Dashboard
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-primary-container text-on-primary px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90">
                                    Sign In To Verify
                                </Link>
                                <Link to="/register" className="font-label text-[11px] font-bold uppercase tracking-[0.1em] flex items-center gap-2 group">
                                    Create Free Account
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="md:col-span-5 relative overflow-hidden bg-surface-container-high h-[400px] md:h-auto">
                    <img alt="Monochromatic architectural photography" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdz3WiCy5sqMtsgQdPm5hT9COLL8AV8cneJnJ8pAPwYYatIl7FRlwu3YPAk3WSYqOYHaJWRCg481H-HGmEuFMd_5X1gzbSiA76KgBBGnhvaRpkT1wPTqrR4z3NTiNdxLvdeW9EGRHn3bR8iayhazrLROdNFU9AASOIPb5DkBrFFuWRqV318pzzImuLXrdi6fvXP4WR9GnFQRzhuCrhSBxkH_BBslCDGTRQZR__PMvH5DA6Hvv7p0_0ewz-iWL1nLTxO0csM26gTpU" />
                    <div className="absolute inset-0 bg-primary/20"></div>
                    {/* Data Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 p-6 md:p-8 bg-surface-container-lowest/95 border-l-2 border-primary-container">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div>
                                <div className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                    Certificates Verified
                                </div>
                                <div className="font-headline text-xl md:text-2xl">50,000+</div>
                            </div>
                            <div>
                                <div className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                    System Uptime
                                </div>
                                <div className="font-headline text-xl md:text-2xl">99.9%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Trust Ledger Horizontal Strip */}
            <div className="hairline-b hairline-t bg-surface-container-low py-4 px-6 md:px-12 flex justify-between items-center overflow-hidden">
                <div className="font-label text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hidden sm:block">CertiVerify Global</div>
                <div className="flex gap-6 md:gap-12 whitespace-nowrap overflow-x-auto hide-scrollbar">
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full"></span> SHA-256 Encryption
                    </span>
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full"></span> ISO-27001 Compliant
                    </span>
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full"></span> 50+ Organizations
                    </span>
                </div>
                <div className="font-label text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hidden lg:block">System Status: NOMINAL</div>
            </div>
            
            {/* Bento Grid Features */}
            <section className="p-6 md:p-12 bg-surface">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/30 border-[0.5px] border-outline-variant/30">
                    <div className="bg-surface p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <span className="material-symbols-outlined text-primary text-4xl mb-8">verified_user</span>
                            <h3 className="font-headline text-3xl mb-4">Instant Verification</h3>
                            <p className="font-body text-on-surface-variant leading-relaxed">
                                Verify credentials in milliseconds with ultra-secure validation algorithms. Zero wait times for authentication.
                            </p>
                        </div>
                        <div className="hairline-t pt-6 mt-8">
                            <div className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">Feature</div>
                            <div className="font-body text-sm italic">QR Code & ID Search</div>
                        </div>
                    </div>
                    <div className="bg-surface-container-low p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <span className="material-symbols-outlined text-primary text-4xl mb-8">upload_file</span>
                            <h3 className="font-headline text-3xl mb-4">Bulk Import Tools</h3>
                            <p className="font-body text-on-surface-variant leading-relaxed">
                                Upload certificates in bulk using CSV or Excel files. Our system automatically processes and validates data rows efficiently.
                            </p>
                        </div>
                        <div className="hairline-t pt-6 mt-8">
                            <div className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">Feature</div>
                            <div className="font-body text-sm italic">Spreadsheet Parsing</div>
                        </div>
                    </div>
                    <div className="bg-surface p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <span className="material-symbols-outlined text-primary text-4xl mb-8">shield</span>
                            <h3 className="font-headline text-3xl mb-4">Fraud Detection</h3>
                            <p className="font-body text-on-surface-variant leading-relaxed">
                                Advanced multi-layer validation automatically flags forged certificates, alerting organizations of any discrepancies.
                            </p>
                        </div>
                        <div className="hairline-t pt-6 mt-8">
                            <div className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">Feature</div>
                            <div className="font-body text-sm italic">Data Integrity Checks</div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Editorial Split */}
            <section className="grid grid-cols-1 md:grid-cols-2 hairline-t">
                <div className="p-8 md:p-24 flex flex-col justify-center hairline-r">
                    <h2 className="font-headline text-4xl md:text-5xl mb-8">
                        How <span className="italic">CertiVerify</span> Works.
                    </h2>
                    <div className="space-y-10">
                        <div className="flex gap-6">
                            <span className="font-headline text-2xl text-primary/40">01</span>
                            <div>
                                <h4 className="font-label text-sm font-bold uppercase tracking-tighter mb-2">Upload Data</h4>
                                <p className="text-on-surface-variant text-sm leading-relaxed">Upload certificates individually via the dashboard form or in bulk using compliant Excel files.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <span className="font-headline text-2xl text-primary/40">02</span>
                            <div>
                                <h4 className="font-label text-sm font-bold uppercase tracking-tighter mb-2">Generate Cryptographic IDs</h4>
                                <p className="text-on-surface-variant text-sm leading-relaxed">The system mints unique, secure identifiers for every individual credential inside your organization.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <span className="font-headline text-2xl text-primary/40">03</span>
                            <div>
                                <h4 className="font-label text-sm font-bold uppercase tracking-tighter mb-2">Instant Validation</h4>
                                <p className="text-on-surface-variant text-sm leading-relaxed">Anyone can use the provided ID or QR code to query our database and confirm the credential's authenticity.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative bg-surface-container-high h-[400px] md:h-auto">
                    <img alt="Abstract 3D architectural rendering" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrFBdmfd0XVRRAywIi7EWq1TZXjqW6gLJDbjqMFphE9Yq0Htij37FArvWfxDwcS-e7-6e20FfH83djDcO6CTmiIqKHel_hu3aw3aCx-eRiIp0pvCbZC-Lh8vJgwGfeTeffWbf2W1w13eCxwLRpvJN78_92vGD2KItbI7beBtfQG0USc-dT02N4NfA-0debPJmVP1u9gQ21ROQ-4XqohyYlkXWlm0j-EkbpLNDnU_z102d7ffZKHnImPttv4PnXuyUY1OK7hJSeSM4" />
                    <div className="absolute inset-0 bg-primary/10"></div>
                </div>
            </section>
            
            {/* Final CTA: The Vault */}
            <section className="bg-primary text-white p-8 md:p-32 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block text-primary-fixed">Begin Now</span>
                    <h2 className="font-headline text-4xl md:text-7xl mb-10 leading-tight">
                        Start managing certificates <span className="italic">properly today.</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        {user ? (
                            <>
                                <Link to="/verify" className="bg-white text-primary px-8 md:px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-surface-container-low transition-colors inline-block">
                                    Go To Validation Portal
                                </Link>
                                {isAdmin && (
                                    <Link to="/admin-dashboard" className="bg-transparent text-white border border-white/40 px-8 md:px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors inline-block">
                                        Admin Dashboard
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="bg-white text-primary px-8 md:px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-surface-container-low transition-colors inline-block">
                                    Create Free Account
                                </Link>
                                <Link to="/login" className="bg-transparent text-white border border-white/40 px-8 md:px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors inline-block">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 border-[0.5px] border-white/5 -mr-48 -mt-48 rotate-45 hidden md:block"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border-[0.5px] border-white/5 -ml-32 -mb-32 rotate-12 hidden md:block"></div>
            </section>
        </main>
    );
};

export default LandingPage;