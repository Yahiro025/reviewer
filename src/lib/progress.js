// localStorage-based progress store
// Key: 'clabs_progress' → { [challengeId]: 'completed' | 'attempted' }

export function getProgress() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("clabs_progress") || "{}");
  } catch {
    return {};
  }
}

export function markCompleted(challengeId) {
  const progress = getProgress();
  progress[challengeId] = "completed";
  localStorage.setItem("clabs_progress", JSON.stringify(progress));
}

export function markAttempted(challengeId) {
  const progress = getProgress();
  if (!progress[challengeId]) {
    progress[challengeId] = "attempted";
    localStorage.setItem("clabs_progress", JSON.stringify(progress));
  }
}

export function getChallengeStatus(challengeId) {
  const progress = getProgress();
  return progress[challengeId] || "locked";
}

export function getTopicStats(topicChallenges) {
  const progress = getProgress();
  const completed = Object.values(topicChallenges).filter(
    (ch) => progress[ch.id] === "completed"
  ).length;
  const total = Object.keys(topicChallenges).length;
  return { completed, total };
}
