const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Replace with your actual OpenAI API key
const apiKey = 'my chatgpt key'; 

sendButton.addEventListener('click', async () => {
    const message = userInput.value;
    if (!message) return;

    appendMessage('You: ' + message);
    userInput.value = '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Specify the model you want to use
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    appendMessage('ChatGPT: ' + reply);
});

function appendMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}
