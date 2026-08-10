import { NextResponse } from 'next/server';

// Full RAG System Context with complete CV facts for Ahmed Hossam
const SYSTEM_CV_CONTEXT = `
You are the official AI Portfolio Assistant for Ahmed Hossam Ahmed, a Full Stack Developer & System Architect based in Cairo, Egypt.
Answer any question about Ahmed Hossam accurately, warmly, professionally, and concisely using the facts below. 
Answer in the user's language (Arabic or English). Always format output nicely using markdown bullet points and bold headers.

Candidate Profile:
- Name: Ahmed Hossam Ahmed
- Role: Full-Stack Developer / System Architect
- Location: Cairo, Egypt (Open to Remote, Hybrid, & On-site roles worldwide)
- Email: ahmedhossam1691977@gmail.com
- Phone / WhatsApp: +20 01003241993
- LinkedIn: https://linkedin.com/in/ahmed-hossam-32346a251
- GitHub: https://github.com/AhmedHossam1691977
- Languages: Arabic (Native), English (Professional Technical)

Education & Certifications:
- Bachelor’s Degree in Computer Science — Al-Obour Higher Institute (2020 – 2024)
- Intensive MEARN Stack Program — Information Technology Institute (ITI), Zagazig Branch (07/2025 – 12/2025)
- Web Development Training — Route Academy (2023 – 2024)

Work History:
1. ANMKA (Full Stack Developer, 04/2026 – 07/2026): Next.js, React.js, Node.js, Express.js, Prisma ORM, PostgreSQL, MongoDB, clean software architecture.
2. AMB / App: PAMB (Backend Developer, 09/2025 – 04/2026) [Published on Google Play Store]: NestJS, Node.js, Socket.IO, MQTT telemetry, Firebase Cloud Messaging (FCM) emergency alert pushes, MongoDB.
3. AKM E-Commerce System (Full Stack Developer, 08/2024 – 05/2025): Full-stack e-commerce system, real-time order tracking, Node.js, Express, React, MySQL, Prisma ORM, MongoDB.

Featured Projects:
1. Sphinx Beauty E-Commerce: Live Demo: https://sphinx-one.anmka.com/ (Next.js 15, Node.js, MySQL, Prisma, JWT)
2. MathApex Academy: Live Demo: https://mathapex-academy.e.anmka.com/ (React.js, Next.js, Express, MongoDB)
3. English Master: Live Demo: https://english-master.anmka.com/ (Next.js, TypeScript, PostgreSQL, Audio Streaming)
4. Ride-Sharing Backend System: GitHub: https://github.com/AhmedHossam1691977/ride-sharing-app (Node.js, Socket.IO, Redis, MongoDB)
5. AI Coach (ITI Graduation Project): Live Demo: https://ai-coach-lemon-six.vercel.app/#/ | GitHub: https://github.com/AhmedHossam1691977/roleplay_trainer_api (Next.js, Python FastAPI, LLMs, RAG Vector Search)
6. PROTEK AMB: Google Play Store App: https://play.google.com/store/apps/details?id=com.azizalbarik.company.survival (NestJS, Socket.IO, MQTT, FCM)
7. Falcor — Men's Fashion & Accessories: Live Demo: https://falcor.anmka.com/ (Next.js, Node.js, MySQL, Prisma ORM, Tailwind CSS)

Technical Skills:
- Front-End: Next.js 15 (App Router), React.js, TypeScript, Angular, Tailwind CSS, GSAP Animations, Redux Toolkit.
- Back-End: Node.js, Express.js, NestJS, Socket.IO (Real-Time), MQTT, RESTful APIs, GraphQL, JWT/RBAC.
- Databases: PostgreSQL, MongoDB, MySQL, Prisma ORM, Sequelize, Redis.
- AI & Automation: LLMs, RAG Integration, Vector DBs (PGVector), LangChain, n8n, Prompt Engineering, Chatbot Development.
- DevOps & Tools: AWS (S3, EC2), Docker, Git/GitHub, Postman, Agile/Scrum, Jira.
`;

// Smart Fallback Matcher covering open-ended conversational questions
function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Age / Birthday / Graduation
  if (q.includes('age') || q.includes('old') || q.includes('born') || q.includes('birthday') || q.includes('سن') || q.includes('عمر') || q.includes('تخرج')) {
    return `### 👤 Age & Educational Background\n\n` +
      `Ahmed Hossam completed his **Bachelor's Degree in Computer Science (2020 – 2024)** at Al-Obour Higher Institute, followed by the **ITI MEARN Stack Intensive Program (2025)**.\n\n` +
      `He is an ambitious Full Stack Developer in his early 20s based in Cairo, Egypt!`;
  }

  // Greetings
  if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q.includes('ازيك') || q.includes('اهلا') || q.includes('أهلا') || q.includes('سلام') || q.includes('مرحبا')) {
    return `Hello! 👋 How can I help you learn more about Ahmed Hossam's skills, projects, or work experience today?`;
  }

  // Who is Ahmed
  if (q.includes('who') || q.includes('yourself') || q.includes('about') || q.includes('مين') || q.includes('انت') || q.includes('أنت') || q.includes('هو')) {
    return `### ⚡ Who is Ahmed Hossam?\n\n` +
      `Ahmed Hossam is a **Full Stack Engineer & System Architect** based in Cairo, Egypt.\n\n` +
      `- **Specialization:** Next.js 15, React.js, Node.js, NestJS, Socket.IO real-time systems, and LLM/RAG AI integrations.\n` +
      `- **Experience:** Engineered platforms for ANMKA, AKM E-Commerce, and the PROTEK AMB app published on **Google Play**.\n` +
      `- **Status:** Available Immediately for New Opportunities!`;
  }

  // Remote / Location / Relocation
  if (q.includes('remote') || q.includes('relocate') || q.includes('location') || q.includes('cairo') || q.includes('ريموت') || q.includes('سفر') || q.includes('مكان') || q.includes('موقع')) {
    return `### 🌍 Work Availability & Location\n\n` +
      `- **Location:** Cairo, Egypt\n` +
      `- **Availability:** **Available Immediately** for Remote (Worldwide), Hybrid, and On-site positions.`;
  }

  // Contact / Hire
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('تواصل') || q.includes('توظيف') || q.includes('رقم')) {
    return `### 📞 Contact Details:\n\n` +
      `- 📧 **Email:** [ahmedhossam1691977@gmail.com](mailto:ahmedhossam1691977@gmail.com)\n` +
      `- 📱 **Phone / WhatsApp:** [+20 01003241993](https://wa.me/2001003241993)\n` +
      `- 💼 **LinkedIn:** [ahmed-hossam-32346a251](https://linkedin.com/in/ahmed-hossam-32346a251)\n` +
      `- 💻 **GitHub:** [AhmedHossam1691977](https://github.com/AhmedHossam1691977)`;
  }

  // Default Overview Response
  return `### 🤖 Ahmed Hossam Portfolio AI\n\n` +
    `Regarding **"${query}"**:\n\n` +
    `Ahmed Hossam is a **Full Stack Engineer & System Architect** with hands-on expertise in Next.js 15, Node.js, NestJS, Socket.IO, and AI RAG systems.\n\n` +
    `Feel free to ask me specifically about his **projects (Sphinx, MathApex, AI Coach, PROTEK AMB), work experience (ANMKA, AMB, AKM), tech stack, or contact info!**`;
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query is required.' },
        { status: 400 }
      );
    }

    const openAiKey = process.env.OPENAI_API_KEY || '';
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Try OpenAI Chat Completions API (gpt-4o-mini or gpt-3.5-turbo)
    if (openAiKey && openAiKey.trim() !== '') {
      try {
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: SYSTEM_CV_CONTEXT,
              },
              {
                role: 'user',
                content: query,
              },
            ],
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const generatedText = openAiData?.choices?.[0]?.message?.content;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              answer: generatedText,
              engine: 'OpenAI-gpt-4o-mini',
            });
          }
        } else {
          // If gpt-4o-mini fails, try gpt-3.5-turbo fallback
          const fallbackRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openAiKey.trim()}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: SYSTEM_CV_CONTEXT },
                { role: 'user', content: query },
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          });

          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const text = fallbackData?.choices?.[0]?.message?.content;
            if (text) {
              return NextResponse.json({
                success: true,
                answer: text,
                engine: 'OpenAI-gpt-3.5-turbo',
              });
            }
          }
        }
      } catch (openAiErr) {
        console.warn('OpenAI API call error:', openAiErr);
      }
    }

    // 2. Try Gemini 1.5 Flash API as secondary fallback
    if (geminiKey && geminiKey.trim() !== '') {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `Context:\n${SYSTEM_CV_CONTEXT}\n\nQuestion: ${query}\n\nAnswer directly in markdown:`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return NextResponse.json({
              success: true,
              answer: text,
              engine: 'Gemini-1.5-Flash',
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call error:', geminiErr);
      }
    }

    // 3. Fallback to Enhanced Conversational RAG Engine
    const answer = getSmartFallbackResponse(query);

    return NextResponse.json({
      success: true,
      answer,
      engine: 'Smart-RAG-Conversational-Engine',
    });
  } catch (error) {
    console.error('AI Chat Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'AI Assistant error.' },
      { status: 500 }
    );
  }
}
