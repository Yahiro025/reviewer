'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './topics.module.css';
import challenges from '@/lib/challenges';
import { getProgress } from '@/lib/progress';
import AnimatePage from '@/components/AnimatePage';

const TIER_ORDER = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'];
const TIER_COLORS = {
  novice: '#666',
  beginner: '#888',
  intermediate: '#ff6b00',
  advanced: '#cc4400',
  expert: '#ff2200',
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const MotionLink = motion.create(Link);

export default function TopicDetail({ params }) {
  const { id } = params;
  const topic = challenges[id];
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!topic) {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.logo}>C-LABS</Link>
        </nav>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#ff2200' }}>TOPIC NOT FOUND</p>
          <Link href="/dashboard" className={styles.backLink}>← BACK TO DASHBOARD</Link>
        </div>
      </div>
    );
  }

  const tierEntries = TIER_ORDER.map((tier) => ({
    tier,
    challenge: topic.tiers[tier],
    color: TIER_COLORS[tier],
  }));

  const completedCount = tierEntries.filter(
    ({ challenge }) => progress[challenge.id] === 'completed'
  ).length;

  return (
    <AnimatePage className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}></span>
          C-LABS
        </Link>
      </nav>

      <motion.header 
        className={styles.header}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link href="/dashboard" className={styles.backLink}>← TOPICS</Link>
        <p className={styles.label}>■ TOPIC {topic.number}</p>
        <h1 className={styles.title}>{topic.title.toUpperCase()}</h1>
        <p className={styles.topicDesc}>{topic.description}</p>
        <div className={styles.progressStrip}>
          {tierEntries.map(({ tier, challenge }) => (
            <motion.div
              key={tier}
              className={styles.progressBlock}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              style={{
                background: progress[challenge.id] === 'completed'
                  ? TIER_COLORS[tier]
                  : progress[challenge.id] === 'attempted'
                  ? '#444'
                  : '#1a1a1a',
                border: `1px solid ${TIER_COLORS[tier]}44`,
                originX: 0
              }}
              title={tier.toUpperCase()}
            />
          ))}
          <span className={styles.progressLabel}>{completedCount}/5</span>
        </div>
      </motion.header>

      <motion.main 
        className={styles.tierList}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {tierEntries.map(({ tier, challenge, color }) => {
          const status = progress[challenge.id] || 'locked';
          return (
            <motion.div 
              key={tier} 
              className={styles.tierRow}
              variants={rowVariants}
            >
              <div className={styles.tierLabel}>
                <span className={styles.tierDot} style={{ background: color }} />
                {tier.toUpperCase()}
              </div>
              <div className={styles.challengeList}>
                <MotionLink
                  href={`/challenge/${challenge.id}`}
                  className={`${styles.challengeCard} glass-panel ${status === 'completed' ? styles.done : status === 'attempted' ? styles.attempted : ''}`}
                  whileHover={{
                    x: 6,
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--accent-solid)',
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                >
                  <div className={styles.challengeInfo}>
                    <span className={styles.challengeName}>{challenge.title}</span>
                    <span className={styles.challengeDesc}>
                      {challenge.description.slice(0, 80)}...
                    </span>
                  </div>
                  <span className={styles.challengeStatus}>
                    {status === 'completed' ? '✓' : status === 'attempted' ? '→' : '○'}
                  </span>
                </MotionLink>
              </div>
            </motion.div>
          );
        })}
      </motion.main>
    </AnimatePage>
  );
}
