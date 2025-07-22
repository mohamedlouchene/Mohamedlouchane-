    export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مدعومة" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "الرسالة مفقودة" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد ذكي موجه خصيصًا لتلاميذ الجزائر المقبلين على شهادة التعليم المتوسط. قدم المساعدة بأسلوب شبابي واضح وراقي، وكن صديقًا لهم دون استخدام أكواد برمجية أو صور.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI Error:", data.error);
      return res.status(500).json({ message: "خطأ من OpenAI: " + data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || "لم أتمكن من الرد على ذلك.";

    res.status(200).json({ message: reply });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ message: "حدث خطأ أثناء الاتصال بـ OpenAI." });
  }
}
