import React, { useState, useEffect } from "react";
import FallingFood from './FallingFood.css'
import Snake from './Snake'


export default function Game() {

  return (
    <div>
     <div className="header">Game</div>
      <div><Snake/></div>
    
    </div>
  );
}
