import { React, useState, useEffect } from "react";
import axios from "axios";
import "../../sass/components/_gameDetail.scss";
import { useParams } from "react-router-dom";
import { getCookie } from "../../hooks/cookie";
import YouTube from "react-youtube";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);

  const File = new Image();
  File.src = `/${id}.png`;
  console.log(`여기${File.complete}`);

  const API_KEY = "";
  const URL = "https://www.googleapis.com/youtube/v3/search";

  useEffect(() => {
    axios({
      method: "GET",
      url: `/game/detail/${id}/`,
      headers: {
        authorization: `jwt ${getCookie("myToken")}`,
      },
    })
      .then((res) =>
        setGame(res.data[0], setTagList(res.data[0].tags.slice(0, 5)))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: URL,
      params: {
        key: API_KEY,
        type: "video",
        part: "snippet",
        q: game.app_name + "trailer",
      },
    })
      .then((res) => setVideoId(res.data.items[0].id.videoId))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(`file${File.complete}`);
    if (!File.complete) {
      console.log("test");
      axios({
        method: "GET",
        url: `/game/word-cloud/${id}/`,
        headers: {
          authorization: `jwt ${getCookie("myToken")}`,
        },
      })
        .then((res) => setLoading(true))
        .catch((err) => console.log(err));
    }
  }, []);

  console.log(`loading${loading}`);

  const clickSteam = () => {
    const link = `https://store.steampowered.com/app/${game.id}`;
    window.open(link);
  };

  const transferRate = (data) => {
    console.log("누름");
    axios({
      method: "POST",
      url: "/rate/",
      data: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const clickLike = (id) => {
    const data = {
      gameid: game.id,
      like: 1,
    };
    transferRate(data);
  };
  const clickDislike = (id) => {
    const data = {
      gameid: id,
      like: 0,
    };
    transferRate(data);
  };

  return (
    <div className="game_detail">
      <div className="detail_header">
        <div className="detail_title">{game.app_name}</div>
        <div className="rating-btn">
          <span onClick={() => clickLike(game.id)}>
            <i className="fas fa-thumbs-up"></i>
          </span>
          <span onClick={() => clickDislike(game.id)}>
            <i className="fas fa-thumbs-down"></i>
          </span>
        </div>
      </div>
      <div className="trailer">
        {/* <iframe src={`https://www.youtube.com/embed/${videoId}`} title="trailer"></iframe> */}
        {/* <YouTube videoId={videoId}/>
         */}
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`}
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div className="game_info">
        <img
          className="poster"
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
          alt="game-poster"
        />
        <div className="game_info_detail">
          <div className="price">
            <span>{game.price}</span>
            <span>
              <i onClick={clickSteam} className="fab fa-steam"></i>
            </span>
          </div>
          <div className="genre">
            {game.genres &&
              game.genres.map((genre, index) => (
                <Genre genre={genre} key={index} />
              ))}
          </div>
          <div className="tags">
            {tagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <div className="rate">{Math.round(game.good_rate)}</div>
        </div>
      </div>
      <div className="wordcloud">
        {loading && <img src={`/${id}.png`} alt="a" />}
      </div>
    </div>
  );
}

function Genre(genre) {
  return <span className="genre-item">{genre.genre}</span>;
}
