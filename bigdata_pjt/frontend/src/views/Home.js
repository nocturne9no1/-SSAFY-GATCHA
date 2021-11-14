import { React, useState } from "react";
import BGM from "../audio/Powerup.mp3"
import GameTest from "./GameTest";
import "../sass/pages/_home.scss";

export default function Home() {
  return(
    <div className="home">
      {/* <audio autoPlay>
        <source src={BGM}/>
      </audio> */}
      <div className="game">
        <GameTest />
      </div>
      <div className="game-control-explain">
        <span>Move</span>
        <br />
        <div className="png">
          <img src="/images/keyborad.png" alt="keyboard" />
        </div>
        <hr />
        <span>Interaction</span>
        <br />
        <div className="png">
          <img className="key" src="/images/ykey.png" alt="keyboard" />
        </div>
      </div>
    </div>
  )
}