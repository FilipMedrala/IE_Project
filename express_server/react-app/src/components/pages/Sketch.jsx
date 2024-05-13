import { ReactSketchCanvas } from "react-sketch-canvas"; // Importing the Sketch Canvas component
import { useRef, useState, useEffect } from "react"; // Importing necessary hooks from React
import axios from 'axios'; // Importing Axios for making HTTP requests

// Dictionary of items with their corresponding IDs
const ITEMS = {
    0: 'Apple', 1: 'Banana', 2: 'Grapes', 3: 'Pineapple', 4: 'Asparagus', 5: 'Blackberry', 6: 'Blueberry',
    7: 'Mushroom', 8: 'Onion', 9: 'Peanut', 10: 'Pear', 11: 'Peas', 12: 'Potato', 13: 'Steak', 14: 'Strawberry'
};

// React functional component for the sketching functionality
export default function Sketch() {
    // Ref for accessing the canvas component
    const canvasRef = useRef(null);

    // State variables for managing drawing mode, stroke width, eraser width, prediction, error, and drawing objective
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [drawingObjective, setDrawingObjective] = useState('');

    // useEffect hook to generate a random drawing objective when the component mounts
    useEffect(() => {
        generateDrawingObjective();
    }, []);

    // Function to generate a random drawing objective from ITEMS dictionary
    const generateDrawingObjective = () => {
        const randomItemId = Math.floor(Math.random() * Object.keys(ITEMS).length);
        setDrawingObjective(ITEMS[randomItemId]);
    };

    // Event handler for pen button click
    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    // Event handler for changing stroke width
    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };

    // Event handler for eraser button click
    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    // Event handler for changing eraser width
    const handleEraserWidthChange = (event) => {
        setEraserWidth(+event.target.value);
    };

    // Event handler for clearing the canvas
    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    // Event handler for uploading the image and getting prediction
    const handleUploadImage = () => {
        canvasRef.current
            .exportImage("png")
            .then((data) => {
                axios.post('/uploadImage', { imageData: data }) // Making a POST request to upload the image data
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to upload image');
                        }
                        return response.json();
                    })
                    .then(responseData => {
                        console.log('Image uploaded successfully:', responseData);
                        getPrediction(); // Call getPrediction after image upload
                    })
                    .catch((error) => {
                        console.error('Error uploading image:', error);
                        setError('Failed to upload image');
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // Function to get prediction from the server
    const getPrediction = async () => {
        try {
            const response = await axios.post('/getPrediction', {}); // Making a POST request to fetch prediction
            setPrediction(response.data.prediction); // Setting prediction result
            // Checking if prediction matches the drawing objective
            if (response.data.prediction.toLowerCase() === drawingObjective.toLowerCase()) {
                setError(null);
                alert('Congratulations! Your drawing matches the objective.');
            } else {
                setError(`Your drawing does not match the objective (${drawingObjective}). Try again!`);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching prediction');
            setPrediction(null);
        }
    };

    // Rendering JSX
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex items-center">
                <div className="mr-4 border border-gray-400 rounded-lg">
                    <ReactSketchCanvas
                        ref={canvasRef}
                        width="800px"
                        height="500px"
                        strokeWidth={strokeWidth}
                        eraserWidth={eraserWidth}
                        strokeColor="#000000"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center mb-4">
                        <button
                            type="button"
                            className={`btn btn-sm rounded-lg px-3 py-1 ${eraseMode ? 'btn-outline-primary' : 'bg-gradient-to-r from-cyan-300 to-blue-900 text-white'} ${eraseMode && 'text-primary'}`}
                            disabled={!eraseMode}
                            onClick={handlePenClick}
                        >
                            Pen
                        </button>
                        <input
                            disabled={eraseMode}
                            type="range"
                            className="form-range w-20"
                            min="1"
                            max="20"
                            step="1"
                            id="strokeWidth"
                            value={strokeWidth}
                            onChange={handleStrokeWidthChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center mb-4">
                        <button
                            type="button"
                            className={`btn btn-sm rounded-lg px-3 py-1 ${eraseMode ? 'bg-gradient-to-r from-cyan-300 to-blue-900 text-white' : 'btn-outline-primary text-primary'}`}
                            disabled={eraseMode}
                            onClick={handleEraserClick}
                        >
                            Eraser
                        </button>
                        <input
                            disabled={!eraseMode}
                            type="range"
                            className="form-range w-20"
                            min="1"
                            max="20"
                            step="1"
                            id="eraserWidth"
                            value={eraserWidth}
                            onChange={handleEraserWidthChange}
                        />
                    </div>
                    <button
                        onClick={handleUploadImage}
                        className="btn btn-primary mr-2"
                    >
                        Upload Image & Get Prediction
                    </button>
                    <button
                        onClick={handleClearCanvas}
                        className="btn btn-secondary"
                    >
                        Clear Canvas
                    </button>
                    <div className="mt-4">
                        <p className="text-lg font-semibold">Drawing Objective:</p>
                        <p className="text-xl">{drawingObjective}</p>
                    </div>
                    {error && (
                        <div className="mt-4">
                            <p className="text-lg text-red-500">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
