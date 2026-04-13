import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { downloadCertificatePDF } from '../utils/downloadUtils';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const VerifyPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const certIdQuery = searchParams.get('id');

    const [certId, setCertId] = useState(certIdQuery || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (certIdQuery) handleSearch(null, certIdQuery);
    }, [certIdQuery]);

    const handleSearch = async (e, idToSearch = certId) => {
        if (e) e.preventDefault();
        if (!idToSearch.trim()) return;

        setLoading(true);
        setSearched(true);
        setResult(null);
        setSearchParams({ id: idToSearch });

        try {
            await API.get(`/certificates/validate/${idToSearch}`);
            setResult({ valid: true, cert: { certId: idToSearch }, downloaded: false });
        } catch (err) {
            setResult({
                valid: false,
                message: err.message || 'Certificate record could not be found.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-8rem)] py-16 px-6 md:px-12 bg-background flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Header Section */}
            <div className="text-center max-w-4xl w-full mb-16 relative z-10">
                <div className="inline-flex items-center justify-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-primary text-2xl">shield_check</span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">Certificate Verification System</span>
                </div>
                <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight tracking-tight mb-8">
                    Verify Authenticity
                </h1>
                <p className="text-on-surface-variant text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
                    Enter a certificate identifier below to validate its authenticity against our secure database.
                </p>
            </div>

            {/* Centered Search Box */}
            <div className="w-full max-w-3xl mb-20 relative z-10">
                <div className="bg-surface border-[0.5px] border-outline-variant/50 p-4 shadow-xl shadow-on-surface/5 relative overflow-hidden hover:border-primary/50 transition-colors duration-500 rounded-none">
                    <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-4 w-full">
                        <motion.div 
                            className="relative flex-1 flex items-center bg-transparent border-[0.5px] transition-colors"
                            initial={{ borderColor: "rgba(var(--theme-outline-variant), 0.5)" }}
                            whileFocus={{ borderColor: "rgba(var(--theme-accent-primary), 1)", boxShadow: "0 0 0 2px rgba(var(--theme-accent-primary), 0.2)" }}
                            whileHover={{ borderColor: "rgba(var(--theme-accent-primary), 0.5)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="material-symbols-outlined absolute left-6 text-on-surface-variant/50">search</span>
                            <motion.input 
                                type="text"
                                placeholder="ENTER CERTIFICATE ID (e.g. CERT-2024-001)"
                                className="w-full bg-transparent border-none py-6 pl-16 pr-6 text-sm md:text-base font-bold uppercase tracking-[0.1em] font-body focus:ring-0 placeholder:text-on-surface-variant/40 text-on-surface outline-none"
                                value={certId}
                                onChange={(e) => setCertId(e.target.value)}
                            />
                        </motion.div>
                        <motion.button 
                            type="submit" 
                            disabled={loading || !certId.trim()}
                            whileHover={!loading && certId.trim() ? { scale: 1.02 } : {}}
                            whileTap={!loading && certId.trim() ? { scale: 0.95 } : {}}
                            transition={{ duration: 0.2 }}
                            className="bg-primary text-white px-12 py-6 text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-primary-container disabled:opacity-50 shrink-0 flex items-center justify-center gap-3 outline-none border-none"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-[16px]">refresh</span>
                                    Scanning
                                </>
                            ) : (
                                'Verify'
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="w-[100%] max-w-[800px] mt-4 z-10 relative">
                {loading && (
                    <div className="bg-surface-container-low border-[0.5px] border-outline-variant/30 p-12 text-center flex flex-col items-center justify-center animate-pulse w-full">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4 animate-spin">refresh</span>
                        <h3 className="font-headline text-2xl text-on-surface mb-2">Querying Database...</h3>
                        <p className="text-xs text-on-surface-variant font-body">Verifying cryptographic hash</p>
                    </div>
                )}

                <AnimatePresence mode="wait">
                {searched && !loading && result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full"
                    >
                        {result.valid ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1, boxShadow: ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 45px rgba(16, 185, 129, 0.4)", "0px 0px 0px rgba(16, 185, 129, 0.05)"] }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="bg-surface border-[0.5px] border-primary/20 shadow-2xl shadow-primary/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row items-center gap-6 mb-10 w-full">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                                        </div>
                                        <div className="text-center md:text-left flex-grow">
                                            <h2 className="font-headline text-3xl text-on-surface font-bold mb-2">Valid Certificate</h2>
                                            <p className="text-sm text-primary font-bold font-body">✓ Record successfully authenticated</p>
                                        </div>
                                        <motion.button 
                                            onClick={() => {
                                                downloadCertificatePDF(result.cert.certId);
                                                setResult(prev => ({ ...prev, downloaded: true }));
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-primary text-white hover:bg-primary-container px-6 py-4 flex items-center justify-center gap-3 shrink-0 outline-none w-full md:w-auto border-none"
                                        >
                                            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                                                {result.downloaded ? 'Re-Download' : 'Download PDF'}
                                            </span>
                                            <span className="material-symbols-outlined text-[18px]">
                                                {result.downloaded ? 'download_done' : 'download'}
                                            </span>
                                        </motion.button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/30 border-[0.5px] border-outline-variant/30 w-full mt-4">
                                        <div className="bg-surface p-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2">Reference ID</p>
                                            <p className="font-mono text-sm font-bold text-on-surface">{result.cert.certId}</p>
                                        </div>
                                        <div className="bg-surface p-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2">Validated By</p>
                                            <p className="font-body text-sm font-bold text-on-surface">CertiVerify Secure Protocol</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ x: 0 }}
                                animate={{ x: [-10, 10, -8, 8, -4, 4, 0] }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="bg-error/5 border-[0.5px] border-error/30 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
                                <div className="p-8 md:p-12 text-center">
                                    <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-error text-4xl">error</span>
                                    </div>
                                    <h2 className="font-headline text-3xl text-error font-bold mb-4">Verification Failed</h2>
                                    <p className="text-sm text-on-surface-variant font-body mb-8 max-w-sm mx-auto">
                                        {result.message}
                                    </p>
                                    <div className="inline-flex items-center gap-2 border-[0.5px] border-error/20 bg-surface px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                        Searched ID: <span className="font-mono text-error">{certId}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        
                        <div className="mt-8 flex justify-center">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {setSearched(false); setCertId(''); setResult(null);}} 
                                className="text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 outline-none"
                            >
                                <span className="material-symbols-outlined text-[14px]">refresh</span> Verify Another Document
                            </motion.button>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            
            {/* Background design elements */}
            <div className="fixed top-1/2 left-0 w-64 h-64 border-[0.3px] border-outline-variant/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="fixed top-1/2 right-0 w-[500px] h-[500px] border-[0.3px] border-outline-variant/20 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        </main>
    );
};

export default VerifyPage;
