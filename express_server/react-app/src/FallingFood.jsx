import React, { useState, useEffect } from "react";

export default function FallingFood() {
  const gridX = 30; // Size of the x grid
  const gridY = 20; // Size of the y grid
  const initialPlayer = { x: 10, y: gridY - 1 }; // Initial player position at the bottom
  const [player, setPlayer] = useState(initialPlayer);
  const [foods, setFoods] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fallInterval, setFallInterval] = useState(500); // Initial falling interval

  // Function to generate initial food position
  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridX),
      y: 0, // Start from the top
      type: Math.random() < 0.5 ? "green" : "red", // Randomly choose type
    };
  }

  // Function to move food down
  function moveFoods() {
    setFoods((prevFoods) =>
      prevFoods.map((food) => ({
        ...food,
        y: food.y + 1,
      }))
    );
  }

  useEffect(() => {
    // Continuously spawn food
    const spawnFoodInterval = setInterval(() => {
      if (!gameOver) {
        setFoods((prevFoods) => [...prevFoods, generateFood()]);
      }
    }, 1000); // Adjust the speed of food spawning as needed

    // Move foods down
    const fallFoodInterval = setInterval(() => {
      if (!gameOver) {
        moveFoods();
      }
    }, fallInterval);

    // Cleanup functions to clear intervals on unmount or game over
    return () => {
      clearInterval(spawnFoodInterval);
      clearInterval(fallFoodInterval);
    };
  }, [gameOver, fallInterval]);

  // Function to update player position based on arrow key presses
  function handleKeyPress(event) {
    switch (event.key) {
      case "ArrowLeft":
        setPlayer((prevPlayer) =>
          prevPlayer.x > 0 ? { ...prevPlayer, x: prevPlayer.x - 1 } : prevPlayer
        );
        break;
      case "ArrowRight":
        setPlayer((prevPlayer) =>
          prevPlayer.x < gridX - 1 ? { ...prevPlayer, x: prevPlayer.x + 1 } : prevPlayer
        );
        break;
      default:
        break;
    }
  }

  // Check for collisions and update score
  useEffect(() => {
    foods.forEach((food, index) => {
      if (player.x === food.x && player.y === food.y) {
        if (food.type === "green") {
          setScore((prevScore) => prevScore + 1);
        } else {
          setScore((prevScore) => prevScore - 1); // Allow scores to go into negatives
          setFallInterval((prevInterval) => Math.max(prevInterval - 25, 100)); // Increase falling speed
        }
        setFoods((prevFoods) => prevFoods.filter((_, i) => i !== index)); // Remove picked up food
      }
    });

    // Check for game over condition
    if (score < -10) {
      setGameOver(true);
    }
  }, [player, foods, score]);

  // Function to render the grid
  function renderGrid() {
    const grid = [];
    for (let y = 0; y < gridY; y++) {
      const row = [];
      for (let x = 0; x < gridX; x++) {
        let cellType = "bg-gray-100";
        if (x === player.x && y === player.y) {
          cellType = "bg-black";
        } else {
          foods.forEach((food) => {
            if (x === food.x && y === food.y) {
              cellType = food.type === "green" ? "bg-green-500" : "bg-red-500";
            }
          });
        }
        row.push(<div key={`${x}-${y}`} className={`w-12 h-12 ${cellType}`} />);
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  }

  // Add event listener for arrow key presses
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="mx-auto w-3/5 h-full self-center rounded-s shadow-xl">
      <div className="shadow-xl">
        <p className="mb-4">This is the Falling Food Game. Use arrow keys to control the player.</p>
      </div>
      <div className="grid grid-cols-20 gap-0 mx-auto">{renderGrid()}</div>
      <div className="shadow-xl">
        <p className="mt-4">Score: {score}</p>
        <p className="mt-2">Speed: {fallInterval} ms</p>
      </div>
      {gameOver && <p className="mt-4">Game Over!</p>}
      <div className="shadow-xl">
        <nav className="mt-4">
          <a href="/" className="text-blue-500">Home</a>
        </nav>
      </div>
    </div>
  );
}
