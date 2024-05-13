# Importing necessary libraries
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv2D, MaxPooling2D, Flatten, Input, GlobalAveragePooling2D
from keras.utils import to_categorical
import numpy as np
from PIL import Image
import os

# Setting environment variable to disable OneDNN optimizations
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Constants and variables initialization
N = 30000  # Total number of samples
N_EPOCHS = 5  # Number of training epochs
files = ['apple.npy', 'banana.npy', 'grapes.npy', 'pineapple.npy', 'asparagus.npy', 'blackberry.npy',
         'blueberry.npy', 'mushroom.npy', 'onion.npy', 'peanut.npy', 'pear.npy', 'peas.npy',
         'potato.npy', 'steak.npy', 'strawberry.npy']  # List of data files

N_ITEMS = 15  # Number of different items
ITEMS = {}  # Dictionary to store item names
for i, file_name in enumerate(files[0:], start=0):
    ITEMS[i] = file_name.split('.')[0].replace(' ', '_').capitalize()  # Extracting item names

print(ITEMS)  # Printing the dictionary of items


def load(dir, files, reshaped):
    "Load .npy or .npz files from disk and return them as numpy arrays. \
    Takes in a list of filenames and returns a list of numpy arrays."
    data = []
    for file in files:
        f = np.load(dir + file)  # Loading data from files
        if reshaped:
            new_f = []
            for i in range(len(f)):
                x = np.reshape(f[i], (28, 28))  # Reshaping data to 28x28
                x = np.expand_dims(x, axis=0)  # Adding a new axis
                x = np.reshape(f[i], (28, 28, 1))  # Reshaping data to 28x28x1
                new_f.append(x)
            f = new_f
        data.append(f)
    return data


def normalize(data):
    "Takes a list or a list of lists and returns its normalized form"
    return np.interp(data, [0, 255], [-1, 1])  # Normalizing data


def denormalize(data):
    "Takes a list or a list of lists and returns its denormalized form"
    return np.interp(data, [-1, 1], [0, 255])  # Denormalizing data


def visualize(array):
    "Visualize a 2D array as an Image"
    img = Image.fromarray(array)  # Creating an image from array
    img.show(title="Visualizing array")  # Displaying the image


def set_limit(arrays, n):
    "Limit elements from each array up to n elements and return a single list"
    new = []
    for array in arrays:
        i = 0
        for item in array:
            if i == n:
                break
            new.append(item)
            i += 1
    return new  # Returning limited elements


def make_labels(N1, N2):
    "Make labels from 0 to N1, each repeated N2 times"
    labels = []
    for i in range(N1):
        labels += [i] * N2  # Generating labels
    return labels  # Returning labels


# Load items from the dataset directory
items = load("dataset/", files, True)
items = set_limit(items, N)  # Limiting the number of items
items = list(map(normalize, items))  # Normalizing the data
labels = make_labels(N_ITEMS, N)  # Generating labels

# Splitting data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(items, labels, test_size=0.05)
Y_train = to_categorical(y_train, N_ITEMS)  # One-hot encoding for training labels
Y_test = to_categorical(y_test, N_ITEMS)  # One-hot encoding for testing labels

# CNN Model Definition and Compilation
cnn_model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(N_ITEMS, activation='softmax')
])
cnn_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# ResNet Model Definition and Compilation
# ResNet model definition requires additional functions and libraries which are not imported in this script

# MLP Model Definition and Compilation
mlp_model = Sequential([
    Flatten(input_shape=(28, 28, 1)),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(N_ITEMS, activation='softmax')
])
mlp_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Training all models
cnn_history = cnn_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))
# resnet_history = resnet_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))
mlp_history = mlp_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))

import matplotlib.pyplot as plt

# Plotting training history for all models on joint graphs
plt.figure(figsize=(10, 5))

# Plot training loss for all models
plt.subplot(1, 2, 1)
plt.plot(cnn_history.history['loss'], label='CNN Training Loss')
# plt.plot(resnet_history.history['loss'], label='ResNet Training Loss')
plt.plot(mlp_history.history['loss'], label='MLP Training Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Loss')
plt.legend()

# Plot validation loss for all models
plt.subplot(1, 2, 2)
plt.plot(cnn_history.history['val_loss'], label='CNN Validation Loss')
# plt.plot(resnet_history.history['val_loss'], label='ResNet Validation Loss')
plt.plot(mlp_history.history['val_loss'], label='MLP Validation Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Validation Loss')
plt.legend()

plt.tight_layout()
plt.show()

# Plotting accuracy for all models on joint graph
plt.figure(figsize=(10, 5))
plt.plot(cnn_history.history['val_accuracy'], label='CNN Validation Accuracy', linestyle='--', marker='o')
# plt.plot(resnet_history.history['val_accuracy'], label='ResNet Validation Accuracy', linestyle='--', marker='o')
plt.plot(mlp_history.history['val_accuracy'], label='MLP Validation Accuracy', linestyle='--', marker='o')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.title('Validation Accuracy Comparison')
plt.legend()
plt.grid(True)
plt.show()

# Saving models
cnn_model.save('cnn_model.keras')
# resnet_model.save('resnet_model.keras')
mlp_model.save('mlp_model.keras')
