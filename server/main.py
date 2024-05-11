from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from deep_translator import GoogleTranslator
from serpapi import GoogleSearch
import requests
#import voicerss_tts
#import assemblyai as aai
import base64
from bs4 import BeautifulSoup

app = Flask(__name__)
cors = CORS(app, origins='*')

KEY = "zu-a3482e6ed88b38af358d064805358962"
VOICERSS_TTS_KEY = "862fba3703124c5d9cfd410aff494ae5"

ASSEMLBLYAI_STT_KEY = "c6d1e28d398741a7a45554a6fd1d0139"
X_RAPIDAPI_KEY = "1d9f8aa758msh0f2f642becf4515p1bfb89jsnf70f64195fe4"
DICTIONARY_API = "GJgVXGJMDDfsC7576edkFw==h7tVsSDr6WCNdoXX"
IMAGES_API = "2e26df2e32f8642d3ade8783db66d9e8bfa4e0b86283d94ad14011402b4e46e3"


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



@app.route('/api/stt', methods=['GET'])
def stt():

    aai.settings.api_key = ASSEMLBLYAI_STT_KEY
    FILE_URL = "https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3"

    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(FILE_URL)

    #print("TUKAJJJJJJJJJJJJJJJJ ",type(transcript))
    #print(transcript.text)

    
    # Assuming 'transcript' has a method to get text
    transcript_text = transcript.get_text() if hasattr(transcript, 'get_text') else "No text available"
    return jsonify({"transcript": transcript.text})

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

@app.route('/api/dictionary', methods=["GET", "POST"])
def dictionary():
    translated = GoogleTranslator(source='sl', target='en').translate("avto") 
    
    url = f"https://api.api-ninjas.com/v1/thesaurus?word={translated}"

    headers = {
        'X-Api-Key': DICTIONARY_API
    }

    neke = requests.get(url, headers=headers).json()["synonyms"]
    tem = []
    for i in neke:
        tem.append(GoogleTranslator(source='en', target='sl').translate(i))

    params = {
        "q": translated,
        "engine": "google_images",
        "api_key": IMAGES_API
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    images_results = results["images_results"]
    return images_results
    return tem

if __name__ == "__main__":
    app.run(debug=True, port=8080)
