from flask import Flask, jsonify
from flask_cors import CORS
from openai import OpenAI


app = Flask(__name__)
cors = CORS(app, origins='*')

KEY = "zu-23f971dd13e55bf7d161d94a5d46840b"

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
        messages=[
        {
            "role": "user",
            "content": 'Kaj je glavno mesto Slovenije? ',
        },
    ],
    )
    return jsonify(chat_completion.json())

if __name__ == "__main__":
    app.run(debug=True, port=8080)
