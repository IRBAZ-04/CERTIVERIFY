import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  UploadCloud,
  Lock,
  Shield,
  Award,
  CheckCircle2,
  QrCode,
  FileCheck,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Cloud,
  Gauge,
  Eye,
  Workflow,
  Layers,
  BadgeCheck
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useTranslation } from 'react-i18next';

const FloatingOrb = ({ delay, size, x, y, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} opacity-15 blur-3xl`}
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <FloatingOrb delay={0} size={400} x="10%" y="20%" color="bg-emerald-500" />
    <FloatingOrb delay={2} size={300} x="70%" y="60%" color="bg-amber-500" />
    <FloatingOrb delay={4} size={200} x="30%" y="70%" color="bg-emerald-400" />
    <FloatingOrb delay={1} size={250} x="80%" y="10%" color="bg-amber-400" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--theme-background)_70%)]" />
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card hover className="h-full group">
      <CardContent className="p-6 md:p-8">
        <div 
          className="h-12 w-12 rounded-xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:shadow-md"
        >
          <Icon className="h-6 w-6 text-[var(--theme-accent-primary)]" />
        </div>
        <h4 className="text-lg md:text-xl font-semibold text-[var(--theme-text-primary)] mb-2">{title}</h4>
        <p className="text-[var(--theme-text-secondary)] leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

// Step Card for "How It Works"
const StepCard = ({ number, icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="relative flex items-start gap-6"
  >
    <div className="flex-shrink-0 flex flex-col items-center">
      <div className="h-14 w-14 rounded-full bg-[var(--theme-accent-primary)] flex items-center justify-center text-white font-bold text-lg shadow-md">
        {number}
      </div>
      {index < 2 && (
        <motion.div 
          className="w-1 h-12 bg-gradient-to-b from-[var(--theme-accent-primary)] to-[var(--theme-accent-primary)]/30 mt-2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
        />
      )}
    </div>
    <div className="pt-2 flex-1">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 text-[var(--theme-accent-primary)]" />
        <h4 className="font-semibold text-[var(--theme-text-primary)]">{title}</h4>
      </div>
      <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// Benefit Card
const BenefitCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex gap-4 p-6 rounded-xl bg-[var(--theme-surface)]/50 border border-[var(--theme-border)] hover:border-[var(--theme-accent-primary)]/30 transition-colors duration-300"
  >
    <Icon className="h-6 w-6 text-[var(--theme-accent-primary)] flex-shrink-0 mt-1" />
    <div>
      <h4 className="font-semibold text-[var(--theme-text-primary)] mb-1">{title}</h4>
      <p className="text-sm text-[var(--theme-text-secondary)]">{desc}</p>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  
  const yHero = useTransform(scrollY, [0, 500], [0, 100]);
  const yBg = useTransform(scrollY, [0, 500], [0, -50]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="bg-[var(--theme-background)] min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground />

      {/* ============ HERO SECTION ============ */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 text-center py-20 md:py-32 z-10 min-h-screen">
        <motion.div
          style={{ y: yHero }}
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-6 md:space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] border border-[var(--theme-accent-primary)]/30"
          >
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Shield className="h-4 w-4" />
            </motion.span>
            {t('landing.badge')}
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVars} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--theme-text-primary)] leading-[1.1] tracking-tight">
              {t('landing.headlineMain')}{' '}
              <span className="text-[var(--theme-accent-primary)]">
                {t('landing.headlineAccent')}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={itemVars} className="text-base md:text-lg text-[var(--theme-text-secondary)] max-w-2xl leading-relaxed">
            {t('landing.subtext')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVars}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {userInfo ? (
              <>
                <Link to="/verify">
                  <Button size="lg" variant="primary" className="gap-2">
                    <Search className="h-5 w-5" />
                    Verify Certificate
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" variant="primary" className="gap-2">
                    <ArrowRight className="h-5 w-5" />
                    Sign In to Verify
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVars}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full mt-8 pt-8 border-t border-[var(--theme-border)]/50"
          >
            {[
              { value: "50K+", label: "Certificates Verified" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Organizations" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-center"
              >
                <span className="block text-xl md:text-2xl font-bold text-[var(--theme-text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--theme-border)] flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-[var(--theme-accent-primary)] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ MARQUEE SECTION ============ */}
      <motion.div 
        className="border-y border-[var(--theme-border)] py-6 bg-[var(--theme-surface)]/50 backdrop-blur-sm relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex animate-[scroll_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12 whitespace-nowrap">
              {[
                '✓ Certificate Verification',
                '✓ Fraud Detection',
                '✓ QR Code Scanning',
                '✓ Instant Results',
                '✓ Multi-Org Support',
                '✓ Secure Records'
              ].map((item, j) => (
                <span key={j} className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider font-semibold">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6"
              whileInView={{ scale: [0.8, 1] }}
            >
              <Zap className="h-3.5 w-3.5" />
              Core Features
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4">
              Powerful Capabilities
            </h2>
            <p className="text-base md:text-lg text-[var(--theme-text-secondary)]">
              Everything you need for secure certificate management and verification
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Instant Verification", desc: "Verify credentials in milliseconds with ultra-secure validation." },
              { icon: Shield, title: "Fraud Detection", desc: "Advanced algorithms detect fraudulent certificates automatically." },
              { icon: QrCode, title: "QR Code Scanning", desc: "Generate and scan QR codes for quick certificate verification." },
              { icon: Search, title: "Advanced Search", desc: "Powerful search and filtering for certificate records." },
              { icon: Users, title: "Multi-User Access", desc: "Role-based access control for teams and organizations." },
              { icon: UploadCloud, title: "Bulk Upload", desc: "Import certificates in bulk with CSV or Excel files." },
            ].map((item, i) => (
              <FeatureCard key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS SECTION ============ */}
      <section className="py-16 md:py-24 relative z-10 bg-[var(--theme-surface)]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6"
              whileInView={{ scale: [0.8, 1] }}
            >
              <Workflow className="h-3.5 w-3.5" />
              Simple Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-[var(--theme-text-secondary)]">
              Follow these simple steps to verify or manage certificates
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            <StepCard 
              number="1" 
              icon={UploadCloud}
              title="Upload Data" 
              desc="Upload certificates individually or in bulk using CSV/Excel files. Our system supports multiple formats and automatic validation." 
              index={0}
            />
            <StepCard 
              number="2" 
              icon={Layers}
              title="Generate Certificate" 
              desc="Generate secure certificates with unique identifiers, digital signatures, and QR codes for easy verification and tracking." 
              index={1}
            />
            <StepCard 
              number="3" 
              icon={Search}
              title="Verify Using ID" 
              desc="Enter the certificate ID or scan the QR code to instantly verify authenticity and view certificate details and history." 
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ============ BENEFITS SECTION ============ */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6"
              whileInView={{ scale: [0.8, 1] }}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              Why Choose Us
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4">
              Key Benefits
            </h2>
            <p className="text-base md:text-lg text-[var(--theme-text-secondary)]">
              Built for organizations that demand reliability and security
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard 
              icon={Lock}
              title="Enterprise Security"
              desc="SHA-256 encryption, secure validations, and compliance with industry standards."
              index={0}
            />
            <BenefitCard 
              icon={Gauge}
              title="Fast Verification"
              desc="Instant results with optimized database queries and real-time processing."
              index={1}
            />
            <BenefitCard 
              icon={Shield}
              title="Fraud Prevention"
              desc="Advanced detection algorithms and multi-layer validation to prevent forgery."
              index={2}
            />
            <BenefitCard 
              icon={Cloud}
              title="Scalable Infrastructure"
              desc="Handles millions of certificates with consistent performance and 99.9% uptime."
              index={3}
            />
            <BenefitCard 
              icon={Users}
              title="Multi-Organization Support"
              desc="Manage multiple organizations and users with granular permission controls."
              index={4}
            />
            <BenefitCard 
              icon={FileCheck}
              title="Comprehensive Records"
              desc="Complete audit trails, verification history, and detailed analytics for all certificates."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION SECTION ============ */}
      <section className="py-16 md:py-24 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-accent-primary)]/10 via-transparent to-[var(--theme-accent-primary)]/10 rounded-2xl blur-3xl" />
          <div className="relative bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ready to Get Started?
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] mb-4 tracking-tight">
              Start Verifying Certificates Today
            </h2>
            
            <p className="text-base md:text-lg text-[var(--theme-text-secondary)] mb-8 max-w-xl mx-auto">
              Join thousands of organizations using CertiVerify for secure, reliable certificate verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to={userInfo ? "/verify" : "/login"}>
                  <Button size="lg" variant="primary" className="gap-2">
                    <ArrowRight className="h-5 w-5" />
                    {userInfo ? "Verify Certificate" : "Create Free Account"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;