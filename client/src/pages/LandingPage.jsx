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
  ShieldCheck
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useTranslation } from 'react-i18next';

const FloatingOrb = ({ delay, size, x, y, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} opacity-20 blur-3xl`}
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

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
  >
    <Card hover className="h-full group">
      <CardContent className="p-8">
        <motion.div 
          className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--theme-accent-primary)] to-[var(--theme-accent-hover)] flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>
        <h4 className="text-xl font-bold text-[var(--theme-text-primary)] mb-3">{title}</h4>
        <p className="text-[var(--theme-text-secondary)] leading-relaxed text-sm">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const stats = [
  { value: "50K+", label: "Certificates Verified", icon: FileCheck },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "50+", label: "Organizations", icon: Globe },
  { value: "24/7", label: "Support", icon: Zap },
];

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

      {/* HERO */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 text-center py-32 md:py-48 z-10">
        <motion.div
          style={{ y: yHero }}
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-10 max-w-5xl mx-auto"
        >
          <motion.div 
            variants={itemVars}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[var(--theme-accent-primary)]/20 to-[var(--theme-accent-gold)]/20 text-[var(--theme-accent-primary)] border border-[var(--theme-accent-primary)]/30 backdrop-blur-sm"
          >
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Shield className="h-4 w-4" />
            </motion.span>
            {t('landing.badge')}
          </motion.div>

          <motion.div variants={itemVars} className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--theme-text-primary)] leading-[1.05] tracking-tight">
              {t('landing.headlineMain')}{' '}
              <span className="text-gradient-gold relative">
                {t('landing.headlineAccent')}
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--theme-accent-gold)] to-[var(--theme-accent-primary)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p variants={itemVars} className="text-[var(--theme-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
            {t('landing.subtext')}
          </motion.p>

          <motion.div
            variants={itemVars}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
          >
            {userInfo ? (
              <Link to="/verify">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button size="xl" className="gap-3 bg-gradient-to-r from-[var(--theme-button-primary-bg)] to-[var(--theme-accent-hover)]">
                    Verify Certificate
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button size="xl" className="gap-3 bg-gradient-to-r from-[var(--theme-button-primary-bg)] to-[var(--theme-accent-hover)]">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVars}
            className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-[var(--theme-border)]/50"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                  <span className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)]">{stat.value}</span>
                </div>
                <span className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

      {/* MARQUEE */}
      <motion.div 
        className="border-y border-[var(--theme-border)] py-6 bg-[var(--theme-surface)]/30 backdrop-blur-sm relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex animate-[scroll_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12 whitespace-nowrap">
              {[
                t('landing.marquee.verify'),
                t('landing.marquee.fraud'),
                t('landing.marquee.qr'),
                t('landing.marquee.instant'),
                t('landing.marquee.multi'),
                t('landing.marquee.analytics')
              ].map((item, j) => (
                <span key={j} className="flex items-center gap-8 text-sm text-[var(--theme-text-muted)] uppercase tracking-[0.2em] font-semibold">
                  <ShieldCheck className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* FEATURES */}
      <section className="py-32 md:py-48 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6"
              whileInView={{ scale: [0.8, 1] }}
            >
              <Zap className="h-3.5 w-3.5" />
              {t('landing.features.badge')}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-6">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg text-[var(--theme-text-secondary)] max-w-xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award, title: t('landing.features.items.verif.title'), desc: t('landing.features.items.verif.desc') },
              { icon: Shield, title: t('landing.features.items.fraud.title'), desc: t('landing.features.items.fraud.desc') },
              { icon: QrCode, title: t('landing.features.items.qr.title'), desc: t('landing.features.items.qr.desc') },
              { icon: Search, title: t('landing.features.items.records.title'), desc: t('landing.features.items.records.desc') },
              { icon: Users, title: t('landing.features.items.access.title'), desc: t('landing.features.items.access.desc') },
              { icon: UploadCloud, title: t('landing.features.items.bulk.title'), desc: t('landing.features.items.bulk.desc') },
            ].map((item, i) => (
              <FeatureCard key={i} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-accent-primary)]/10 via-transparent to-[var(--theme-accent-gold)]/10 rounded-3xl blur-3xl" />
          <div className="relative bg-[var(--theme-surface)]/80 backdrop-blur-xl border border-[var(--theme-border)] rounded-3xl p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[var(--theme-accent-gold-soft-bg)] to-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-gold)] mb-8"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Get Started Today
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-8 tracking-tight">
              Ready to Transform Your Certificate Management?
            </h2>
            <p className="text-lg text-[var(--theme-text-secondary)] mb-12 max-w-xl mx-auto">
              Join thousands of organizations that trust CertiVerify for secure, instant certificate verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/register">
                  <Button size="xl" variant="gold" className="gap-3 min-w-[220px]">
                    <Lock className="h-5 w-5" />
                    Create Account
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/verify">
                  <Button size="xl" variant="outline" className="gap-3 min-w-[220px]">
                    <Search className="h-5 w-5" />
                    Verify Certificate
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