const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage("أنت", userMessage, "user");
  chatInput.value = "";

  addMessage("محمد لوشان Ai", "جاري التفكير...", "assistant");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    // حدّث آخر رسالة من "جاري التفكير..." إلى الرد الحقيقي
    const allMessages = document.querySelectorAll(".message.assistant");
    const lastMessage = allMessages[allMessages.length - 1];
    lastMessage.querySelector(".content").textContent = data.message || "لم أتمكن من توليد إجابة.";

  } catch (error) {
    console.error("حدث خطأ:", error);
    const allMessages = document.querySelectorAll(".message.assistant");
    const lastMessage = allMessages[allMessages.length - 1];
    lastMessage.querySelector(".content").textContent = "حدث خطأ أثناء الاتصال بالخادم.";
  }
});

function addMessage(name, text, role) {
  const message = document.createElement("div");
  message.classList.add("message", role);
  message.innerHTML = `
    <div class="name">${name}</div>
    <div class="content">${text}</div>
  `;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}
