import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState } from "react";

export default function Sketch() {
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);

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
                        // Get prediction after image upload
                        getPrediction();
                    })
                    .catch((error) => {
                        console.error('Error uploading image:', error);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getPrediction = () => {
        // Make a POST request to the '/getPrediction' route
        fetch('/getPrediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // No need to send image data if it's already saved
        })
            .then(response => response.json())
            .then(data => {
                // Handle prediction result
                console.log('Prediction result:', data.prediction);
                // Do something with the prediction result, e.g., display it on the UI
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };


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
                        className="btn btn-primary"
                    >
                        Upload Image & Get Prediction
                    </button>
                </div>
            </div>
        </div>
    );
}
