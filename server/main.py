from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import requests
import voicerss_tts
import base64


app = Flask(__name__)
cors = CORS(app, origins='*')

KEY = "zu-a3482e6ed88b38af358d064805358962"
VOICERSS_TTS_KEY = "862fba3703124c5d9cfd410aff494ae5"
X_RAPIDAPI_KEY = "1d9f8aa758msh0f2f642becf4515p1bfb89jsnf70f64195fe4"

@app.route('/api/innovise', methods=['GET'])
def innovise():
    return jsonify({
        "innovise": [
            'Jan',
            'Tit',
            'Grega'
        ]
    })

@app.route('/api/ai', methods=['GET'])
def ai():
    client = OpenAI(
    api_key=KEY,
    base_url="https://zukijourney.xyzbot.net/v1"
    )

    chat_completion = client.chat.completions.create(
        stream=False, 
        model="gpt-4",  
        response_format={"type": "json_object"},
        messages=[
        {
            "role": "user",
            "content": 'Kaj je glavno mesto Slovenije? ',
        },
    ],
    )
    return jsonify(chat_completion.json())

@app.route('/api/simplify', methods=['POST'])
def simplify_text():
 
    data = request.json
    print(data)
    text = data.get('text')
    level = data.get('level')

    client = OpenAI(
    api_key=KEY,
    base_url="https://zukijourney.xyzbot.net/v1"
    )

    chat_completion = client.chat.completions.create(
        stream=False, 
        model="gpt-4",  
        response_format={"type": "json_object"},
        messages=[
        {
            "role": "user",
            "content": f"Poenostavi besedilo {level} na nivo: {text}",
        },
    ],
    )

    print(chat_completion)
    return jsonify(chat_completion.json())

@app.route('/api/tts', methods=['GET'])
def tts():
    url = "https://voicerss-text-to-speech.p.rapidapi.com/"
    querystring = {
        "key": VOICERSS_TTS_KEY,
        "src": "Zdravo svet!",
        "hl": "sl-si",
        "r": "0",
        "c": "mp3",
        "f": "8khz_8bit_mono"
    }

    headers = {
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    audio_data = base64.b64encode(response.content).decode('utf-8')
    audio_player = f"<audio controls='controls'><source src='data:audio/mpeg;base64,{audio_data}'></audio>"
    return audio_player

@app.route('/api/translate-en', methods=["GET", "POST"])
def translate_en():
    url = "https://google-translate1.p.rapidapi.com/language/translate/v2"

    payload = {
        "q": "Kje je knjiznica?",
        "target": "en",
        "source": "sl"
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
    }

    response = requests.post(url, data=payload, headers=headers)
    return response.json()

@app.route('/api/translate-slo', methods=["GET", "POST"])
def translate_slo():
    url = "https://google-translate1.p.rapidapi.com/language/translate/v2"

    payload = {
        "q": "Where is the library?",
        "target": "sl",
        "source": "en"
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
    }

    response = requests.post(url, data=payload, headers=headers)
    return response.json()

if __name__ == "__main__":
    app.run(debug=True, port=8080)
