import sys
import numpy as np
import os
from PIL import Image
from keras.models import load_model

def load_and_preprocess_image(file_path):
    # Load image
    print("Test path")
    print(file_path)
    x = Image.open(file_path)
    # Convert image to grayscale
    x = x.convert('L')
    # Resize image to (28, 28)
    x = x.resize((28, 28))
    # Convert image to NumPy array
    x = np.array(x)
    # Add channel dimension
    x = np.expand_dims(x, axis=-1)
    # invert the colors
    x = np.invert(x)
    # brighten the image by 60%
    for i in range(len(x)):
        for j in range(len(x)):
            if x[i][j] > 50:
                x[i][j] = min(255, x[i][j] + x[i][j] * 0.60)
    x = normalize(x)
    return x


# Function to make predictions using the loaded model
def make_prediction(image_array):
    # Load the model
    model = load_model('models/doodle_model.keras')

    # Make prediction
    prediction = model.predict(np.array([image_array]))

    return prediction

def main():
    # Receive the image file path from command line arguments
    image_file_path = sys.argv[1]

    # Load and preprocess the image
    image_array = load_and_preprocess_image(image_file_path)

    # Make prediction
    prediction = make_prediction(image_array)

    # Convert prediction to a human-readable format
    result = prediction.tolist()

    # Print the result (you can modify this to return the result in any desired format)
    print(result)

if __name__ == "__main__":
    main()
