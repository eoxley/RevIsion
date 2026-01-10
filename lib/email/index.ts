// Email service exports
export { resend, FROM_EMAIL } from './resend';
export {
  sendParentWeeklyProgressEmail,
  sendParentWelcomeEmail,
  parentTipsByStyle,
} from './send-emails';

// Email templates
export { ParentWeeklyProgressEmail } from './templates/parent-weekly-progress';
export { ParentWelcomeEmail } from './templates/parent-welcome';
