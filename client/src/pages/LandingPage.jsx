import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  UploadCloud,
  Lock,
  Shield,
  Globe,
  Award,
  CheckCircle2,
  QrCode,
  FileCheck,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useTranslation } from 'react-i18next';


const LandingPage = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  // Framer motion variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <div className="bg-[var(--theme-background)] min-h-screen flex flex-col relative overflow-hidden">

      {/* Dynamic Background Mesh / Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--theme-accent-primary)]/10 blur-[120px] rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -60, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-rose-500/10 blur-[140px] rounded-full mix-blend-multiply"
        />
      </div>

      {/* HERO */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 text-center py-32 z-10">

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-center space-y-8 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-[var(--theme-surface)]/80 backdrop-blur-md text-[var(--theme-accent-primary)] shadow-[var(--theme-shadow-sm)] border border-[var(--theme-border)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-accent-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-accent-primary)]"></span>
            </span>
            {t('landing.badge')}
          </motion.div>

          <motion.h1 variants={itemVars} className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-[var(--theme-text-primary)] leading-[1.05] tracking-tight">
            {t('landing.headlineMain')} <br className="hidden sm:block" />
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent-primary)] to-rose-400"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('landing.headlineAccent')}
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVars} className="text-[var(--theme-text-secondary)] text-lg sm:text-xl max-w-2xl leading-relaxed font-medium">
            {t('landing.subtext')}
          </motion.p>

          <motion.div
            variants={itemVars}
            className="flex items-center justify-center gap-4 mt-6 whitespace-nowrap"
          >
            {userInfo && (
                <Link to="/verify" className="flex-shrink-0">
                  <Button
                    size="lg"
                    className="h-12 px-6 text-sm flex items-center gap-2 rounded-xl whitespace-nowrap"
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      Verify Certificate
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </span>
                  </Button>
                </Link>
            )}
          </motion.div>

          <motion.div variants={itemVars} className="mt-12 flex flex-wrap justify-center gap-8 text-xs font-bold text-[var(--theme-text-muted)] tracking-widest uppercase">
            {[
              { label: t('landing.badges.secured'), icon: CheckCircle2 },
              { label: t('landing.badges.qr'), icon: CheckCircle2 },
              { label: t('landing.badges.ai'), icon: CheckCircle2 },
              { label: t('landing.badges.multi'), icon: CheckCircle2 },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-2 group cursor-pointer hover:text-[var(--theme-text-primary)] transition-colors">
                <b.icon className="h-4 w-4 text-[var(--theme-accent-primary)] group-hover:scale-110 transition-transform" />
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[var(--theme-border)] py-6 bg-[var(--theme-surface)]/60 backdrop-blur-md overflow-hidden relative z-10">
        <div className="marquee-track flex">
          {[
            t('landing.marquee.verify'),
            t('landing.marquee.fraud'),
            t('landing.marquee.qr'),
            t('landing.marquee.instant'),
            t('landing.marquee.multi'),
            t('landing.marquee.analytics')
          ].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-12 px-12 text-xs text-[var(--theme-text-muted)] uppercase tracking-[0.3em] whitespace-nowrap font-black">
              {item}
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="h-2 w-2 rounded-full bg-[var(--theme-accent-primary)]"
              />
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES with Parallax scrolling effect */}
      <section className="bg-[var(--theme-hover-surface)]/30 backdrop-blur-sm py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-[var(--theme-accent-primary)] font-black tracking-widest uppercase text-sm mb-4">{t('landing.features.badge')}</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight">{t('landing.features.title')}</h3>
            <p className="mt-6 text-xl text-[var(--theme-text-secondary)] font-medium">{t('landing.features.subtitle')}</p>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card hover className="h-full border-[var(--theme-border)] shadow-[var(--theme-shadow-md)] bg-white/50 dark:bg-black/20 backdrop-blur-lg">
                  <CardContent className="p-10 flex flex-col items-start">
                    <div className="h-14 w-14 rounded-2xl bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] flex items-center justify-center mb-8 shadow-inner">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">{item.title}</h4>
                    <p className="text-[var(--theme-text-secondary)] leading-relaxed font-medium">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 relative z-10 overflow-hidden">
        <motion.div style={{ y: y2 }} className="absolute -left-32 bottom-0 w-96 h-96 bg-[var(--theme-accent-primary)]/10 blur-[100px] rounded-full" />
        <motion.div style={{ y: y1 }} className="absolute -right-32 top-0 w-96 h-96 bg-rose-500/10 blur-[100px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-black text-[var(--theme-text-primary)] mb-8 tracking-tighter">
            {t('landing.ctaSection.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <Link to="/login" className="flex justify-center">
              <Button
                size="lg"
                className="h-14 px-8 text-base min-w-[220px] rounded-2xl flex items-center justify-center"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Lock className="h-5 w-5 flex-shrink-0" />
                  Login
                </span>
              </Button>
            </Link>

            <Link to="/register" className="flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-base min-w-[220px] rounded-2xl flex items-center justify-center whitespace-nowrap bg-[var(--theme-surface)]/80 backdrop-blur shadow-[var(--theme-shadow-md)] hover:bg-[var(--theme-surface)]"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Register
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;
