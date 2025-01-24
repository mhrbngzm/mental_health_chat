import requests
from flask import Flask, request, jsonify, render_template # type: ignore

app = Flask(__name__)

# Google AI Studio model API URL'si (örnek URL)
MODEL_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY"  # Bu URL'yi Google AI Studio'dan alacaksınız
API_KEY = "AIzaSyDGNkBPrW1gwRhMOr00CB7-trTVrZR5M-E"  # API anahtarınızı buraya ekleyin

@app.route('/')
def home():
    return render_template('index.html')  # HTML dosyasını render et

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')
    if not user_input:
        return jsonify({"error": "Input text is missing"}), 400

    # Google AI Studio API'ye istek gönder
    response = requests.post(
        MODEL_API_URL, 
        json={"input": user_input},  # API'ye gönderilecek veri
        headers={"Authorization": f"Bearer {API_KEY}"}
    )

    if response.status_code == 200:
        model_response = response.json()  # Modelin yanıtını al
        return jsonify({"output": model_response.get("output", "No output from model")})
    else:
        return jsonify({"error": f"API request failed with status {response.status_code}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
