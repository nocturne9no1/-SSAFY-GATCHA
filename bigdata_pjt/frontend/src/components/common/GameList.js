import React from "react";
import GameCard from "./GameCard";
import "../../sass/components/_gameList.scss"

export default function GameList(data) {
    console.log(data)
    return (
        <div className="game-list">
            {data.data.map((game, index) => (
              <GameCard game={game} key={index}/>
            ))}
        </div>
    )

}