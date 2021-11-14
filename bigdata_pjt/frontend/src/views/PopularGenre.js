import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../hooks/cookie";
import axios from "axios";
import GameList from "../components/common/GameList";
import "../sass/pages/_popularGenre.scss"

export default function PopularGenre() {
    
    const {category}= useParams()
    // console.log(useParams())

    const [ dataPopularGenre, setDataPopularGenre ] = useState([])
    useEffect(() => {
      axios({
        method: 'GET',
        url: `/game/category/${category}/`,
        headers: {
          authorization: `jwt ${getCookie("myToken")}`
        }
      })
        .then(res => setDataPopularGenre(res.data))
    }, [category]);
    // console.log(dataPopularGenre)
  
    return(
      <div className="popular-genre">
        <div className="popular-genre-header">
          {category}
        </div>
        <div className="popular-genre-list">
            <GameList data={dataPopularGenre} />
        </div>
      </div>
    )
  }
