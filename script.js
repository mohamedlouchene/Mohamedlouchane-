async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("response");
  responseBox.innerText = "⏳ جاري التفكير...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input }),
    });

    const data = await res.json();
    responseBox.innerText = data.reply || "❌ لم أتلقَ ردًا من الخادم.";
  } catch (error) {
    responseBox.innerText = "⚠️ حدث خطأ في الاتصال بالخادم.";
  }
}