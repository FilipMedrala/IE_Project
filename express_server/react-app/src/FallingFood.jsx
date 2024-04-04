import React, { useState, useEffect } from "react";

export default function FallingFood() {
  const gridSize = 20; // Size of the grid
  const initialPlayer = { x: 5, y: gridSize - 1 }; // Initial player position at the bottom
  const [player, setPlayer] = useState(initialPlayer);
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(150);

  function generateFood() {
    const x = Math.floor(Math.random() * gridSize);
    const y = 0; // Start at the top
    return { x, y };
  }

  function isColliding(cell1, cell2) {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  }

  function handleKeyDown(event) {
    if (gameOver) return;

    let newPlayer = { ...player };

    switch (event.key) {
      case "ArrowLeft":
        newPlayer.x = newPlayer.x - 1;
        break;
      case "ArrowRight":
        newPlayer.x = newPlayer.x + 1;
        break;
      default:
        break;
    }

    setPlayer(newPlayer);
  }

  function moveFood() {
    if (gameOver) return;

    let newFood = { ...food };
    newFood.y++; // Move the food downwards

    if (newFood.y >= gridSize) {
      newFood = generateFood(); // Regenerate food if it reaches the bottom
    }

    setFood(newFood);
  }

  function checkCollision() {
    if (isColliding(player, food)) {
      setFood(generateFood());
      setScore(score + 1);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(moveFood, speed);
    return () => clearInterval(intervalId);
  }, [food, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    checkCollision();
  }, [player, food]);

  function renderGrid() {
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        let cellType = "bg-gray-100";
        if (x === player.x && y === player.y) {
          cellType = "bg-black";
        } else if (x === food.x && y === food.y) {
          cellType = "bg-green-500";
        }
        row.push(<div key={`${x}-${y}`} className={`w-4 h-4 ${cellType}`} />);
      }
      grid.push(
        <div key={y} className="flex">
          {row}
        </div>
      );
    }
    return grid;
  }

  return (
    <div className="text-center mt-8">
      <p className="mb-4">This is the FallingFood game. Use left and right arrow keys to control the player.</p>
      <div className="grid grid-cols-20 gap-0 mx-auto">{renderGrid()}</div>
      <p className="mt-4">Score: {score}</p>
      {gameOver && <p className="mt-4">Game Over!</p>}
      <nav className="mt-4">
        <a href="/" className="text-blue-500">Home</a>
      </nav>
    </div>
  );
}
