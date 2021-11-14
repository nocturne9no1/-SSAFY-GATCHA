import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../hooks/cookie";
import axios from "axios";
import GameList from "../components/common/GameList";
import "../sass/pages/_search.scss"

export default function Search() {

  const gameName= useParams().game_name;
  console.log(gameName)
  // console.log(useParams().game_name)
  const [ dataSearch, setDataSearch ] = useState([])

  useEffect(() => {
    console.log('들어옴')
    axios({
      method: 'GET',
      url: `/game/search/${gameName}/`,
      headers: {
        authorization: `jwt ${getCookie("myToken")}`
      }
    })
      .then(res => setDataSearch(res.data))
      .catch(err => console.log(err))
  }, [gameName]);
  console.log(dataSearch)

  return(
    <div className="search">
      <div className="search-header">
        Result for "{gameName}"
      </div>
      <div className="search-list">
        <GameList data={dataSearch} />
      </div>
    </div>
  )

}