from tkinter import ttk
# from flask import Flask, render_template, request,jsonify
from PIL import Image, ImageTk
from PIL.ImageTk import PhotoImage
from sklearn.metrics import silhouette_score
import config
import spotipy
import pandas as pd
import cv2
import numpy as np
import base64
from spotipy.oauth2 import SpotifyClientCredentials
from emotion_video_classifier import emotion_testing
import tkinter as tk
from tkinter import messagebox
from flask import Flask, render_template, redirect, session, jsonify, request
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
app.secret_key = '83205a215b8345308ab0452158ff57b5'  # Replace with a secure key in production

# Spotify app credentials
CLIENT_ID = "d91292b0796944389c009d15c81e48a2"
CLIENT_SECRET = "83205a215b8345308ab0452158ff57b5"
REDIRECT_URI = 'http://127.0.0.1:5000/recommend'

# Scopes required for playback control
SCOPE = 'user-read-playback-state user-modify-playback-state streaming'

# Initialize SpotifyOAuth
sp_oauth = SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope=SCOPE,
    cache_path='.spotifycache'
)

@app.route("/get_token")
def get_token():
    auth_response = request.post(
        "https://accounts.spotify.com/api/token",
        data={"grant_type": "client_credentials"},
        auth=(CLIENT_ID, CLIENT_SECRET),
    )
    return jsonify(auth_response.json())


@app.route('/')
def index():
    return render_template('index.html')  # A simple form page where users search for artists

@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/search', methods=['GET', 'POST'])
def search_artist():
    access_token = 'BQCP8POP7IaByVfnaNyg4GfwsoHV-cg5GL9uEoWuD8q7JQw5pALvyj1soOxCCMCVUM3MmPU0fCRVia_X7b6USzA4fJE2HW8jAi55p2Bhi52vKCCLjtYZNbq1C80uy7lbcOJkRxfdSuH-0akHWjlK86KmXr62Dz1kSAEGbCAUZ-OT_09KVI6jPGyM6nnYQx3MYOGuvZ3RDdobkUqELGXt-XCN6RDbo_54No-mRoWr-VMDvq1nE47JxKzxMw'
    if isinstance(access_token, str) == False:
        return access_token  # This is a redirect response

    sp = spotipy.Spotify(auth=access_token)

    if request.method == 'POST':
        artist_name = request.form.get('artist')
        if not artist_name:
            return render_template('results.html', artist_name="", songs=[], access_token=access_token)

        results = sp.search(q=f'artist:{artist_name}', type='track', limit=10)
        songs = []
        for item in results['tracks']['items']:
            songs.append({
                "name": item['name'],
                "album": item['album']['name'],
                "preview_url": item['preview_url'],
                "image": item['album']['images'][0]['url'] if item['album']['images'] else '',
                'uri': item['uri'],
            })

        return render_template('results.html', artist_name=artist_name, songs=songs, access_token=access_token)

    return redirect('/')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data_url = request.json['image']
        encoded_data = data_url.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cv2.imwrite("captured.jpg", img)

        result = DeepFace.analyze(img_path="captured.jpg", actions=['emotion'])
        mood = result[0]['dominant_emotion']
        print(mood)
        return jsonify({'mood': mood})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/recommend', methods=['GET'])
def recommend_callback():
    code = request.args.get('code')
    # Optional: pass this code to your main script if needed
    return "Authorization complete. You can return to the app."

@app.route('/get_emotion', methods=['GET'])
def detect_emotion():
    try:
        emotion_word = emotion_testing()
        return jsonify({'emotion': emotion_word})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_recommendations(emotion_code):
    data = pd.read_csv('taylor_swift_spotify.csv')
    data.drop_duplicates(inplace=True, subset=['name'])
    
    df = pd.read_csv('Spotify Dataset Analysis/data.csv.zip', compression='zip')
    df.drop_duplicates(inplace=True, subset=['name'])

    data1 = pd.concat([data, df], ignore_index=True)

    from sklearn.cluster import KMeans
    from sklearn.preprocessing import MinMaxScaler

    col_features = ['danceability', 'energy', 'valence', 'loudness']
    X = MinMaxScaler().fit_transform(data1[col_features])
    kmeans = KMeans(init="k-means++", n_clusters=2, random_state=15).fit(X)
    data1['kmeans'] = kmeans.labels_

    data2 = data1[:data.shape[0]]
    df1 = data2.groupby('kmeans').apply(lambda x: x.sort_values(["popularity"], ascending=False))
    df1.reset_index(level=0, inplace=True, drop=True)

    def get_results(emotion_code):
        NUM_RECOMMEND = 10
        result_songs = df1[df1['kmeans'] == emotion_code][['name', 'artists']].head(NUM_RECOMMEND)

        enriched_results = []

        for _, row in result_songs.iterrows():
            song_name = row['name']
            artist = row['artists'] if 'artists' in row and isinstance(row['artists'], str) else ''
            query = f"{song_name} {artist}"

            try:
                results = sp.search(q=query, type='track', limit=1)
                if results['tracks']['items']:
                    track = results['tracks']['items'][0]
                    enriched_results.append({
                        'name': song_name,
                        'artist': track['artists'][0]['name'],
                        'url': track['external_urls']['spotify']
                    })
                else:
                    enriched_results.append({
                        'name': song_name,
                        'artist': artist,
                        'url': '#'
                    })
            except Exception as e:
                enriched_results.append({
                    'name': song_name,
                    'artist': artist,
                    'url': '#'
                })

        return enriched_results

    return get_results(emotion_code)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    emotion = data.get('emotion')
    if not emotion:
        return jsonify({'error': 'No emotion provided'}), 400

    if(emotion == 'sad'):
        recommendations = get_recommendations(0)
        return jsonify({'songs': recommendations})
    else:
        recommendations = get_recommendations(1)
        return jsonify({'songs': recommendations})

if __name__ == '__main__':
    app.run(debug=True)

