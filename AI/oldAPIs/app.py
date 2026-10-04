from flask import Flask, request, jsonify, render_template
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.models import load_model
import numpy as np
from sklearn.preprocessing import LabelEncoder
from PIL import Image
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

image_model_path = './image.h5'
image_model = load_model(image_model_path)
img_width, img_height = 150, 150

# symptoms_model_path = './SymptomsModel.h5'
# symptoms_model = tf.keras.models.load_model(symptoms_model_path)
# Load the symptoms diagnosis model with custom loss function
symptoms_model_path = './SymptomsModelfinalized.h5'
symptoms_model = tf.keras.models.load_model(symptoms_model_path, compile=False)  # Load model without compiling

# symptoms_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

classes = [
    'Ear Hematomas', 'Ear Infections', 'Retinal Hemorrhage', 'Blepharitis', 'Cataracts',
    'Conjunctivitis', 'Horner’s Syndrome', 'Ectropion', 'Eyeworms', 'Glaucoma',
    'Epiphora', 'Dental abscesses', 'Anal sac abscess', 'Atopic Dermatitis',
    'Bacterial Infection', 'Nail Disorders', 'Lockjaw', 'Halitosis', 'Ptyalism',
    'Oral Ulceration', 'Epulis', 'Otitis Media', 'Otitis Interna',
    'Iris Bombe - Complete Posterior Synechiae', 'Uveitis', 'Inflammation of the Eye',
    'Dry Eye Syndrome', 'Abscess', 'Claw and Nail Disorders', 'Chiggers',
    'Tooth Abscess', 'Cleft Palate', 'Gingivitis', 'Laryngeal Paralysis',
    'Chronic Ulcerative Paradental Stomatitis', 'Stomatitis', 'Tooth Resorption',
    'Entropion', 'Bacterial Infection (Actinomycosis)'
]

# Load the label encoder with classes
label_encoder = LabelEncoder()
label_encoder.fit(classes)

# @app.route('/')
# def index():
#     return render_template('upload_image.html')

@app.route('/predict_image', methods=['POST'])
def predict_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    
    image_file = request.files['image']
    
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        img = Image.open(image_file)
        img = img.resize((img_width, img_height))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        prediction = image_model.predict(img_array)
        predicted_class = np.argmax(prediction)
        
        disease_mapping = {0: 'Canine Impetigo', 1: 'Canine Lupus', 2: 'Feline Ringworm', 3: 'Mange'}
        predicted_disease = disease_mapping[predicted_class]

        return jsonify({'prediction': predicted_disease}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
def preprocess_data(data):
    try:
        # Create a DataFrame from input data
        df = pd.DataFrame([data])  # Wrap data in a list to create a DataFrame with one row
        
        # Check if the DataFrame is empty
        if df.empty:
            return {'error': 'Empty input data', 'status_code': 400}
        
        # List of all possible columns in the dataset
        all_columns = [
            'Abdominal Pain', 'Abnormal Elevation of Inner Eyelid',
            'Abnormal Coloration of One or More Teeth', 'Abnormal Posture',
            'Abnormal Nail Color', 'Bad Odor', 'Bad Breath', 'Bleeding',
            'Bleeding Gums', 'Blood in Urine/Feses', 'Bruises', 'Crusty Skin',
            'Constipation', 'Coughing', 'Crust in The Ear', 'Depression',
            'Diarrhea', 'Dehydration', 'Difficult Urination',
            'Difficulty Swallowing', 'Dilated Pupil', 'Discolored Urine', 'Dry Eye',
            'Drainage', 'Drooling', 'Dropping Food', 'Ear Infection', 'Ear Redness',
            'Ear Odor', 'Enlarged Bladder', 'Excessive Ear Wax', 'Ear Discharge',
            'Ear Swelling', 'Ear Mite Infection', 'Ear Inflammation',
            'Excessive Blinking', 'Eye Redness', 'Eye Swelling', 'Eye Inflammation',
            'Eye Discharge', 'Eye Excessive Watering', 'Facial Swelling', 'Fever',
            'Fractured Tooth', 'Frequent Thirst', 'Foul-smelling Urine',
            'Greasy Skin', 'Grinding teeth', 'Hair Loss', 'Head Tilt',
            'Hunched Posture', 'Impaired Vision',
            'Infections on the face or neck area',
            'Increased Frequency of Urination', 'Itching Ear', 'Itching Eye',
            'Lameness', 'Licking Excessively', 'Licking at The Paws', 'Lethargy',
            'Lesions Eye', 'Lesions Skin', 'Loose Teeth', 'Loss of Balance',
            'Loss of Appetite', 'Lower Back Pain', 'Mucous Eye', 'Nasal Discharge',
            'Noisy Breathing', 'Obesity', 'Pain', 'Panting', 'Protrusion',
            'Runny Nose', 'Scratching', 'Smaller Size Pupil', 'Skin Infection',
            'Skin Redness', 'Skin Odor', 'Skin Loose Around Eye', 'Sagging',
            'Swollen Gums', 'Swelling', 'Squinting', 'Seizures',
            'Unwillingness to Move', 'Vomiting', 'Vision Loss/Blindness',
            'Weight Loss', 'Whitish-appearing Pupil', 'Yeasty Smell', 'Animal Type'  
        ]
        
        # Perform any required data preprocessing
        # For example, one-hot encoding
        df_encoded = pd.get_dummies(df)
        
        # Reorder columns to match the model input and fill missing columns with zeros
        df_encoded = df_encoded.reindex(columns=all_columns, fill_value=0)
        
        # Convert DataFrame to numpy array
        preprocessed_data = np.array(df_encoded)

        return preprocessed_data

    except Exception as e:
        return {'error': str(e), 'status_code': 400}

# In the diagnose route
@app.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    preprocessed_data = preprocess_data(data)
    if isinstance(preprocessed_data, dict) and 'error' in preprocessed_data:
        return jsonify(preprocessed_data), preprocessed_data['status_code']  # Pass the status code from the error response
    
    # Make predictions

# Assuming your preprocessed data is in a variable called 'X'
    X_reshaped = preprocessed_data.reshape((1, preprocessed_data.shape[1]))  # Reshape to (1, number_of_features)

# Pass the reshaped data to the model
    prediction = symptoms_model.predict(X_reshaped)
    prediction = symptoms_model.predict(preprocessed_data)
    # Decode the predicted label
    predicted_label = label_encoder.inverse_transform([np.argmax(prediction)])
    return jsonify({'diagnosis': predicted_label[0]})


if __name__ == '__main__':
    app.run(host='10.73.16.155', port=3000, debug=True)
