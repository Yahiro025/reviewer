'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import AnimatePage from '@/components/AnimatePage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Home() {
  return (
    <AnimatePage className={styles.main}>
      {/* Nav */}
      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.logo}>
          <motion.div
            className={styles.logoIcon}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          C-LABS
        </div>
        <Link href="/dashboard" className={styles.primaryButton}>
          ENTER ARENA
        </Link>
      </motion.nav>

      {/* Hero */}
      <motion.section
        className={styles.hero}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.badge} variants={itemVariants}>
          ■ C PROGRAMMING PRACTICE PLATFORM
        </motion.span>
        
        <motion.h1 className={styles.title} variants={itemVariants}>
          C-LABS
        </motion.h1>

        <div className={styles.heroContent}>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            60 hands-on challenges across 12 core topics.<br />
            5 difficulty tiers. Real compiler.<br />
            Track your progress. Level up your C.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/dashboard" className={styles.primaryButton}>
              START PRACTICING →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className={styles.features}>
        {[
          {
            num: '01',
            title: '5 Difficulty Tiers',
            desc: 'Novice → Beginner → Intermediate → Advanced → Expert. Build from syntax to real-world systems.',
          },
          {
            num: '02',
            title: 'VS Code Environment',
            desc: 'Powered by Monaco Editor — the exact engine behind VS Code — with C syntax highlighting.',
          },
          {
            num: '03',
            title: 'Real Compilation',
            desc: 'Your code is compiled by GCC and executed instantly via Piston API. See real terminal output.',
          },
        ].map((feat, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              backgroundColor: 'var(--bg-secondary)',
              y: -5,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            className={`${styles.featureCard} glass-panel`}
            style={{ borderRight: index === 2 ? 'none' : '1px solid var(--border)' }}
          >
            <p className={styles.featureNum}>{feat.num}</p>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className={styles.footerText}>C-LABS © 2025</span>
        <span className={styles.footerText}>12 TOPICS · 60 CHALLENGES · 5 TIERS</span>
      </motion.footer>
    </AnimatePage>
  );
}
