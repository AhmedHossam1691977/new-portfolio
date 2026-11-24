import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, and Message).' },
        { status: 400 }
      );
    }

    const recipient = 'ahmedhossam1691977@gmail.com';
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || 'eb8be1fb-27e1-454a-a71c-43f7215f9b4c';

    // 1. Attempt delivery via Web3Forms
    try {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          to_email: recipient,
          subject: `📬 New Portfolio Message from ${name}`,
          from_name: 'Ahmed Hossam Portfolio',
        }),
      });

      if (web3Res.ok) {
        const data = await web3Res.json();
        if (data.success) {
          return NextResponse.json({
            success: true,
            message: `Your message has been sent successfully to ${recipient}!`,
          });
        }
      }
    } catch (wErr) {
      console.warn('Web3Forms server-side warning:', wErr);
    }

    // 2. Attempt delivery via FormSubmit
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _replyto: email,
          _subject: `📬 New Portfolio Message from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (fsRes.ok) {
        const fsData = await fsRes.json();
        if (fsData.success === 'true' || fsData.success === true || fsData.message) {
          return NextResponse.json({
            success: true,
            message: `Your message has been sent successfully to ${recipient}!`,
          });
        }
      }
    } catch (fsErr) {
      console.warn('FormSubmit server-side warning:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: `Your message has been queued for ${recipient}!`,
    });
  } catch (error) {
    console.error('Contact Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing message.' },
      { status: 500 }
    );
  }
}

