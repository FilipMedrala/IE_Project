import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';

const ITEMS = {
    0: 'Apple', 1: 'Banana', 2: 'Grapes', 3: 'Pineapple', 4: 'Asparagus', 5: 'Blackberry', 6: 'Blueberry',
    7: 'Mushroom', 8: 'Onion', 9: 'Peanut', 10: 'Pear', 11: 'Peas', 12: 'Potato', 13: 'Steak', 14: 'Strawberry'
};

export default function Sketch() {
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [points, setPoints] = useState(0);
    const [roundDuration, setRoundDuration] = useState(60); // in seconds
    const [roundNumber, setRoundNumber] = useState(1);
    const [assignedItem, setAssignedItem] = useState("");
    const [timeLeft, setTimeLeft] = useState(roundDuration);

    useEffect(() => {
        startNewRound();
    }, []); // Start the first round when the component mounts

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            startNewRound();
        }
    }, [timeLeft]);

    const startNewRound = () => {
        if (roundNumber > 1) {
            setRoundDuration(roundDuration - 5); // Reduce time by 5 seconds for each subsequent round
        }
        setRoundNumber(roundNumber + 1);
        assignRandomItem();
        setTimeLeft(roundDuration);
    };

    const assignRandomItem = () => {
        const randomIndex = Math.floor(Math.random() * Object.keys(ITEMS).length);
        const randomItem = ITEMS[randomIndex];
        setAssignedItem(randomItem);
    };

    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    const handleEraserWidthChange = (event) => {
        setEraserWidth(+event.target.value);
    };

    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    const handleUploadImage = () => {
        canvasRef.current
            .exportImage("png")
            .then((data) => {
                // Send image data to the server
                fetch('/uploadImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ imageData: data })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to upload image');
                        }
                        return response.json();
                    })
                    .then(responseData => {
                        console.log('Image uploaded successfully:', responseData);
                        // Call getPrediction after image upload
                        getPrediction();
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

    const getPrediction = async () => {
        try {
            // Make a POST request to the '/getPrediction' route
            const response = await axios.post('/getPrediction', {});

            // Handle prediction result
            const predictedItem = response.data.prediction;
            setPrediction(predictedItem);
            setError(null);

            // Check if prediction matches assigned item
            if (predictedItem === assignedItem) {
                setPoints(points + 10); // Grant 10 points for correct prediction
                startNewRound();
            } else {
                // Incorrect prediction
                setPoints(points - 1); // Penalize for incorrect prediction
            }
        } catch (error) {
            // Handle error
            console.error('Error:', error);
            setError('Error fetching prediction');
            setPrediction(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="w-70 p-4 bg-white shadow-md rounded-md mb-8">
                <h1 className="text-3xl font-bold mb-4">Round {roundNumber}</h1>
                <p className="text-lg mb-2">Draw: {assignedItem}</p>
            </div>
            <div className="w-70 mb-8 relative">
                <div className="border border-gray-400 rounded-lg">
                    <ReactSketchCanvas
                        ref={canvasRef}
                        width="800px"
                        height="500px"
                        strokeWidth={strokeWidth}
                        eraserWidth={eraserWidth}
                        strokeColor="#000000"
                    />
                </div>
                <div className="absolute top-0 left-full ml-4 flex flex-col">
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
                    <button
                        onClick={handleUploadImage}
                        className="btn btn-primary mr-2"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleClearCanvas}
                        className="btn btn-secondary"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="w-70 mb-8">
                <div className="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
                    <div className="bg-blue-600 text-sm font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${(timeLeft / roundDuration) * 100}%` }}>{Math.round((timeLeft / roundDuration) * 100)}%</div>
                </div>
            </div>
            <div className="w-70 flex justify-between items-center">
                <p className="text-lg font-semibold">Points: {points}</p>
                <div className="flex gap-2 items-center">
                    {prediction && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Prediction:</p>
                            <p className="text-xl">{prediction}</p>
                        </div>
                    )}
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
