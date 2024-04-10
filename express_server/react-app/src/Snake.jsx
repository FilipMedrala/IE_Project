import React, { useState, useEffect } from "react";

import apple from "./snake_assets/apple.png";
import body_bottomleft from "./snake_assets/body_bottomleft.png";
import body_bottomright from "./snake_assets/body_bottomright.png";
import body_horizontal from "./snake_assets/body_horizontal.png";
import body_topleft from "./snake_assets/body_topleft.png";
import body_topright from "./snake_assets/body_topright.png";
import body_vertical from "./snake_assets/body_vertical.png";
import head_down from "./snake_assets/head_down.png";
import head_left from "./snake_assets/head_left.png";
import head_right from "./snake_assets/head_right.png";
import head_up from "./snake_assets/head_up.png";
import tail_down from "./snake_assets/tail_down.png";
import tail_left from "./snake_assets/tail_left.png";
import tail_right from "./snake_assets/tail_right.png";
import tail_up from "./snake_assets/tail_up.png";

export default function Snake() {
  const gridX = 30; // Size of the x grid
  const gridY = 20; // Size of the y grid
  const initialSnake = [{ x: 0, y: 0 }]; // Initial snake position
  const [snake, setSnake] = useState(initialSnake);
  const [healthyFood, setHealthyFood] = useState(generateFood());
  const [junkFood, setJunkFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(150);

  function generateFood() {
    const x = Math.floor(Math.random() * gridX);
    const y = Math.floor(Math.random() * gridY);
    return { x, y };
  }

  function isColliding(cell1, cell2) {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "a":
        if (direction !== "right") setDirection("left");
        break;
      case "d":
        if (direction !== "left") setDirection("right");
        break;
      case "w":
        if (direction !== "down") setDirection("up");
        break;
      case "s":
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
      newHead.x >= gridX ||
      newHead.y < 0 ||
      newHead.y >= gridY
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

    if (isColliding(newHead, healthyFood)) {
      setHealthyFood(generateFood());
      setScore(score + 1);
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
    } else if (isColliding(newHead, junkFood)) {
      newSnake.pop(); // Remove last segment of the snake
      setJunkFood(generateFood());
      setScore(score - 1); // Decrease score when eating junk food
      newSnake.pop();
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

  function getNextCell(cell) {
    // Return the next cell based on the direction
    switch (direction) {
      case "right":
        return { x: cell.x + 1, y: cell.y };
      case "left":
        return { x: cell.x - 1, y: cell.y };
      case "up":
        return { x: cell.x, y: cell.y - 1 };
      case "down":
        return { x: cell.x, y: cell.y + 1 };
      default:
        return { x: cell.x + 1, y: cell.y };
    }
  }
  
  function getHeadImageSource(nextCell) {
    // Determine the appropriate head image based on the next cell position
    const dx = nextCell.x - snake[0].x;
    const dy = nextCell.y - snake[0].y;
    if (dx === 1) {
      return head_right;
    } else if (dx === -1) {
      return head_left;
    } else if (dy === -1) {
      return head_up;
    } else {
      return head_down;
    }
  }
  
  function getBodyImageSource(currentCell, nextCell) {
    // Determine the appropriate body segment image based on current and next cell positions
    const dx = nextCell.x - currentCell.x;
    const dy = nextCell.y - currentCell.y;
    if (dx === 1 && dy === 0) {
      return body_horizontal;
    } else if (dx === -1 && dy === 0) {
      return body_horizontal;
    } else if (dx === 0 && dy === -1) {
      return body_vertical;
    } else if (dx === 0 && dy === 1) {
      return body_vertical;
    } else if (dx === 1 && dy === 1) {
      return body_bottomleft;
    } else if (dx === -1 && dy === 1) {
      return body_bottomright;
    } else if (dx === 1 && dy === -1) {
      return body_topleft;
    } else if (dx === -1 && dy === -1) {
      return body_topright;
    }
  }
  

  function renderGrid() {
    const grid = [];
    for (let y = 0; y < gridY; y++) {
      const row = [];
      for (let x = 0; x < gridX; x++) {
        let cellType = "";
        let imageSource = "";
        let backgroundColor = "";
  
        // Check for snake, apple, and junk food collisions
        if (isColliding({ x, y }, snake[0])) {
          // Snake head
          const nextCell = getNextCell(snake[0]);
          imageSource = getHeadImageSource(nextCell);
        } else if (snake.some((cell) => isColliding(cell, { x, y }))) {
          // Snake body
          const snakeCell = snake.find((cell) => isColliding(cell, { x, y }));
          const nextCell = getNextCell(snakeCell);
          imageSource = getBodyImageSource(snakeCell, nextCell);
        } else if (isColliding({ x, y }, healthyFood)) {
          // Apple
          imageSource = apple;
        } else if (isColliding({ x, y }, junkFood)) {
          // Handle junk food image if needed
        } else {
          // Checkered green background for empty cells
          if ((x + y) % 2 === 0) {
            backgroundColor = "#8BC34A"; // Lighter green
          } else {
            backgroundColor = "#689F38"; // Darker green
          }
        }
  
        row.push(
          <div
            key={`${x}-${y}`}
            className="w-12 h-12"
            style={{
              backgroundImage: `url(${imageSource})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: backgroundColor,
            }}
          />
        );
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
    <div className="my-40">
      <div className="container px-3 mx-auto flex justify-center">
        <div className="grid grid-cols-20 gap-0 mx-auto">{renderGrid()}</div>
      </div>
    </div>
  );
}
