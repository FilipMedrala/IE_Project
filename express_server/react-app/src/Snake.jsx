import React, { useState, useEffect } from "react";
import "./Snake.css";

export default function Snake() {
  const gridSize = 20; // Size of the grid
  const initialSnake = [{ x: 0, y: 0 }]; // Initial snake position
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(150);

  function generateFood() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
  }

  function isColliding(cell1, cell2) {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (direction !== "right") setDirection("left");
        break;
      case "ArrowRight":
        if (direction !== "left") setDirection("right");
        break;
      case "ArrowUp":
        if (direction !== "down") setDirection("up");
        break;
      case "ArrowDown":
        if (direction !== "up") setDirection("down");
        break;
      default:
        break;
    }
  }

  function moveSnake() {
    if (gameOver) return;

    const newSnake = [...snake];
    let newHead = { ...newSnake[0] };

    switch (direction) {
      case "right":
        newHead.x++;
        break;
      case "left":
        newHead.x--;
        break;
      case "up":
        newHead.y--;
        break;
      case "down":
        newHead.y++;
        break;
      default:
        break;
    }

    if (
      newHead.x < 0 ||
      newHead.x >= gridSize ||
      newHead.y < 0 ||
      newHead.y >= gridSize
    ) {
      setGameOver(true);
      return;
    }

    for (let i = 1; i < newSnake.length; i++) {
      if (isColliding(newHead, newSnake[i])) {
        setGameOver(true);
        return;
      }
    }

    if (isColliding(newHead, food)) {
      setFood(generateFood());
      setScore(score + 1);
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
    } else {
      newSnake.pop();
    }

    newSnake.unshift(newHead);
    setSnake(newSnake);
  }

  useEffect(() => {
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [snake, direction, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function renderGrid() {
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        let cellType = "cell bg-gray-100";
        if (isColliding({ x, y }, snake[0])) {
          cellType = "cell bg-black";
        } else if (snake.some((cell) => isColliding(cell, { x, y }))) {
          cellType = "cell bg-gray-400";
        } else if (isColliding({ x, y }, food)) {
          cellType = "cell bg-green-500";
        }
        row.push(<div key={`${x}-${y}`} className={cellType} />);
      }
      grid.push(
        <div key={y} className="row">
          {row}
        </div>
      );
    }
    return grid;
  }

  return (
    <div className="container">
      <p className="description">This is the snake game. Use arrow keys to control the snake.</p>
      <div className="grid">{renderGrid()}</div>
      <p className="score">Score: {score}</p>
      {gameOver && <p className="game-over">Game Over!</p>}
      <nav className="nav">
        <a href="/" className="link">Home</a>
      </nav>
    </div>
  );
}
