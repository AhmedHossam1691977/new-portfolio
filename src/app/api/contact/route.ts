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

    const emailPayload = {
      name: name,
      email: email,
      message: message,
      _replyto: email,
      _subject: `📬 New Portfolio Direct Message from ${name}`,
      _template: 'table',
    };

    // 1. Primary Serverless Email Delivery via FormSubmit API to ahmedhossam1691977@gmail.com
    try {
      const fsRes = await fetch('https://formsubmit.co/ajax/ahmedhossam1691977@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Origin': 'https://ahmedhossam.dev',
          'Referer': 'https://ahmedhossam.dev/',
        },
        body: JSON.stringify(emailPayload),
      });

      if (fsRes.ok) {
        const fsData = await fsRes.json();
        if (fsData.success === 'true' || fsData.success === true || fsData.message) {
          return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully to Ahmed Hossam!',
          });
        }
      }
    } catch (fsErr) {
      console.warn('FormSubmit endpoint warning:', fsErr);
    }

    // 2. Secondary Email Delivery via Web3Forms if Key is present
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key && web3Key.trim() !== '') {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key.trim(),
            name: name,
            email: email,
            message: message,
            to_email: 'ahmedhossam1691977@gmail.com',
            subject: `📬 New Portfolio Message from ${name}`,
          }),
        });

        if (web3Res.ok) {
          return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully to Ahmed Hossam!',
          });
        }
      } catch (wErr) {
        console.warn('Web3Forms endpoint warning:', wErr);
      }
    }

    // 3. Fallback Response (Client opens mailto trigger as instant backup)
    return NextResponse.json({
      success: true,
      fallback: true,
      message: 'Message processed. Opening direct email client...',
    });
  } catch (error) {
    console.error('Contact Route Error:', error);
    // Never fail: return success fallback so the user experience is smooth
    return NextResponse.json({
      success: true,
      fallback: true,
      message: 'Message processed. Opening direct email client...',
    });
  }
}
