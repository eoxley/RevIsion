import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// For backwards compatibility - use getResend() for new code
export const resend = {
  emails: {
    send: async (...args: Parameters<Resend['emails']['send']>) => {
      return getResend().emails.send(...args);
    },
  },
};

// Default sender - update this to your verified domain
export const FROM_EMAIL = 'revIsion <noreply@resend.dev>';

// For production, use your verified domain:
// export const FROM_EMAIL = 'revIsion <noreply@revision.app>';
