import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender - update this to your verified domain
export const FROM_EMAIL = 'revIsion <noreply@resend.dev>';

// For production, use your verified domain:
// export const FROM_EMAIL = 'revIsion <noreply@revision.app>';
