import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full px-12 py-16 flex flex-col md:flex-row justify-between items-end bg-surface-container-low rounded-none border-t-[0.5px] border-outline-variant/50 relative z-10 block">
            <div className="w-full md:w-auto mb-12 md:mb-0">
                <div className="text-sm font-bold text-on-surface uppercase mb-6 font-headline tracking-tighter">CertiVerify</div>
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.05em] text-on-surface/50 max-w-xs leading-relaxed">
                    © {new Date().getFullYear()} CERTIVERIFY. SECURE CERTIFICATE VERIFICATION SYSTEM.
                </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 justify-end font-label text-[11px] font-bold uppercase tracking-[0.05em]">
                <Link to="#" className="text-on-surface/50 hover:text-on-surface hover:underline decoration-[0.5px] underline-offset-4 transition-colors">Digital System</Link>
                <Link to="#" className="text-on-surface/50 hover:text-on-surface hover:underline decoration-[0.5px] underline-offset-4 transition-colors">Privacy Policy</Link>
                <Link to="#" className="text-on-surface/50 hover:text-on-surface hover:underline decoration-[0.5px] underline-offset-4 transition-colors">Terms of Use</Link>
                <Link to="#" className="text-on-surface/50 hover:text-on-surface hover:underline decoration-[0.5px] underline-offset-4 transition-colors">Verification Process</Link>
                <Link to="/verify" className="text-on-surface/50 hover:text-on-surface hover:underline decoration-[0.5px] underline-offset-4 transition-colors">Verify Certificate</Link>
            </div>
        </footer>
    );
};

export default Footer;
