export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userMessage } = req.body;

  try {
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "أنت مساعد تعليمي شبابي خاص بشهادة التعليم المتوسط (BEM) في الجزائر. لا تولد أكواد برمجية ولا صور. أجب عن الأسئلة بدقة وبلغة عربية مفهومة."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
      }),
    });

    const gptData = await gptRes.json();
    const reply = gptData.choices?.[0]?.message?.content || "لم أتمكن من توليد إجابة.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ message: "خطأ في الاتصال بـ OpenAI." });
  }
}