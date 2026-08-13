import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = 'hello@m3hive.com';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  interest?: string;
  message?: string;
  honeypot?: string;
  recaptchaToken?: string;
};

function jsonResponse(
  data: Record<string, unknown>,
  status = 200
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error('Missing RECAPTCHA_SECRET_KEY');
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  return (
    result.success === true &&
    result.action === 'contact_form' &&
    typeof result.score === 'number' &&
    result.score >= 0.5
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    const firstName = payload.firstName?.trim() ?? '';
    const lastName = payload.lastName?.trim() ?? '';
    const email = payload.email?.trim().toLowerCase() ?? '';
    const country = payload.country?.trim() ?? '';
    const interest = payload.interest?.trim() || 'Not specified';
    const message = payload.message?.trim() ?? '';
    const honeypot = payload.honeypot?.trim() ?? '';
    const recaptchaToken = payload.recaptchaToken?.trim() ?? '';

    // Honeypot bot check
    if (honeypot) {
      return jsonResponse({ success: true });
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !country ||
      !message
    ) {
      return jsonResponse(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        400
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return jsonResponse(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        400
      );
    }

    if (!recaptchaToken) {
      return jsonResponse(
        {
          success: false,
          message: 'Security verification failed. Please try again.',
        },
        400
      );
    }

    const recaptchaValid =
      await verifyRecaptcha(recaptchaToken);

    if (!recaptchaValid) {
      return jsonResponse(
        {
          success: false,
          message: 'Security verification failed. Please try again.',
        },
        403
      );
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY');
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeCountry = escapeHtml(country);
    const safeInterest = escapeHtml(interest);
    const safeMessage = escapeHtml(message).replace(
      /\n/g,
      '<br />'
    );

    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        'M3 Hive Website <website@m3hive.com>',

      to: [CONTACT_EMAIL],

      replyTo: email,

      subject: `New M3 Hive enquiry from ${firstName} ${lastName}`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#161616;">
          <div style="border-bottom:4px solid #fdcf09;padding-bottom:16px;margin-bottom:24px;">
            <h2 style="margin:0;">New Website Enquiry</h2>
          </div>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:bold;">Name</td>
              <td style="padding:8px 0;">
                ${safeFirstName} ${safeLastName}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 0;font-weight:bold;">Email</td>
              <td style="padding:8px 0;">
                ${safeEmail}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 0;font-weight:bold;">Country</td>
              <td style="padding:8px 0;">
                ${safeCountry}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 0;font-weight:bold;">Area of Interest</td>
              <td style="padding:8px 0;">
                ${safeInterest}
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h3 style="margin-bottom:8px;">Message</h3>

            <div style="background:#f7f7f7;border:1px solid #e5e5e5;border-radius:8px;padding:16px;line-height:1.6;">
              ${safeMessage}
            </div>
          </div>

          <p style="margin-top:24px;font-size:12px;color:#777;">
            Submitted through the M3 Hive website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return jsonResponse(
        {
          success: false,
          message: 'Unable to send your message. Please try again.',
        },
        500
      );
    }

    return jsonResponse({
      success: true,
      message:
        'Thank you. Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return jsonResponse(
      {
        success: false,
        message: 'Unable to send your message. Please try again later.',
      },
      500
    );
  }
}

export function GET() {
  return jsonResponse(
    {
      success: false,
      message: 'Method not allowed.',
    },
    405
  );
}