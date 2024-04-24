import sys
import numpy as np
import os
from PIL import Image
from keras.models import load_model

def load_and_preprocess_image(file_path):
    # Load image
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
    x = np.array(x /255.0)
    return x


# Function to make predictions using the loaded model
def make_prediction(image_array):
    # Load the model
    model = load_model('models/doodle_model.keras')

    # Make prediction
    prediction = model.predict(image_array)

    return prediction.tolist()

def main():
    # Receive the image file path from command line arguments
    image_file_path = sys.argv[1]

    # Load and preprocess the image
    image_array = load_and_preprocess_image(image_file_path)

    # Make prediction
    prediction = make_prediction(image_array)

    # Print the prediction result as JSON
    print(json.dumps(prediction))

if __name__ == "__main__":
    main()
