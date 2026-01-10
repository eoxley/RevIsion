import * as React from 'react';

type LearningStyle = 'visual' | 'auditory' | 'read_write' | 'kinesthetic';

interface LearningStyleBreakdown {
  style: LearningStyle;
  percentage: number;
  strength: 'very_strong' | 'strong' | 'moderate' | 'mild';
}

interface NextStep {
  step: string;
  description: string;
  icon: string;
}

interface ParentWelcomeEmailProps {
  parentName: string;
  childName: string;
  // Learning profile
  primaryStyles: LearningStyle[];
  isMultimodal: boolean;
  styleBreakdown: LearningStyleBreakdown[];
  // What this means
  learningDescription: string;
  studyTips: string[];
  // Next steps
  nextSteps: NextStep[];
  // Subjects enrolled
  enrolledSubjects: string[];
  // Links
  dashboardUrl: string;
}

export function ParentWelcomeEmail({
  parentName,
  childName,
  primaryStyles,
  isMultimodal,
  styleBreakdown,
  learningDescription,
  studyTips,
  nextSteps,
  enrolledSubjects,
  dashboardUrl,
}: ParentWelcomeEmailProps) {
  const parentFirstName = parentName.split(' ')[0];
  const childFirstName = childName.split(' ')[0];
  const primaryStyleLabels = primaryStyles.map(s => getLearningStyleInfo(s).label);
  const styleText = isMultimodal
    ? `a multimodal learner (${primaryStyleLabels.join(' + ')})`
    : `a ${primaryStyleLabels[0]} learner`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Welcome to revIsion - {childFirstName}&apos;s Learning Profile</title>
      </head>
      <body style={styles.body}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.logo}>revIsion</h1>
            <div style={styles.headerBadge}>🎉 Welcome!</div>
          </div>

          {/* Welcome Message */}
          <div style={styles.welcomeSection}>
            <h2 style={styles.welcomeTitle}>Hi {parentFirstName}!</h2>
            <p style={styles.welcomeText}>
              Great news! {childFirstName} has completed their learning style assessment
              and is all set up on revIsion. We&apos;re excited to support their GCSE journey!
            </p>
          </div>

          {/* Learning Style Result */}
          <div style={styles.resultSection}>
            <div style={styles.resultIcon}>🧠</div>
            <h3 style={styles.resultTitle}>{childFirstName}&apos;s Learning Style</h3>
            <div style={styles.resultBadge}>
              {primaryStyles.map(s => getLearningStyleInfo(s).emoji).join(' ')} {styleText}
            </div>
          </div>

          {/* Style Breakdown */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📊 Learning Style Breakdown</h3>
            <div style={styles.breakdownList}>
              {styleBreakdown.map((item, index) => {
                const info = getLearningStyleInfo(item.style);
                return (
                  <div key={index} style={styles.breakdownItem}>
                    <div style={styles.breakdownHeader}>
                      <span style={styles.breakdownEmoji}>{info.emoji}</span>
                      <span style={styles.breakdownLabel}>{info.label}</span>
                      <span style={styles.breakdownPercentage}>{item.percentage}%</span>
                    </div>
                    <div style={styles.breakdownBarContainer}>
                      <div
                        style={{
                          ...styles.breakdownBar,
                          width: `${item.percentage}%`,
                          backgroundColor: info.colour,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What This Means */}
          <div style={styles.meaningSection}>
            <h3 style={styles.sectionTitle}>💡 What This Means for {childFirstName}</h3>
            <p style={styles.meaningText}>{learningDescription}</p>
            <div style={styles.tipBox}>
              <h4 style={styles.tipBoxTitle}>How {childFirstName} learns best:</h4>
              <ul style={styles.tipList}>
                {studyTips.map((tip, index) => (
                  <li key={index} style={styles.tipItem}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subjects Enrolled */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📚 Subjects Ready to Revise</h3>
            <p style={styles.sectionSubtitle}>
              {childFirstName} has enrolled in the following GCSE subjects:
            </p>
            <div style={styles.subjectGrid}>
              {enrolledSubjects.map((subject, index) => (
                <div key={index} style={styles.subjectChip}>
                  {subject}
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div style={styles.stepsSection}>
            <h3 style={styles.sectionTitle}>🚀 What Happens Next</h3>
            <p style={styles.sectionSubtitle}>
              Here&apos;s how revIsion will help {childFirstName} get exam-ready:
            </p>
            <div style={styles.stepsList}>
              {nextSteps.map((step, index) => (
                <div key={index} style={styles.stepItem}>
                  <div style={styles.stepNumber}>{index + 1}</div>
                  <div style={styles.stepContent}>
                    <div style={styles.stepHeader}>
                      <span style={styles.stepIcon}>{step.icon}</span>
                      <span style={styles.stepTitle}>{step.step}</span>
                    </div>
                    <p style={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Tips */}
          <div style={styles.parentSection}>
            <h3 style={styles.parentTitle}>👨‍👩‍👧 How You Can Help</h3>
            <p style={styles.parentIntro}>
              Research shows that parental involvement significantly boosts GCSE results.
              Here&apos;s how you can support {childFirstName}:
            </p>
            <div style={styles.parentTipsList}>
              <div style={styles.parentTip}>
                <span style={styles.parentTipIcon}>📧</span>
                <div style={styles.parentTipContent}>
                  <strong>Weekly Progress Reports</strong>
                  <p style={styles.parentTipText}>
                    We&apos;ll send you a weekly update every Sunday showing {childFirstName}&apos;s
                    progress, wins, and areas that need attention.
                  </p>
                </div>
              </div>
              <div style={styles.parentTip}>
                <span style={styles.parentTipIcon}>💬</span>
                <div style={styles.parentTipContent}>
                  <strong>Ask About Their Learning</strong>
                  <p style={styles.parentTipText}>
                    As {styleText}, try asking {childFirstName} to {getParentConversationTip(primaryStyles[0])}.
                  </p>
                </div>
              </div>
              <div style={styles.parentTip}>
                <span style={styles.parentTipIcon}>🏠</span>
                <div style={styles.parentTipContent}>
                  <strong>Create the Right Environment</strong>
                  <p style={styles.parentTipText}>
                    {getEnvironmentTip(primaryStyles[0])}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={styles.ctaSection}>
            <p style={styles.ctaText}>
              Ready to see {childFirstName}&apos;s learning dashboard?
            </p>
            <a href={dashboardUrl} style={styles.ctaButton}>
              View Parent Dashboard
            </a>
          </div>

          {/* What&apos;s Next Reminder */}
          <div style={styles.reminderSection}>
            <h4 style={styles.reminderTitle}>📅 Coming Up</h4>
            <p style={styles.reminderText}>
              {childFirstName}&apos;s first session will focus on understanding where they currently
              are in each subject. This initial diagnostic helps us create a personalised
              revision plan that targets exactly what they need to work on.
            </p>
            <p style={styles.reminderText}>
              You&apos;ll receive your first Weekly Progress Report next Sunday!
            </p>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Questions? Reply to this email or visit our Help Centre.
              We&apos;re here to help {childFirstName} succeed! 💪
            </p>
            <p style={styles.footerLinks}>
              <a href="https://revision.app/help" style={styles.footerLink}>Help Centre</a>
              {' | '}
              <a href="https://revision.app/parent-settings" style={styles.footerLink}>Email Settings</a>
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

function getLearningStyleInfo(style: LearningStyle) {
  const info: Record<LearningStyle, { label: string; emoji: string; colour: string; description: string }> = {
    visual: {
      label: 'Visual',
      emoji: '👁️',
      colour: '#3B82F6',
      description: 'diagrams, charts, colours, and visual aids',
    },
    auditory: {
      label: 'Auditory',
      emoji: '👂',
      colour: '#8B5CF6',
      description: 'listening, discussion, and verbal explanations',
    },
    read_write: {
      label: 'Read/Write',
      emoji: '📝',
      colour: '#22C55E',
      description: 'reading, note-taking, and written materials',
    },
    kinesthetic: {
      label: 'Kinesthetic',
      emoji: '🤲',
      colour: '#F97316',
      description: 'hands-on practice, movement, and real-world examples',
    },
  };
  return info[style];
}

function getParentConversationTip(style: LearningStyle): string {
  const tips: Record<LearningStyle, string> = {
    visual: 'draw or sketch what they learned today',
    auditory: 'explain what they learned to you out loud',
    read_write: 'show you their notes or summarise what they read',
    kinesthetic: 'demonstrate or act out a concept they studied',
  };
  return tips[style];
}

function getEnvironmentTip(style: LearningStyle): string {
  const tips: Record<LearningStyle, string> = {
    visual: 'Ensure good lighting and consider getting a whiteboard or coloured pens. Visual learners benefit from having space to create diagrams and mind maps.',
    auditory: 'A quiet space is ideal, but audiobooks and verbal discussions help. Consider letting them explain topics to you - teaching reinforces learning!',
    read_write: 'Provide plenty of notebooks, highlighters, and printouts. Read/write learners thrive with physical or digital notes they can organise.',
    kinesthetic: 'Allow movement and breaks. Kinesthetic learners often think better when walking or fidgeting. Hands-on activities and real-world connections help concepts stick.',
  };
  return tips[style];
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
    margin: '0 0 12px 0',
    letterSpacing: '-1px',
  },
  headerBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
  },
  welcomeSection: {
    padding: '32px 24px',
    textAlign: 'center' as const,
    borderBottom: '1px solid #e4e4e7',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 16px 0',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#52525b',
    margin: 0,
    maxWidth: '450px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  resultSection: {
    padding: '32px 24px',
    textAlign: 'center' as const,
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e4e4e7',
  },
  resultIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  resultTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#18181b',
    margin: '0 0 12px 0',
  },
  resultBadge: {
    display: 'inline-block',
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 600,
    border: '2px solid #bfdbfe',
  },
  section: {
    padding: '24px',
    borderBottom: '1px solid #e4e4e7',
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
  breakdownList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  breakdownItem: {
    padding: '12px 16px',
    backgroundColor: '#fafafa',
    borderRadius: '10px',
  },
  breakdownHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  breakdownEmoji: {
    fontSize: '20px',
  },
  breakdownLabel: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#18181b',
    flex: 1,
  },
  breakdownPercentage: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#3B82F6',
  },
  breakdownBarContainer: {
    height: '8px',
    backgroundColor: '#e4e4e7',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  breakdownBar: {
    height: '100%',
    borderRadius: '4px',
  },
  meaningSection: {
    padding: '24px',
    backgroundColor: '#eff6ff',
    borderBottom: '1px solid #bfdbfe',
  },
  meaningText: {
    fontSize: '15px',
    color: '#1e40af',
    margin: '0 0 20px 0',
  },
  tipBox: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #bfdbfe',
  },
  tipBoxTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e40af',
    margin: '0 0 12px 0',
  },
  tipList: {
    margin: 0,
    paddingLeft: '20px',
  },
  tipItem: {
    fontSize: '14px',
    color: '#3b82f6',
    marginBottom: '8px',
  },
  subjectGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  subjectChip: {
    backgroundColor: '#f4f4f5',
    color: '#18181b',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
  },
  stepsSection: {
    padding: '24px',
    borderBottom: '1px solid #e4e4e7',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  stepItem: {
    display: 'flex',
    gap: '16px',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    backgroundColor: '#3B82F6',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    paddingTop: '4px',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  stepIcon: {
    fontSize: '16px',
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#18181b',
  },
  stepDescription: {
    fontSize: '14px',
    color: '#52525b',
    margin: 0,
  },
  parentSection: {
    padding: '24px',
    backgroundColor: '#f0fdf4',
    borderBottom: '1px solid #bbf7d0',
  },
  parentTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#166534',
    margin: '0 0 8px 0',
  },
  parentIntro: {
    fontSize: '14px',
    color: '#15803d',
    margin: '0 0 20px 0',
  },
  parentTipsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  parentTip: {
    display: 'flex',
    gap: '12px',
    padding: '14px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  parentTipIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  parentTipContent: {
    flex: 1,
  },
  parentTipText: {
    fontSize: '13px',
    color: '#52525b',
    margin: '6px 0 0 0',
  },
  ctaSection: {
    padding: '32px 24px',
    textAlign: 'center' as const,
    backgroundColor: '#fafafa',
  },
  ctaText: {
    fontSize: '16px',
    color: '#52525b',
    margin: '0 0 20px 0',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#3B82F6',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 40px',
    borderRadius: '10px',
    textDecoration: 'none',
  },
  reminderSection: {
    padding: '24px',
    backgroundColor: '#fef3c7',
    borderBottom: '1px solid #fcd34d',
  },
  reminderTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#92400e',
    margin: '0 0 12px 0',
  },
  reminderText: {
    fontSize: '14px',
    color: '#92400e',
    margin: '0 0 12px 0',
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

export default ParentWelcomeEmail;
