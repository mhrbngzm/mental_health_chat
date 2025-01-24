document.getElementById('sendBtn').addEventListener('click', async () => {
    const input = document.getElementById('userInput').value;

    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    });

    const result = await response.json();
    document.getElementById('response').innerText = result.output || result.error;
});
