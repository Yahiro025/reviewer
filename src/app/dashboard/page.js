'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './dashboard.module.css';
import challenges from '@/lib/challenges';
import { getProgress, getTopicStats } from '@/lib/progress';
import AnimatePage from '@/components/AnimatePage';

// Build topic metadata from challenges data
const TOPIC_ORDER = [
  'arrays', 'searching', 'loops', 'conditionals', 'predefined-functions',
  'functions', 'pointers', 'structures', 'nested-structures',
  'struct-arrays', 'strings', 'file-handling',
];

const topicMeta = TOPIC_ORDER.map((key) => {
  const t = challenges[key];
  return {
    id: key,
    name: t ? t.title : key.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()),
    number: t ? t.number : '--',
    tiers: t ? t.tiers : {},
  };
});

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const MotionLink = motion.create(Link);

export default function Dashboard() {
  const [username, setUsername] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('clabs_username') || '';
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('clabs_username') || '';
  });

  // Compute stats from localStorage on mount (lazy initializer avoids setState-in-effect)
  const [stats] = useState(() => {
    if (typeof window === 'undefined') return [];
    const progress = getProgress();
    return topicMeta.map((topic) => {
      const { completed, total } = getTopicStats(topic.tiers);
      return { ...topic, completed, total };
    });
  });
  const totalCompleted = useMemo(() => stats.reduce((acc, t) => acc + t.completed, 0), [stats]);

  const saveUsername = () => {
    localStorage.setItem('clabs_username', nameInput.trim());
    setUsername(nameInput.trim());
    setEditingName(false);
  };

  const pctCompleted = totalCompleted > 0 ? Math.round((totalCompleted / 60) * 100) : 0;

  return (
    <AnimatePage className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot} />
          C-LABS
        </Link>
        <div className={styles.navRight}>
          {editingName ? (
            <div className={styles.nameEditor}>
              <input
                className={styles.nameInput}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveUsername()}
                placeholder="Enter your name..."
                autoFocus
              />
              <button className={styles.nameSave} onClick={saveUsername}>SAVE</button>
              <button className={styles.nameCancel} onClick={() => setEditingName(false)}>✕</button>
            </div>
          ) : (
            <button className={styles.userBtn} onClick={() => setEditingName(true)}>
              {username ? `▸ ${username.toUpperCase()}` : '+ SET NAME'}
            </button>
          )}
        </div>
      </nav>

      <motion.header 
        className={styles.header}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.headerLeft}>
          <p className={styles.headerLabel}>■ DASHBOARD</p>
          <h1 className={styles.headerTitle}>SELECT TOPIC</h1>
          {username && (
            <p className={styles.welcomeMsg}>Welcome back, {username}.</p>
          )}
        </div>
        <div className={styles.headerRight}>
          <div className={styles.bigStat}>
            <span className={styles.bigNum}>{totalCompleted}</span>
            <span className={styles.bigDenom}>/60</span>
          </div>
          <p className={styles.statLabel}>CHALLENGES COMPLETED</p>
          <div className={styles.globalBar}>
            <motion.div
              className={styles.globalFill}
              initial={{ width: 0 }}
              animate={{ width: `${pctCompleted}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.header>

      <motion.main 
        className={styles.grid}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((topic) => {
          const pct = topic.total > 0 ? Math.round((topic.completed / topic.total) * 100) : 0;
          const isDone = pct === 100;
          const hasStarted = topic.completed > 0;
          return (
            <MotionLink
              href={`/topics/${topic.id}`}
              key={topic.id}
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                backgroundColor: '#0a0a0a',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className={`${styles.card} glass-panel ${isDone ? styles.cardDone : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.topicNumber}>{topic.number}</span>
                <span className={styles.cardStatus}>
                  {isDone ? '✓ DONE' : hasStarted ? `${topic.completed}/${topic.total}` : '○ START'}
                </span>
              </div>
              <h2 className={styles.cardTitle}>{topic.name.toUpperCase()}</h2>
              <div className={styles.progressContainer}>
                <motion.div 
                  className={styles.progressBar} 
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                />
              </div>
              <div className={styles.tierDots}>
                {['novice', 'beginner', 'intermediate', 'advanced', 'expert'].map((tier) => {
                  const ch = topic.tiers[tier];
                  const progress = getProgress();
                  const status = ch ? (progress[ch.id] || 'none') : 'none';
                  return (
                    <span
                      key={tier}
                      className={styles.tierDot}
                      style={{
                        background: status === 'completed'
                          ? 'var(--accent-solid)'
                          : status === 'attempted'
                          ? '#444'
                          : '#1e1e1e',
                      }}
                      title={`${tier}: ${status}`}
                    />
                  );
                })}
              </div>
            </MotionLink>
          );
        })}
      </motion.main>
    </AnimatePage>
  );
}
