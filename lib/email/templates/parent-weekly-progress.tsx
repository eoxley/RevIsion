import * as React from 'react';

interface TopicProgress {
  name: string;
  subject: string;
  previousState: string;
  currentState: string;
}

interface SubjectSummary {
  name: string;
  colour: string;
  topicsSecure: number;
  topicsTotal: number;
  percentageComplete: number;
  sessionsThisWeek: number;
  minutesThisWeek: number;
}

interface ParentTip {
  tip: string;
  reason: string;
}

type LearningStyle = 'visual' | 'auditory' | 'read_write' | 'kinesthetic';

interface ParentWeeklyProgressEmailProps {
  parentName: string;
  childName: string;
  weekStartDate: string;
  weekEndDate: string;
  // Activity metrics
  totalSessions: number;
  totalMinutes: number;
  daysActive: number;
  // Progress metrics
  topicsImproved: number;
  topicsSecured: number;
  newMisconceptionsCleared: number;
  // Engagement
  momentumScore: number;
  momentumTrend: 'improving' | 'stable' | 'declining';
  streakDays: number;
  // Detailed breakdowns
  subjectSummaries: SubjectSummary[];
  topProgressTopics: TopicProgress[];
  areasNeedingAttention: string[];
  upcomingFocus: string[];
  // Learning style support
  primaryLearningStyle: LearningStyle;
  parentTips: ParentTip[];
  // Personalised message
  summaryMessage: string;
  encouragementForParent: string;
  // If inactive
  isInactive: boolean;
  inactivityDays?: number;
}

export function ParentWeeklyProgressEmail({
  parentName,
  childName,
  weekStartDate,
  weekEndDate,
  totalSessions,
  totalMinutes,
  daysActive,
  topicsImproved,
  topicsSecured,
  newMisconceptionsCleared,
  momentumScore,
  momentumTrend,
  streakDays,
  subjectSummaries,
  topProgressTopics,
  areasNeedingAttention,
  upcomingFocus,
  primaryLearningStyle,
  parentTips,
  summaryMessage,
  encouragementForParent,
  isInactive,
  inactivityDays,
}: ParentWeeklyProgressEmailProps) {
  const parentFirstName = parentName.split(' ')[0];
  const childFirstName = childName.split(' ')[0];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} minutes`;

  const learningStyleInfo = getLearningStyleInfo(primaryLearningStyle);
  const momentumEmoji = momentumTrend === 'improving' ? '📈' : momentumTrend === 'stable' ? '➡️' : '📉';
  const momentumText = momentumTrend === 'improving' ? 'Building momentum!' :
                       momentumTrend === 'stable' ? 'Staying steady' : 'Needs a boost';

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{childFirstName}&apos;s Weekly Progress Report</title>
      </head>
      <body style={styles.body}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.logo}>revIsion</h1>
            <p style={styles.headerSubtitle}>Parent Progress Report</p>
          </div>

          {/* Greeting */}
          <div style={styles.section}>
            <h2 style={styles.greeting}>Hi {parentFirstName}! 👋</h2>
            <p style={styles.intro}>
              Here&apos;s how {childFirstName}&apos;s revision went this week
              ({weekStartDate} - {weekEndDate})
            </p>
          </div>

          {/* Inactive Warning */}
          {isInactive && (
            <div style={styles.inactiveSection}>
              <div style={styles.inactiveIcon}>😴</div>
              <h3 style={styles.inactiveTitle}>
                {childFirstName} hasn&apos;t revised this week
              </h3>
              <p style={styles.inactiveText}>
                It&apos;s been {inactivityDays} days since {childFirstName}&apos;s last session.
                GCSEs require consistent practice - even 15-20 minutes a day makes a huge difference!
              </p>
              <div style={styles.gentleNudge}>
                <strong>💡 Gentle nudge:</strong> Try asking {childFirstName} about one topic
                they&apos;re finding tricky. Sometimes talking about it helps break the ice!
              </div>
            </div>
          )}

          {/* Quick Summary - Only show if active */}
          {!isInactive && (
            <>
              {/* Summary Message */}
              <div style={styles.summarySection}>
                <p style={styles.summaryText}>{summaryMessage}</p>
              </div>

              {/* Quick Stats */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statEmoji}>📚</div>
                  <div style={styles.statNumber}>{totalSessions}</div>
                  <div style={styles.statLabel}>Sessions</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statEmoji}>⏱️</div>
                  <div style={styles.statNumber}>{timeString}</div>
                  <div style={styles.statLabel}>Study Time</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statEmoji}>📅</div>
                  <div style={styles.statNumber}>{daysActive}/7</div>
                  <div style={styles.statLabel}>Days Active</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statEmoji}>✅</div>
                  <div style={styles.statNumber}>{topicsSecured}</div>
                  <div style={styles.statLabel}>Topics Mastered</div>
                </div>
              </div>

              {/* Momentum Indicator */}
              <div style={styles.momentumSection}>
                <div style={styles.momentumHeader}>
                  <span style={styles.momentumLabel}>Learning Momentum</span>
                  <span style={styles.momentumEmoji}>{momentumEmoji} {momentumText}</span>
                </div>
                <div style={styles.momentumBarContainer}>
                  <div style={{ ...styles.momentumBar, width: `${momentumScore}%` }} />
                </div>
                <div style={styles.momentumDetails}>
                  <span>Score: {momentumScore}/100</span>
                  {streakDays > 0 && (
                    <span style={styles.streakBadge}>🔥 {streakDays} day streak!</span>
                  )}
                </div>
              </div>

              {/* Subject Progress */}
              {subjectSummaries.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📊 Subject Progress</h3>
                  <p style={styles.sectionSubtitle}>
                    Here&apos;s how {childFirstName} is doing in each subject:
                  </p>
                  <div style={styles.subjectList}>
                    {subjectSummaries.map((subject, index) => (
                      <div key={index} style={styles.subjectCard}>
                        <div style={styles.subjectHeader}>
                          <span style={{ ...styles.subjectDot, backgroundColor: subject.colour }} />
                          <span style={styles.subjectName}>{subject.name}</span>
                          <span style={styles.subjectPercentage}>
                            {subject.percentageComplete}% secure
                          </span>
                        </div>
                        <div style={styles.progressBarContainer}>
                          <div
                            style={{
                              ...styles.progressBar,
                              width: `${subject.percentageComplete}%`,
                              backgroundColor: subject.colour,
                            }}
                          />
                        </div>
                        <div style={styles.subjectMeta}>
                          {subject.topicsSecure} of {subject.topicsTotal} topics mastered
                          {subject.sessionsThisWeek > 0 && (
                            <> • {subject.sessionsThisWeek} sessions this week</>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wins This Week */}
              {topProgressTopics.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🌟 Wins This Week</h3>
                  <p style={styles.sectionSubtitle}>
                    Topics where {childFirstName} made real progress:
                  </p>
                  <div style={styles.winsList}>
                    {topProgressTopics.map((topic, index) => (
                      <div key={index} style={styles.winItem}>
                        <div style={styles.winIcon}>✓</div>
                        <div style={styles.winContent}>
                          <strong>{topic.name}</strong>
                          <span style={styles.winSubject}> ({topic.subject})</span>
                          <div style={styles.winProgress}>
                            {formatState(topic.previousState)} → {formatState(topic.currentState)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {newMisconceptionsCleared > 0 && (
                    <p style={styles.bonusStat}>
                      💡 Plus, {childFirstName} cleared up {newMisconceptionsCleared} common
                      misconception{newMisconceptionsCleared > 1 ? 's' : ''} this week!
                    </p>
                  )}
                </div>
              )}

              {/* Areas Needing Attention */}
              {areasNeedingAttention.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📌 Areas to Watch</h3>
                  <p style={styles.sectionSubtitle}>
                    These topics could use a bit more attention:
                  </p>
                  <ul style={styles.attentionList}>
                    {areasNeedingAttention.map((area, index) => (
                      <li key={index} style={styles.attentionItem}>{area}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Coming Up Next Week */}
              {upcomingFocus.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🎯 Focus for Next Week</h3>
                  <p style={styles.sectionSubtitle}>
                    Here&apos;s what we&apos;ll be working on:
                  </p>
                  <ul style={styles.focusList}>
                    {upcomingFocus.map((focus, index) => (
                      <li key={index} style={styles.focusItem}>{focus}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Parent Tips Section - Always Show */}
          <div style={styles.tipsSection}>
            <h3 style={styles.tipsTitle}>
              💡 How You Can Help ({learningStyleInfo.label} Learner)
            </h3>
            <p style={styles.tipsIntro}>
              {childFirstName} learns best through <strong>{learningStyleInfo.description}</strong>.
              Here are some ways you can support them:
            </p>
            <div style={styles.tipsList}>
              {parentTips.map((tipItem, index) => (
                <div key={index} style={styles.tipCard}>
                  <div style={styles.tipIcon}>{getTipIcon(index)}</div>
                  <div style={styles.tipContent}>
                    <p style={styles.tipText}>{tipItem.tip}</p>
                    <p style={styles.tipReason}>{tipItem.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encouragement */}
          <div style={styles.encouragementSection}>
            <p style={styles.encouragementText}>{encouragementForParent}</p>
          </div>

          {/* CTA */}
          <div style={styles.ctaSection}>
            <p style={styles.ctaText}>
              Want to see more details? View the full dashboard:
            </p>
            <a href="https://revision.app/parent-dashboard" style={styles.ctaButton}>
              View Full Report
            </a>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              You&apos;re doing great by staying involved in {childFirstName}&apos;s revision!
              Research shows that parental engagement significantly improves GCSE outcomes.
            </p>
            <p style={styles.footerLinks}>
              <a href="https://revision.app/parent-settings" style={styles.footerLink}>Email Settings</a>
              {' | '}
              <a href="https://revision.app/help" style={styles.footerLink}>Help Centre</a>
              {' | '}
              <a href="https://revision.app/unsubscribe" style={styles.footerLink}>Unsubscribe</a>
            </p>
            <p style={styles.copyright}>
              © 2026 revIsion. Helping GCSE students and their families succeed.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

function formatState(state: string): string {
  const stateMap: Record<string, string> = {
    'not_understood': 'Not Started',
    'partially_understood': 'Partial',
    'understood_fragile': 'Fragile',
    'secure': 'Secure ✓',
  };
  return stateMap[state] || state;
}

function getLearningStyleInfo(style: LearningStyle) {
  const info: Record<LearningStyle, { label: string; description: string }> = {
    visual: {
      label: 'Visual',
      description: 'diagrams, charts, colours, and visual aids',
    },
    auditory: {
      label: 'Auditory',
      description: 'listening, discussion, and verbal explanations',
    },
    read_write: {
      label: 'Read/Write',
      description: 'reading, note-taking, and written materials',
    },
    kinesthetic: {
      label: 'Kinesthetic',
      description: 'hands-on practice, movement, and real-world examples',
    },
  };
  return info[style];
}

function getTipIcon(index: number): string {
  const icons = ['🏠', '💬', '📱', '🎯'];
  return icons[index % icons.length];
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
    lineHeight: 1.6,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    padding: '32px 24px',
    textAlign: 'center' as const,
  },
  logo: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-1px',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    margin: '8px 0 0 0',
  },
  section: {
    padding: '24px',
    borderBottom: '1px solid #e4e4e7',
  },
  greeting: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 8px 0',
  },
  intro: {
    fontSize: '16px',
    color: '#52525b',
    margin: 0,
  },
  summarySection: {
    padding: '20px 24px',
    backgroundColor: '#eff6ff',
    borderBottom: '1px solid #bfdbfe',
  },
  summaryText: {
    fontSize: '16px',
    color: '#1e40af',
    margin: 0,
    fontWeight: 500,
  },
  inactiveSection: {
    padding: '24px',
    backgroundColor: '#fef3c7',
    textAlign: 'center' as const,
    borderBottom: '1px solid #fcd34d',
  },
  inactiveIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  inactiveTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#92400e',
    margin: '0 0 12px 0',
  },
  inactiveText: {
    fontSize: '14px',
    color: '#92400e',
    margin: '0 0 16px 0',
  },
  gentleNudge: {
    fontSize: '14px',
    color: '#78350f',
    backgroundColor: '#fef9c3',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'left' as const,
  },
  statsGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    padding: '24px',
    gap: '12px',
    backgroundColor: '#fafafa',
  },
  statCard: {
    flex: '1 1 calc(50% - 6px)',
    minWidth: '100px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center' as const,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  statEmoji: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#18181b',
  },
  statLabel: {
    fontSize: '11px',
    color: '#71717a',
    textTransform: 'uppercase' as const,
    marginTop: '4px',
    letterSpacing: '0.5px',
  },
  momentumSection: {
    padding: '24px',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e4e4e7',
  },
  momentumHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  momentumLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#18181b',
  },
  momentumEmoji: {
    fontSize: '14px',
    color: '#52525b',
  },
  momentumBarContainer: {
    height: '10px',
    backgroundColor: '#e4e4e7',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  momentumBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
    borderRadius: '5px',
    transition: 'width 0.3s ease',
  },
  momentumDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#71717a',
  },
  streakBadge: {
    color: '#f97316',
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 8px 0',
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#71717a',
    margin: '0 0 16px 0',
  },
  subjectList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  subjectCard: {
    padding: '16px',
    backgroundColor: '#fafafa',
    borderRadius: '10px',
  },
  subjectHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  subjectDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  subjectName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#18181b',
    flex: 1,
  },
  subjectPercentage: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#3B82F6',
  },
  progressBarContainer: {
    height: '6px',
    backgroundColor: '#e4e4e7',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '3px',
  },
  subjectMeta: {
    fontSize: '12px',
    color: '#71717a',
  },
  winsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  winItem: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#ecfdf5',
    borderRadius: '8px',
  },
  winIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#22c55e',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  winContent: {
    flex: 1,
  },
  winSubject: {
    color: '#71717a',
    fontWeight: 'normal',
  },
  winProgress: {
    fontSize: '12px',
    color: '#16a34a',
    marginTop: '4px',
  },
  bonusStat: {
    fontSize: '14px',
    color: '#52525b',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
  },
  attentionList: {
    margin: 0,
    paddingLeft: '20px',
  },
  attentionItem: {
    fontSize: '14px',
    color: '#52525b',
    marginBottom: '8px',
  },
  focusList: {
    margin: 0,
    paddingLeft: '20px',
  },
  focusItem: {
    fontSize: '14px',
    color: '#52525b',
    marginBottom: '8px',
  },
  tipsSection: {
    padding: '24px',
    backgroundColor: '#f0fdf4',
    borderBottom: '1px solid #bbf7d0',
  },
  tipsTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#166534',
    margin: '0 0 8px 0',
  },
  tipsIntro: {
    fontSize: '14px',
    color: '#15803d',
    margin: '0 0 16px 0',
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  tipCard: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  tipIcon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: '14px',
    color: '#18181b',
    margin: '0 0 4px 0',
    fontWeight: 500,
  },
  tipReason: {
    fontSize: '12px',
    color: '#71717a',
    margin: 0,
    fontStyle: 'italic',
  },
  encouragementSection: {
    padding: '24px',
    backgroundColor: '#fef3c7',
    textAlign: 'center' as const,
  },
  encouragementText: {
    fontSize: '15px',
    color: '#92400e',
    margin: 0,
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: '24px',
    textAlign: 'center' as const,
  },
  ctaText: {
    fontSize: '14px',
    color: '#52525b',
    margin: '0 0 16px 0',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#3B82F6',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    padding: '14px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  footer: {
    padding: '24px',
    backgroundColor: '#f4f4f5',
    textAlign: 'center' as const,
  },
  footerText: {
    fontSize: '13px',
    color: '#52525b',
    margin: '0 0 16px 0',
    lineHeight: 1.5,
  },
  footerLinks: {
    fontSize: '12px',
    margin: '0 0 16px 0',
  },
  footerLink: {
    color: '#3B82F6',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '11px',
    color: '#a1a1aa',
    margin: 0,
  },
};

export default ParentWeeklyProgressEmail;
