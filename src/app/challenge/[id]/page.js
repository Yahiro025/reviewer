'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import challenges from '@/lib/challenges';
import { markCompleted, markAttempted, getChallengeStatus } from '@/lib/progress';
import styles from './challenge.module.css';
import AnimatePage from '@/components/AnimatePage';

// Load Monaco with no SSR (it's browser-only)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const TIER_ORDER = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'];
const TIER_COLORS = {
  novice: '#666',
  beginner: '#888',
  intermediate: '#ff6b00',
  advanced: '#cc4400',
  expert: '#ff2200',
};

function findChallenge(id) {
  for (const [topicKey, topic] of Object.entries(challenges)) {
    for (const [tier, challenge] of Object.entries(topic.tiers)) {
      if (challenge.id === id) {
        return { challenge, topicKey, tier, topic };
      }
    }
  }
  return null;
}

function getNextChallenge(topicKey, currentTier) {
  const tierIdx = TIER_ORDER.indexOf(currentTier);
  const nextTier = TIER_ORDER[tierIdx + 1];
  if (!nextTier) return null;
  const topic = challenges[topicKey];
  if (!topic || !topic.tiers[nextTier]) return null;
  return topic.tiers[nextTier];
}

function SuccessParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        const distance = 80 + Math.random() * 140;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const duration = 0.6 + Math.random() * 0.5;
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
            animate={{
              x: x,
              y: y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: duration,
              ease: [0.1, 0.8, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              backgroundColor: Math.random() > 0.45 ? '#00e676' : 'var(--accent-solid)',
              boxShadow: '0 0 10px currentColor',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
}

export default function PracticeArena() {
  const { id } = useParams();
  const router = useRouter();

  // Memoize finding challenge so we have a stable reference
  const result = useMemo(() => findChallenge(id), [id]);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [execStatus, setExecStatus] = useState(null); // null | 'pass' | 'fail' | 'error'
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [challengeStatus, setChallengeStatus] = useState('locked');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const editorRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!result) return;
    const { challenge } = result;

    // Load saved code
    const savedKey = `clabs_code_${challenge.id}`;
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(savedKey) : null;
      setCode(saved || challenge.starterCode);
    } catch (err) {
      console.warn('Failed to load code from localStorage:', err);
      setCode(challenge.starterCode);
    }

    // Load saved stdin
    const savedStdinKey = `clabs_stdin_${challenge.id}`;
    try {
      const savedStdin = typeof window !== 'undefined' ? localStorage.getItem(savedStdinKey) : null;
      setStdin(savedStdin || '');
      setShowStdin(!!savedStdin);
    } catch (err) {
      console.warn('Failed to load stdin from localStorage:', err);
      setStdin('');
      setShowStdin(false);
    }

    setChallengeStatus(getChallengeStatus(challenge.id));
    setShowSuccessModal(false);
    setExecStatus(null);
    setOutput('');
  }, [id, result]);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCodeChange = useCallback((value) => {
    setCode(value || '');
    if (!result) return;
    try {
      const savedKey = `clabs_code_${result.challenge.id}`;
      localStorage.setItem(savedKey, value || '');
    } catch (err) {
      console.warn('Failed to save code to localStorage:', err);
    }
  }, [result]);

  const handleStdinChange = useCallback((value) => {
    setStdin(value || '');
    if (!result) return;
    try {
      const savedStdinKey = `clabs_stdin_${result.challenge.id}`;
      localStorage.setItem(savedStdinKey, value || '');
    } catch (err) {
      console.warn('Failed to save stdin to localStorage:', err);
    }
  }, [result]);

  const cancelExecution = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const runCode = async () => {
    if (!result || isRunning) return;
    const { challenge } = result;

    setIsRunning(true);
    setExecStatus(null);
    setOutput('');
    markAttempted(challenge.id);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin }),
        signal: controller.signal,
      });
      const data = await res.json();

      if (!data.success) {
        setOutput(`Error: ${data.error}`);
        setExecStatus('error');
        return;
      }

      const compileErr = data.compile?.stderr || '';
      const runOut = data.run?.stdout || '';
      const runErr = data.run?.stderr || '';
      const compileSignal = data.compile?.signal;
      const compileCode = data.compile?.code;
      const runSignal = data.run?.signal;
      const runCodeVal = data.run?.code;

      if (compileSignal === 'SIGKILL') {
        setOutput(`[COMPILATION TIMED OUT] Compiler took too long to compile the program (limit: 5s).`);
        setExecStatus('error');
        return;
      }

      if (compileErr) {
        setOutput(`[COMPILE ERROR]\n${compileErr}`);
        setExecStatus('error');
        return;
      }

      if (compileCode !== 0 && compileCode !== null && compileCode !== undefined) {
        setOutput(`[COMPILE FAILED] Exit code ${compileCode}\n${compileErr}`);
        setExecStatus('error');
        return;
      }

      let finalOutput = runOut;
      if (runErr) {
        finalOutput += (finalOutput ? '\n' : '') + `[RUNTIME ERROR]\n${runErr}`;
      }

      if (runSignal) {
        const signalExplanation = {
          SIGKILL: "TIMEOUT (Likely an infinite loop or waiting for input without sufficient stdin).",
          SIGFPE: "ARITHMETIC EXCEPTION (e.g., division by zero).",
          SIGSEGV: "SEGMENTATION FAULT (e.g., accessing uninitialized memory, dereferencing NULL, or array out-of-bounds).",
          SIGABRT: "ABORT SIGNAL (e.g., double free, failed assertion).",
          SIGBUS: "BUS ERROR (invalid memory alignment or address).",
        }[runSignal] || `Killed by signal ${runSignal}`;

        finalOutput += (finalOutput ? '\n\n' : '') + `[PROCESS TERMINATED - ${runSignal}]\n${signalExplanation}`;
        setOutput(finalOutput.trimEnd());
        setExecStatus('error');
        return;
      }

      setOutput(finalOutput.trimEnd() || '[Execution completed with no output]');

      // Check against expected output
      const expected = challenge.expectedOutput.trim();
      const actual = runOut.trim();
      if (actual === expected && !runSignal) {
        setExecStatus('pass');
        markCompleted(challenge.id);
        setChallengeStatus('completed');
        setShowSuccessModal(true);
      } else {
        setExecStatus('fail');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setOutput('[EXECUTION CANCELLED] Code execution was aborted by the user.');
        setExecStatus('error');
      } else {
        setOutput(`Network error: ${err.message}`);
        setExecStatus('error');
      }
    } finally {
      setIsRunning(false);
      abortControllerRef.current = null;
    }
  };

  const resetCode = () => {
    if (!result) return;
    const { challenge } = result;
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to reset the code to the starter template? All current changes in this editor will be lost.')) {
      return;
    }
    setCode(challenge.starterCode);
    try {
      localStorage.removeItem(`clabs_code_${challenge.id}`);
      localStorage.removeItem(`clabs_stdin_${challenge.id}`);
    } catch (err) {
      console.warn('Failed to clear localStorage:', err);
    }
    setStdin('');
    setShowStdin(false);
    setOutput('');
    setExecStatus(null);
  };

  if (!id) {
    return (
      <div className={styles.arena}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'var(--bg)' }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '2px solid var(--border)',
            borderTopColor: 'var(--accent-solid)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em', color: '#666' }}>
            INITIALIZING WORKSPACE...
          </span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.arena}>
        <nav className={styles.topBar}>
          <Link href="/dashboard" className={styles.logo}>C-LABS</Link>
        </nav>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#ff2200', marginBottom: '1rem' }}>
            CHALLENGE NOT FOUND
          </p>
          <Link href="/dashboard" className={styles.backLink}>← DASHBOARD</Link>
        </div>
      </div>
    );
  }

  const { challenge, topicKey, tier, topic } = result;
  const nextChallenge = getNextChallenge(topicKey, tier);
  const tierColor = TIER_COLORS[tier];

  const statusBanner = {
    pass: { label: '✓ ALL TESTS PASSED', color: '#00e676', bg: '#00e67611' },
    fail: { label: '✗ OUTPUT MISMATCH — TRY AGAIN', color: '#ff6b00', bg: '#ff6b0011' },
    error: { label: '⚠ COMPILATION / RUNTIME ERROR', color: '#ff2200', bg: '#ff220011' },
  }[execStatus] || null;

  return (
    <AnimatePage className={styles.arena}>
      {/* Top Bar */}
      <motion.nav 
        className={styles.topBar}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href={`/topics/${topicKey}`} className={styles.logo}>
          <span className={styles.logoDot} />
          C-LABS
        </Link>
        <div className={styles.fileTabs}>
          <span className={styles.fileTabActive}>main.c</span>
        </div>
        <div className={styles.topBarRight}>
          <button className={styles.resetBtn} onClick={resetCode} title="Reset to starter code">
            ↺ RESET
          </button>
          {isRunning ? (
            <button
              className={styles.stopButton}
              onClick={cancelExecution}
            >
              ■ CANCEL
            </button>
          ) : (
            <button
              className={styles.runButton}
              onClick={runCode}
            >
              ▶ RUN CODE
            </button>
          )}
        </div>
      </motion.nav>

      <div className={styles.body}>
        {/* Left Pane: Problem */}
        <motion.aside 
          className={styles.sidebar}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarHeader}>
              <div className={styles.tierBadge} style={{ borderColor: tierColor, color: tierColor }}>
                <span className={styles.tierDot} style={{ background: tierColor }} />
                {tier.toUpperCase()}
              </div>
              <span className={styles.topicLabel}>TOPIC {topic.number} — {topic.title.toUpperCase()}</span>
            </div>

            <h2 className={styles.challengeTitle}>{challenge.title}</h2>
            <div className={styles.divider} />

            <div className={styles.instructions}>
              <p className={styles.instrLabel}>■ DESCRIPTION</p>
              <p className={styles.instrText}>{challenge.description}</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.expectedBox}>
              <p className={styles.instrLabel}>■ EXPECTED OUTPUT</p>
              <pre className={styles.expectedOutput}>{challenge.expectedOutput}</pre>
            </div>

            <div className={styles.divider} />

            {/* Hint toggle */}
            <button className={styles.hintToggle} onClick={() => setHintVisible(!hintVisible)}>
              {hintVisible ? '▼' : '▶'} HINT
            </button>
            {hintVisible && (
              <div className={styles.hintBox}>
                <p>{challenge.hint}</p>
              </div>
            )}

            {/* stdin toggle */}
            <div className={styles.divider} />
            <button className={styles.hintToggle} onClick={() => setShowStdin(!showStdin)}>
              {showStdin ? '▼' : '▶'} CUSTOM INPUT (stdin)
            </button>
            {showStdin && (
              <textarea
                className={styles.stdinBox}
                value={stdin}
                onChange={(e) => handleStdinChange(e.target.value)}
                placeholder="Enter input for scanf / fgets here..."
                rows={4}
              />
            )}
          </div>

          <div className={styles.sidebarFooter}>
            {challengeStatus === 'completed' && (
              <div className={styles.completedBadge}>✓ COMPLETED</div>
            )}
            <Link href={`/topics/${topicKey}`} className={styles.backLink}>← BACK TO TOPIC</Link>
          </div>
        </motion.aside>

        {/* Right Pane: Editor + Terminal */}
        <motion.main 
          className={styles.workspace}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Monaco Editor */}
          <div className={styles.editorContainer}>
            <MonacoEditor
              height="100%"
              language="c"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 14,
                fontFamily: 'Fira Code, JetBrains Mono, monospace',
                fontLigatures: true,
                minimap: { enabled: true },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'off',
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>

          {/* Terminal */}
          <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
              <span>■ TERMINAL</span>
              <span className={styles.terminalCmd}>gcc main.c -o main &amp;&amp; ./main</span>
              {statusBanner && (
                <span
                  className={styles.statusBadge}
                  style={{ color: statusBanner.color, background: statusBanner.bg }}
                >
                  {statusBanner.label}
                </span>
              )}
            </div>
            <div className={styles.terminalOutput}>
              {isRunning ? (
                <p className={styles.running}>
                  <span className={styles.prompt}>$</span> Compiling and executing...
                </p>
              ) : output ? (
                <>
                  <p><span className={styles.prompt}>$</span> gcc main.c -o main &amp;&amp; ./main</p>
                  <pre className={styles.outputText}>{output}</pre>
                </>
              ) : (
                <p className={styles.idle}>
                  <span className={styles.prompt}>$</span> Press <kbd>▶ RUN CODE</kbd> to compile and execute.
                </p>
              )}
            </div>

            {/* Pass CTA (visible as feedback backup on terminal footer) */}
            {execStatus === 'pass' && nextChallenge && (
              <div className={styles.nextCta}>
                <p>Ready for the next challenge?</p>
                <Link href={`/challenge/${nextChallenge.id}`} className={styles.nextBtn}>
                  NEXT: {nextChallenge.title} →
                </Link>
              </div>
            )}
            {execStatus === 'pass' && !nextChallenge && (
              <div className={styles.nextCta}>
                <p>🎉 Topic complete! All 5 tiers cleared.</p>
                <Link href={`/topics/${topicKey}`} className={styles.nextBtn}>
                  ← BACK TO TOPIC
                </Link>
              </div>
            )}
          </div>
        </motion.main>
      </div>

      {/* Success Cyber Overlay Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className={styles.successOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.successModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <SuccessParticles />
              
              <h3 className={styles.successTitle}>✓ ACCESS GRANTED</h3>
              <p className={styles.successSubtitle}>
                {topic.title.toUpperCase()} — {tier.toUpperCase()} LEVEL CLEARED
              </p>
              
              <div className={styles.successStats}>
                <div className={styles.successRow}>
                  <span>❯</span>
                  <span>STATUS:</span>
                  <span className={styles.successRowText}>COMPILATION SUCCESSFUL</span>
                </div>
                <div className={styles.successRow}>
                  <span>❯</span>
                  <span>TEST CASES:</span>
                  <span className={styles.successRowText}>100% MATCHED</span>
                </div>
                <div className={styles.successRow}>
                  <span>❯</span>
                  <span>DOPAMINE TRIGGER:</span>
                  <span className={styles.successRowText}>ENGAGED</span>
                </div>
              </div>
              
              <div className={styles.successActions}>
                <button
                  className={styles.actionBtnSecondary}
                  onClick={() => setShowSuccessModal(false)}
                >
                  REVIEW CODE
                </button>
                {nextChallenge ? (
                  <Link
                    href={`/challenge/${nextChallenge.id}`}
                    className={styles.actionBtnPrimary}
                    onClick={() => setShowSuccessModal(false)}
                  >
                    NEXT CHALLENGE →
                  </Link>
                ) : (
                  <Link
                    href={`/topics/${topicKey}`}
                    className={styles.actionBtnPrimary}
                    onClick={() => setShowSuccessModal(false)}
                  >
                    TOPIC DONE →
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePage>
  );
}
