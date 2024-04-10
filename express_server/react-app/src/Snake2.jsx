import React, { useState, useEffect } from "react";

export default function Snake2() {
    // Generate the grid cells
    const gridX = 30; // Size of the x grid
    const gridY = 20; // Size of the y grid

    function renderGrid() {
        const grid = [];
        for (let y = 0; y < gridY; y++) {
            const row = [];
            for (let x = 0; x < gridX; x++) {
                let cellType = "border-2 border-rose-600";
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

    return (
        <div>
            <div className="p-40">
                <div className="container px-3 mx-auto flex justify-center">
                    <div className="grid grid-cols-20 gap-0 mx-auto">{renderGrid()}</div>
                </div>
            </div>
        </div>
    );
}
