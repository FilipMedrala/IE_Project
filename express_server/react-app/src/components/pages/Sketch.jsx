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

    const handleDownloadImage = () => {
        canvasRef.current
            .exportImage("png")
            .then((data) => {
                const link = document.createElement('a');
                link.href = data;
                link.download = 'canvas_image.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((e) => {
                console.log(e);
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
                        onClick={handleDownloadImage}
                        className="btn btn-primary"
                    >
                        Download Image
                    </button>
                </div>
            </div>
        </div>
    );
}
