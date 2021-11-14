import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../hooks/cookie';
// import YouTube from "react-youtube";
import '../../sass/components/_gameDetail.scss';
import Loader from '../../hooks/loader';

export default function GameDetail(props) {
  const [game, setGame] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordcloud, setWordcloud] = useState('');
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  // 데이터를 아껴 쓰자
  const API_KEY = 'AIzaSyClV5LxxqrE0zBEIitgQ3dzygZEutslFbE';
  // const API_KEY = 'AIzaSyB7eEUxilKj-Pd9XxGqcTDFhgTnp9qrXgQ';
  // const API_KEY = 'AIzaSyACcs1YL_fyqJkhwveEMG0gqANaUoFq758';
  console.log(`now Like : ${like}`);
  // const API_KEY = '';
  const URL = 'https://www.googleapis.com/youtube/v3/search';

  const initSetLike = () => {
    console.log(`game: ${game.like}`);
    if (game.like === 1) {
      setLike(true);
      setDisLike(false);
    } else if (game.like === 0) {
      setLike(false);
      setDisLike(true);
    }
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/game/detail/${props.id}/`,
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    })
      .then((res) => (setGame(res.data[0]), setTagList(res.data[0].tags.slice(0, 4))))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    initSetLike();
  }, [game]);

  useEffect(() => {
    if (game.app_name !== undefined) {
      axios({
        method: 'GET',
        url: URL,
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: game.app_name + 'trailer',
        },
      })
        .then((res) => (console.log(res), setVideoId(res.data.items[0].id.videoId)))
        .catch((err) => console.log(err));
    }
  }, [game]);

  // useEffect(() => {
  //   console.log("test")
  //   axios({
  //       method: 'GET',
  //       url: `/game/word-cloud/${props.id}/`,
  //       headers: {
  //         authorization: `jwt ${getCookie("myToken")}`
  //       }
  //     })
  //       .then(res => (
  //         setTimeout(() => [
  //           setWordcloud(require(`../../wordclouds/${props.id}.png`).default), setLoading(true)], 3000)
  //           ))
  //       .catch(err => console.log(err))
  // }, []);
  useEffect(() => {
    // console.log(${props.id});
    const propId = props.id;
    const cloudId = '/wordclouds/' + propId + '.png';

    setTimeout(() => [setWordcloud(require(`../../wordclouds/${props.id}.png`).default), setLoading(true)], 3000);
  }, []);

  const clickSteam = () => {
    const link = `https://store.steampowered.com/app/${game.id}`;
    window.open(link);
  };

  const transferRate = (data) => {
    console.log('누름');
    axios({
      method: 'POST',
      url: '/rate/',
      data: data,
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
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
    setLike(true);
    setDisLike(false);
  };
  const clickDislike = (id) => {
    const data = {
      gameid: id,
      like: 0,
    };
    transferRate(data);
    setLike(false);
    setDisLike(true);
  };

  return (
    <div className="game-detail">
      <div className="detail-header">
        <div className="detail-title">{game.app_name}</div>
        <div className="header-right">
          <div className="rate">
            <span>{Math.round(game.good_rate)} / 100</span>
          </div>
          <div className="rating-btn">
            {like ? (
              <span onClick={() => clickLike(game.id)}>
                <i className="fas fa-thumbs-up like"></i>
              </span>
            ) : (
              <span onClick={() => clickLike(game.id)}>
                <i className="fas fa-thumbs-up"></i>
              </span>
            )}
            {disLike ? (
              <span onClick={() => clickDislike(game.id)}>
                <i className="fas fa-thumbs-down dislike"></i>
              </span>
            ) : (
              <span onClick={() => clickDislike(game.id)}>
                <i className="fas fa-thumbs-down"></i>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="trailer">
        {/* <iframe src={`https://www.youtube.com/embed/${videoId}`} title="trailer"></iframe> */}
        {/* <YouTube videoId={videoId}/>*/}
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`}
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div className="game-info">
        <div className="poster-area">
          <img className="poster" src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`} alt="game-poster" />
        </div>
        <div className="info-wrap">
          <div className="game-info-detail">
            <div className="price">
              <span>{game.price}</span>
              <span>
                <i onClick={clickSteam} className="fab fa-steam"></i>
              </span>
            </div>
            <div className="genre">
              <span>GENRE</span>
              <hr />
              {game.genres && game.genres.map((genre, index) => <Genre genre={genre} key={index} />)}
            </div>
            <div className="tags">
              <span>TAG</span>
              <hr />
              {tagList.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="wordcloud">
        <img src={process.env.PUBLIC_URL + wordcloud} />
      </div> */}
      <div className="wordcloud">
        {loading ? (
          <div>
            <img src={process.env.PUBLIC_URL + wordcloud} />
          </div>
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

function Genre(genre) {
  return <span className="genre-item">{genre.genre}</span>;
}
