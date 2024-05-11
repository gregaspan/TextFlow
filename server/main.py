from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from deep_translator import GoogleTranslator
import requests
import voicerss_tts
import assemblyai as aai
import base64
from bs4 import BeautifulSoup

app = Flask(__name__)
cors = CORS(app, origins='*')

KEY = "zu-a3482e6ed88b38af358d064805358962"
VOICERSS_TTS_KEY = "862fba3703124c5d9cfd410aff494ae5"

ASSEMLBLYAI_STT_KEY = "c6d1e28d398741a7a45554a6fd1d0139"
X_RAPIDAPI_KEY = "1d9f8aa758msh0f2f642becf4515p1bfb89jsnf70f64195fe4"
DICTIONARY_API = "GJgVXGJMDDfsC7576edkFw==h7tVsSDr6WCNdoXX"


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
    translated = GoogleTranslator(source='sl', target='en').translate("slabo") 
    print(translated)

    
    url = f"https://api.api-ninjas.com/v1/thesaurus?word={translated}"

    headers = {
        'X-Api-Key': DICTIONARY_API
    }

    neke = requests.get(url, headers=headers).json()["synonyms"]
    tem = []
    for i in range(5):
        tem.append(GoogleTranslator(source='en', target='sl').translate(neke[i]))
    return tem

@app.route('/api/scrape', methods=["GET"])
def scrape24ur():
    url = ''  
    domain = url.split('/')[2]  

    page_to_scrape = requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    if '24ur.com' in domain:
        naslov = soup.find_all('h1', attrs={"class": "text-24 lg:text-27 leading-tight font-bold text-black dark:text-white mb-8"})
        povzetek = soup.find_all('p', attrs={"class": "text-article-summary font-semibold leading-tight text-black dark:text-white"})
        vsebina_clanka = soup.find_all('div', attrs={"class": "contextual"})
        tags = soup.find_all('a', attrs={"class": "uppercase text-12 font-bold px-6 py-2 mb-8 mr-4 border border-primary dark:border-primary-400 rounded-sm default-transition text-primary dark:text-primary-400 hover:bg-primary hover:text-white dark:hover:text-white"})

    elif 'rtvslo.si' in domain:
        naslov = soup.find_all('header', attrs={"class": "article-header"})
        povzetek = soup.find_all('p', attrs={"class": "lead"})
        vsebina_clanka = soup.find_all('div', attrs={"class": "article-body"})
        tags = soup.find_all('a', attrs={"class": "tag"})

    elif 'siol.net' in domain:
        naslov = soup.find_all('h1', attrs={"class": "article_head__title"})
        povzetek = soup.find_all('div', attrs={"class": "article_content__lead_text"})
        vsebina_clanka = soup.find_all('div', attrs={"class": "article_content__inline_elements"})
        tags = soup.find_all('a', attrs={"class": "article_left_sidebar__keyword"})

    elif 'arnes.si' in domain:
        naslov = soup.find_all('h1')
        if len(naslov) > 1:
            naslov[0] = naslov[1]
        povzetek = ""
        vsebina_clanka = soup.find_all('p')
        tags = ""

    elif 'zurnal24.si' in domain:
        naslov = soup.find_all('h1', attrs={"class": "article__title"})
        povzetek = soup.find_all('div', attrs={"class": "article__leadtext"})
        vsebina_clanka = soup.find_all('div', attrs={"class": "article__content no_page_break cf"})
        tags = soup.find_all('a', attrs={"class": "article__tag_name"})
    
    vsa_vsebina = ""
    for vsebina in vsebina_clanka:
        vsa_vsebina = vsa_vsebina + vsebina.text

    vsi_tags = ""
    for tag in tags:
        vsi_tags = vsi_tags + tag.text

    return jsonify({
        "naslov": naslov[0].text if naslov else "",
        "povzetek": povzetek[0].text if povzetek else "",
        "vsebina_clanka": vsa_vsebina,
        "tags": vsi_tags
    })


@app.route('/api/sskj', methods=["GET"])
def sskj():
    beseda = "miza"
    url = "https://www.fran.si/iskanje?FilteredDictionaryIds=130&View=1&Query=" + beseda
    page_to_scrape = requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, 'html.parser')

    beseda = beseda.capitalize()
    zaglavje = soup.find_all('span', attrs={"data-group": "header"})
    definicija = soup.find_all('span', attrs={"data-group": "explanation "})
    celota = soup.find_all('div', attrs={"class": "entry-content"})

    return jsonify({
        "beseda": beseda,
        "zaglavje": zaglavje[0].text if zaglavje else "",
        "definicija": definicija[0].text if definicija else "",
        "celota": celota[0].text if celota else ""
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
