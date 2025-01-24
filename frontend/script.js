document.getElementById('send-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) {
        alert("Lütfen bir metin girin.");
        return;
    }

    const responseBox = document.getElementById('response-box');
    responseBox.style.display = 'none';
    responseBox.textContent = 'Cevap alınıyor...';

    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: userInput })
        });

        const data = await response.json();
        if (data.error) {
            responseBox.textContent = "Bir hata oluştu: " + data.error;
        } else {
            responseBox.textContent = "Cevap: " + data.output;
        }
        responseBox.style.display = 'block';
    } catch (error) {
        responseBox.textContent = "Bir hata oluştu: " + error.message;
        responseBox.style.display = 'block';
    }
});
