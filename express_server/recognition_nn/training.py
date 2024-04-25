from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv2D, MaxPooling2D, Flatten, Input, GlobalAveragePooling2D
from keras.utils import to_categorical
from random import randint
import numpy as np
from PIL import Image
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


N = 5000
N_EPOCHS = 10

files = ['apple.npy', 'banana.npy', 'grapes.npy', 'pineapple.npy', 'asparagus.npy', 'blackberry.npy',
         'blueberry.npy', 'mushroom.npy', 'onion.npy', 'peanut.npy', 'pear.npy', 'peas.npy',
         'potato.npy', 'steak.npy', 'strawberry.npy']


N_ITEMS = 15
ITEMS = {}
for i, file_name in enumerate(files[0:], start=0):
    ITEMS[i] = file_name.split('.')[0].replace(' ', '_').capitalize()

print(ITEMS)


def load(dir, files, reshaped):
    "Load .npy or .npz files from disk and return them as numpy arrays. \
    Takes in a list of filenames and returns a list of numpy arrays."

    data = []
    for file in files:
        f = np.load(dir + file)
        if reshaped:
            new_f = []
            for i in range(len(f)):
                x = np.reshape(f[i], (28, 28))
                x = np.expand_dims(x, axis=0)
                x = np.reshape(f[i], (28, 28, 1))
                new_f.append(x)
            f = new_f
        data.append(f)
    return data


def normalize(data):
    "Takes a list or a list of lists and returns its normalized form"

    return np.interp(data, [0, 255], [-1, 1])


def denormalize(data):
    "Takes a list or a list of lists and returns its denormalized form"

    return np.interp(data, [-1, 1], [0, 255])


def visualize(array):
    "Visulaze a 2D array as an Image"

    img = Image.fromarray(array)
    img.show(title="Visulizing array")


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
    return new


def make_labels(N1, N2):
    "make labels from 0 to N1, each repeated N2 times"
    labels = []
    for i in range(N1):
        labels += [i] * N2
    return labels



# items = load(os.path.abspath(os.path.join(os.getcwd(), "../../../dataset/")), files, True)
dataset_dir = os.path.abspath(os.path.join(os.getcwd(), "../../../dataset"))

# Load items from the dataset directory
items = load(dataset_dir + "/", files, True)

items = set_limit(items, N)

items = list(map(normalize, items))

labels = make_labels(N_ITEMS, N)

x_train, x_test, y_train, y_test = train_test_split(items, labels, test_size = 0.05)

Y_train = to_categorical(y_train, N_ITEMS)
Y_test = to_categorical(y_test, N_ITEMS)


#CNN

model = Sequential()
model.add(Input(shape=(28, 28, 1)))
model.add(Conv2D(32, (3, 3), activation='relu'))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(N_ITEMS, activation='softmax'))

model.compile(loss='categorical_crossentropy',
             optimizer='adam',
             metrics=['accuracy'])

model.fit(np.array(x_train), np.array(Y_train), batch_size=32, epochs = 5)

print('Training completed.')

print('Evaluating model')

preds = model.predict(np.array(x_test))

score = 0
for i in range(len(preds)):
    if np.argmax(preds[i]) == y_test[i]:
        score += 1

print(f"Accuracy: {(score + 0.0) /len(preds) * 100}")
model.save('models/doodle_conv.keras')
print("Model saved.")

#Without augmentation CNN acc: 79.03%


