from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
cors = CORS(app, origins='*')

KEY = "zu-a3482e6ed88b38af358d064805358962"

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


if __name__ == "__main__":
    app.run(debug=True, port=8080)
