from keras.models import load_model  # Importing necessary libraries
from PIL import Image
import numpy as np
import sys
import os
import json

# File path of the input image
IMAGE = 'recognition_nn/sketch_images/out.png'
# Load the pre-trained model
MODEL = load_model('recognition_nn/models/cnn_model.keras')

# Dictionary of fruit classes with their corresponding IDs
ITEMS = {0: 'Apple', 1: 'Banana', 2: 'Grapes', 3: 'Pineapple', 4: 'Asparagus', 5: 'Blackberry', 6: 'Blueberry',
          7: 'Mushroom', 8: 'Onion', 9: 'Peanut', 10: 'Pear', 11: 'Peas', 12: 'Potato', 13: 'Steak', 14: 'Strawberry'}

# Function to normalize the input data
def normalize(data):
    "Takes a list or a list of lists and returns its normalized form"
    return np.interp(data, [0, 255], [-1, 1])

# Function to load and preprocess the input image
def load_and_preprocess_image():
    # Load the input image
    x = Image.open(IMAGE)
    # Convert the image to grayscale
    x = x.convert('L')
    # Resize the image to (28, 28)
    x = x.resize((28, 28))
    # Convert the image to a NumPy array
    x = np.array(x)
    # Add a channel dimension
    x = np.expand_dims(x, axis=-1)
    # Invert the colors of the image
    x = np.invert(x)
    # Brighten the image by 60%
    for i in range(len(x)):
        for j in range(len(x)):
            if x[i][j] > 50:
                x[i][j] = min(255, x[i][j] + x[i][j] * 0.60)
    # x = normalize(x)
    # Save the processed image
    processed_image = Image.fromarray(x.reshape(28, 28).astype(np.uint8))
    processed_image.save('processed_image.png')
    return x

# Function to get the prediction from the model
def get_prediction():
    # Load and preprocess the input image
    x = load_and_preprocess_image()
    # Make prediction using the loaded model
    prediction = MODEL.predict(np.array([x]), verbose=0)
    # Get the index of the predicted fruit class
    predicted_fruit_index = np.argmax(prediction)
    # Get the name of the predicted fruit
    predicted_fruit_name = ITEMS[predicted_fruit_index]
    return predicted_fruit_name

# Main function to run the script
if __name__ == "__main__":
    # Get the prediction result
    prediction_result = get_prediction()
    # Print the predicted fruit name
    print(prediction_result)
