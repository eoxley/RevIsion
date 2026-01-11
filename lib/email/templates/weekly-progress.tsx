import * as React from 'react';

interface TopicProgress {
  name: string;
  subject: string;
  previousState: string;
  currentState: string;
  improved: boolean;
}

interface SubjectSummary {
  name: string;
  colour: string;
  topicsSecure: number;
  topicsTotal: number;
  sessionsThisWeek: number;
  minutesThisWeek: number;
}

interface WeeklyProgressEmailProps {
  studentName: string;
  weekStartDate: string;
  weekEndDate: string;
  totalSessions: number;
  totalMinutes: number;
  topicsImproved: number;
  topicsSecured: number;
  streakDays: number;
  momentumScore: number;
  momentumTrend: 'improving' | 'stable' | 'declining';
  subjectSummaries: SubjectSummary[];
  topProgressTopics: TopicProgress[];
  areasToFocus: string[];
  encouragementMessage: string;
  nextWeekGoal: string;
}

export function WeeklyProgressEmail({
  studentName,
  weekStartDate,
  weekEndDate,
  totalSessions,
  totalMinutes,
  topicsImproved,
  topicsSecured,
  streakDays,
  momentumScore,
  momentumTrend,
  subjectSummaries,
  topProgressTopics,
  areasToFocus,
  encouragementMessage,
  nextWeekGoal,
}: WeeklyProgressEmailProps) {
  const firstName = studentName.split(' ')[0];
  const momentumEmoji = momentumTrend === 'improving' ? '📈' : momentumTrend === 'stable' ? '➡️' : '📉';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Weekly Progress Report</title>
      </head>
      <body style={styles.body}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.logo}>myrevisionary</h1>
            <p style={styles.headerSubtitle}>Weekly Progress Report</p>
          </div>

          {/* Greeting */}
          <div style={styles.section}>
            <h2 style={styles.greeting}>Hey {firstName}! 👋</h2>
            <p style={styles.dateRange}>
              Here&apos;s how your revision went from {weekStartDate} to {weekEndDate}
            </p>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{totalSessions}</div>
              <div style={styles.statLabel}>Sessions</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{timeString}</div>
              <div style={styles.statLabel}>Study Time</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{topicsImproved}</div>
              <div style={styles.statLabel}>Topics Improved</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{topicsSecured}</div>
              <div style={styles.statLabel}>Topics Secured</div>
            </div>
          </div>

          {/* Momentum Score */}
          <div style={styles.momentumSection}>
            <div style={styles.momentumHeader}>
              <span style={styles.momentumLabel}>Momentum Score</span>
              <span style={styles.momentumEmoji}>{momentumEmoji}</span>
            </div>
            <div style={styles.momentumBarContainer}>
              <div style={{ ...styles.momentumBar, width: `${momentumScore}%` }} />
            </div>
            <div style={styles.momentumValue}>{momentumScore}/100</div>
            {streakDays > 0 && (
              <p style={styles.streakText}>🔥 {streakDays} day streak!</p>
            )}
          </div>

          {/* Subject Breakdown */}
          {subjectSummaries.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Subject Breakdown</h3>
              <div style={styles.subjectList}>
                {subjectSummaries.map((subject, index) => (
                  <div key={index} style={styles.subjectRow}>
                    <div style={styles.subjectInfo}>
                      <span style={{ ...styles.subjectDot, backgroundColor: subject.colour }} />
                      <span style={styles.subjectName}>{subject.name}</span>
                    </div>
                    <div style={styles.subjectStats}>
                      <span style={styles.subjectProgress}>
                        {subject.topicsSecure}/{subject.topicsTotal} topics secure
                      </span>
                      <span style={styles.subjectTime}>
                        {subject.sessionsThisWeek} sessions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Progress */}
          {topProgressTopics.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🌟 Your Top Progress</h3>
              <div style={styles.progressList}>
                {topProgressTopics.map((topic, index) => (
                  <div key={index} style={styles.progressItem}>
                    <div style={styles.progressTopic}>
                      <strong>{topic.name}</strong>
                      <span style={styles.progressSubject}> - {topic.subject}</span>
                    </div>
                    <div style={styles.progressChange}>
                      <span style={styles.previousState}>{formatState(topic.previousState)}</span>
                      <span style={styles.arrow}> → </span>
                      <span style={styles.currentState}>{formatState(topic.currentState)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Areas to Focus */}
          {areasToFocus.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📌 Areas to Focus On</h3>
              <ul style={styles.focusList}>
                {areasToFocus.map((area, index) => (
                  <li key={index} style={styles.focusItem}>{area}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Encouragement */}
          <div style={styles.encouragementSection}>
            <p style={styles.encouragementText}>{encouragementMessage}</p>
          </div>

          {/* Next Week Goal */}
          <div style={styles.goalSection}>
            <h3 style={styles.goalTitle}>🎯 This Week&apos;s Goal</h3>
            <p style={styles.goalText}>{nextWeekGoal}</p>
          </div>

          {/* CTA */}
          <div style={styles.ctaSection}>
            <a href="https://myrevisionary.com/dashboard" style={styles.ctaButton}>
              Continue Revising
            </a>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Keep going, {firstName}! Every session brings you closer to your goals.
            </p>
            <p style={styles.footerLinks}>
              <a href="https://myrevisionary.com/settings" style={styles.footerLink}>Settings</a>
              {' | '}
              <a href="https://myrevisionary.com/unsubscribe" style={styles.footerLink}>Unsubscribe</a>
            </p>
            <p style={styles.copyright}>
              © 2026 myrevisionary. Helping GCSE students succeed.
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

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    background: 'linear-gradient(135deg, #3783a5 0%, #8B5CF6 100%)',
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
  dateRange: {
    fontSize: '14px',
    color: '#71717a',
    margin: 0,
  },
  statsGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    padding: '24px',
    gap: '16px',
    backgroundColor: '#fafafa',
  },
  statCard: {
    flex: '1 1 calc(50% - 8px)',
    minWidth: '120px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center' as const,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#3783a5',
  },
  statLabel: {
    fontSize: '12px',
    color: '#71717a',
    textTransform: 'uppercase' as const,
    marginTop: '4px',
  },
  momentumSection: {
    padding: '24px',
    backgroundColor: '#fafafa',
    textAlign: 'center' as const,
  },
  momentumHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  momentumLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#18181b',
  },
  momentumEmoji: {
    fontSize: '20px',
  },
  momentumBarContainer: {
    height: '12px',
    backgroundColor: '#e4e4e7',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  momentumBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #3783a5 0%, #8B5CF6 100%)',
    borderRadius: '6px',
  },
  momentumValue: {
    fontSize: '14px',
    color: '#71717a',
  },
  streakText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#f97316',
    marginTop: '12px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 16px 0',
  },
  subjectList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  subjectRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
  },
  subjectInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  subjectDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  subjectName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#18181b',
  },
  subjectStats: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '2px',
  },
  subjectProgress: {
    fontSize: '12px',
    color: '#3783a5',
    fontWeight: 500,
  },
  subjectTime: {
    fontSize: '11px',
    color: '#71717a',
  },
  progressList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  progressItem: {
    padding: '12px',
    backgroundColor: '#ecfdf5',
    borderRadius: '8px',
    borderLeft: '4px solid #37a87b',
  },
  progressTopic: {
    fontSize: '14px',
    color: '#18181b',
    marginBottom: '4px',
  },
  progressSubject: {
    color: '#71717a',
    fontWeight: 400,
  },
  progressChange: {
    fontSize: '12px',
  },
  previousState: {
    color: '#71717a',
  },
  arrow: {
    color: '#37a87b',
  },
  currentState: {
    color: '#37a87b',
    fontWeight: 600,
  },
  focusList: {
    margin: 0,
    paddingLeft: '20px',
  },
  focusItem: {
    fontSize: '14px',
    color: '#52525b',
    marginBottom: '8px',
    lineHeight: 1.5,
  },
  encouragementSection: {
    padding: '24px',
    backgroundColor: '#fef3c7',
    textAlign: 'center' as const,
  },
  encouragementText: {
    fontSize: '16px',
    color: '#92400e',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: 1.6,
  },
  goalSection: {
    padding: '24px',
    textAlign: 'center' as const,
  },
  goalTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 8px 0',
  },
  goalText: {
    fontSize: '14px',
    color: '#52525b',
    margin: 0,
    lineHeight: 1.5,
  },
  ctaSection: {
    padding: '24px',
    textAlign: 'center' as const,
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#3783a5',
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
    fontSize: '14px',
    color: '#52525b',
    margin: '0 0 16px 0',
  },
  footerLinks: {
    fontSize: '12px',
    margin: '0 0 16px 0',
  },
  footerLink: {
    color: '#3783a5',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '11px',
    color: '#a1a1aa',
    margin: 0,
  },
};

export default WeeklyProgressEmail;
