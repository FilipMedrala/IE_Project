import React, { useState, useEffect } from "react";
import sun from './assets/1.jpg'
import mid from './assets/2.jpg'
import { Button } from 'antd';
import { Link } from "react-router-dom";
export default function FallingFood() {

  return (
    <div>
      <div className="home">
        <div className="title">
        I AM a TITLE
        </div>
        <div className="conts">
          i am the decription of Journey
          Please help me think of some interesting phrases to attract users. 
          Abby's literary talent is limited, 
          and she doesn't know what to write.
          and botton link to journ page
        </div>
        <div className="but">
          <Link to="/Journey">
            <Button size="large" type="primary" shape="round">START</Button>
          </Link>

        </div>
        <img className="img" src={sun} alt="" />
      </div>
      <div className="mid">
        <div className="left">
          <img className="img1" src="../src/assets/sun.png" alt="" />
        </div>
        <div className="right">
          <div className="title">
            i am a title
          </div>
          <div className="conts">
          i am the decription of information for parents
          Please help me think of some interesting phrases to attract users. 
          Abby's literary talent is limited, 
          and she doesn't know what to write.
          and the button link to info page
            <div className="but">
              <Link to="/info">
                <Button size="large" type="primary" shape="round">LEARN MORE</Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <img className="img" src={mid} alt="" />
      <div className="bot">
        <div className="title">
          i am a title
        </div>
        <div className="conts">
        i am the decription of Games
          Please help me think of some interesting phrases to attract users. 
          Abby's literary talent is limited, 
          and she doesn't know what to write.
          and the button link to game page
        </div>
        <div className="but">

          <Link to="/Game">
            <Button size="large" type="primary" shape="round">PLAY</Button>
          </Link>

        </div>

      </div>
    </div>
  );
}
