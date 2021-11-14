import {React, useState, useEffect} from "react";
import { getCookie } from "../hooks/cookie";
import axios from "axios";
import "../sass/pages/_survey.scss"

const surveyList = [
  {
    'genre': 'FPS',
    'content': '총을 쏴보고 싶으신가요?',
    'games': [
      {
        'id': 578080,
        'title': 'PUBG: BATTLEGROUNDS',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg?t=1631074279',
      },
      {
        'id': 7940,
        'title': 'Call of Duty4: ModernWarfare®',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/7940/header.jpg?t=1628530918',
      },
      {
        'id': 1238810,
        'title': 'Battlefield V',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header.jpg?t=1629830833',
      },
    ],
  },
  {
    'genre': '액션',
    'content': '이소룡처럼 움직이고 싶으신가요?',
    'games': [
      {
        'id': 389730,
        'title': 'TEKKEN 7',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/389730/header.jpg?t=1630387679',
      },
      {
        'id': 374320,
        'title': 'DARK SOULS™ III',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg?t=1628263692',
      },
      {
        'id': 292030,
        'title': 'The Witcher® 3: Wild Hunt',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1621939214',
      },
    ],
  },
  {
    'genre': '스포츠',
    'content': '운동선수가 꿈이었어요',
    'games': [
      {
        'id': 1263850,
        'title': 'Football Manager 2021',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1263850/header.jpg?t=1612352842',
      },
      {
        'id': 1313860,
        'title': 'EA SPORTS™ FIFA 21',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1313860/header.jpg?t=1625577202',
      },
      {
        'id': 1225330,
        'title': 'NBA 2K21',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/header.jpg?t=1614622937',
      },
    ],
  },
  {
    'genre': '레이싱',
    'content': '급발진 하고싶어요',
    'games': [
      {
        'id': 1293830,
        'title': 'Forza Horizon 4',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/header.jpg?t=1622068013',
      },
      {
        'id': 1080110,
        'title': 'F1® 2020',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1080110/header.jpg?t=1625582774',
      },
      {
        'id': 1222680,
        'title': 'Need for Speed™ Heat',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg?t=1620488613',
      },
    ],
  },
  {
    'genre': '공포',
    'content': '쫄?',
    'games': [
      {
        'id': 238320,
        'title': 'Outlast',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/238320/header.jpg?t=1618944230',
      },
      {
        'id': 319510,
        'title': 'Five Nights at Freddy`s',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/319510/header.jpg?t=1579635996',
      },
      {
        'id': 17470,
        'title': 'Dead Space',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/17470/header.jpg?t=1627659306',
      },
    ],
  },
  {
    'genre': '퍼즐',
    'content': '지능을 자랑하고 싶으신가요?',
    'games': [
      {
        'id': 400,
        'title': 'Portal',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/400/header.jpg?t=1608593358',
      },
      {
        'id': 1426210,
        'title': 'It Takes Two',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header_alt_assets_0.jpg?t=1627656469',
      },
      {
        'id': 367450,
        'title': 'Poly Bridge',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/367450/header.jpg?t=1567634023',
      },
    ],
  },
  {
    'genre': 'RPG',
    'content': '가상 캐릭터라도 잘 키우고 싶지 않나요?',
    'games': [
      {
        'id': 582010,
        'title': 'Monster Hunter: World',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg?t=1623978557',
      },
      {
        'id': 49520,
        'title': 'Borderlands 2',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/49520/header.jpg?t=1590450074',
      },
      {
        'id': 637650,
        'title': 'FINAL FANTASY XV',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/637650/header.jpg?t=1592962568',
      },
    ],
  },
  {
    'genre': '시뮬레이션',
    'content': '이세계의 신이 되고 싶으신가요?',
    'games': [
      {
        'id': 1222670,
        'title': 'The Sims™ 4',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg?t=1631568478',
      },
      {
        'id': 683900,
        'title': 'RollerCoaster Tycoon®',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/683900/header.jpg?t=1621526350',
      },
      {
        'id': 8930,
        'title': 'Sid Meier`s Civilization® V',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/8930/header.jpg?t=1579731804',
      },
    ],
  },
  {
    'genre': '캐쥬얼',
    'content': '간단하게 게임을 즐기고 싶으신가요?',
    'games': [
      {
        'id': 1097150,
        'title': 'Fall Guys: Ultimate Knockout',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg?t=1630144986',
      },
      {
        'id': 413150,
        'title': 'Stardew Valley',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg?t=1608624324',
      },
      {
        'id': 477160,
        'title': 'Human: Fall Flat',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/477160/header.jpg?t=1631948654',
      },
    ],
  },
  {
    'genre': '오픈월드',
    'content': '모험을 즐기시나요?',
    'games': [
      {
        'id': 271590,
        'title': 'Grand Theft Auto V',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg?t=1618856444',
      },
      {
        'id': 1174180,
        'title': 'Red Dead Redemption 2',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg?t=1618851907',
      },
      {
        'id': 489830,
        'title': 'The Elder Scrolls V: Skyrim',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg?t=1590515887',
      },
    ],
  },
  {
    'genre': '음악',
    'content': 'music is my life',
    'games': [
      {
        'id': 960170,
        'title': 'DJMAX RESPECT V',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/960170/header.jpg?t=1631177173',
      },
      {
        'id': 221640,
        'title': 'Super Hexagon',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/221640/header.jpg?t=1579280387',
      },
      {
        'id': 247080,
        'title': 'Crypt of the NecroDancer',
        'imgPath': 'https://cdn.cloudflare.steamstatic.com/steam/apps/247080/header.jpg?t=1628036043',
      },
    ],
  },
]

function Card({game}) {

  const [ like, setLike ] = useState(false);
  const [ disLike, setDisLike ] = useState(false);

  const getLike = (data) => {
    if ( data === 1 ) {
      setLike(true)
      setDisLike(false)
    } else if ( data === 0 ) {
      setLike(false)
      setDisLike(true)
    }
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/game/detail/${game.id}/`,
      headers: {
        authorization: `jwt ${getCookie("myToken")}`
      }
    })
      .then(res => ( 
        getLike(res.data[0].like)
      ))
  }, [])

  const transferRate = data => {
    axios({
      method: "POST",
      url: "/rate/",
      data: data,
      headers: {
        authorization: `jwt ${getCookie("myToken")}`
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const clickLike = id => {
    const data = {
      "gameid": id,
      "like": 1
    }
    transferRate(data)
    setLike(true)
    setDisLike(false)
  }
  function clickDislike(id) {
    const data = {
      "gameid": id,
      "like": 0
    }
    transferRate(data)
    setLike(false)
    setDisLike(true)
  }

  return (
    <div className="game-item">
      <img className="card-img" src={game.imgPath} alt="game-poster" />
      <div className="card-content">
        <span>{game.title}</span>
        <div className="rating-btn">
          { like ? 
          <span onClick={() => clickLike(game.id)}><i className="fas fa-thumbs-up like"></i></span>
          :
          <span onClick={() => clickLike(game.id)}><i className="fas fa-thumbs-up"></i></span>
          }
          { disLike ? 
          <span onClick={() => clickDislike(game.id)}><i className="fas fa-thumbs-down dislike"></i></span>
          :
          <span onClick={() => clickDislike(game.id)}><i className="fas fa-thumbs-down"></i></span>
          }
        </div>
      </div>
    </div>
  )
} 

export default function Survey() {
  const [ idx, setIdx ] = useState(0);
  const [ genrePreference ,setGenrePreference ] = useState([]);
  const [ genreCheckList, setGenreCheckList ] = useState([]);
  const [ yes, setYes ] = useState(false);
  const [ no, setNo ] = useState(false);

  const genreList = [
    'FPS',
    'Action',
    'Sports',
    'Racing',
    'Horror',
    'Puzzle',
    'RPG',
    'Simulation',
    'Casual',
    'Open World',
    'Music',
  ]
  
  const clickNextIdx = () => {
    if ( idx < 10 ) {
      setIdx(idx + 1)
      setNo(false)
      setYes(false)
    } else {
      window.location.href = `/survey-result/${genreData}`
    }
  }
  const clickPreviousIdx = () => {
    if ( idx > 0 ) {
      setIdx(idx - 1)
    }
  }

  const genreData = genrePreference.join('-')

  // 장르 yes/no 선택에 따른 array 추가/제거
  const clickYes = idx => {
    if ( !genrePreference.includes(genreList[idx]) ) {
      console.log('jklfsdjklsadfjklasdflkj')
      setGenrePreference([...genrePreference, genreList[idx]])
      setGenreCheckList([...genreCheckList, genreList[idx]])
      setYes(true)
      setNo(false)
    }
  }
  const clickNo = idx => {
    setGenrePreference(genrePreference.filter(g => g !== genreList[idx] ))
    setGenreCheckList([...genreCheckList, genreList[idx]])
    setNo(true)
    setYes(false)
  }

  const yesBtn = { backgroundColor: '#5f91e2' }

  return(
    <div className="survey">
      <progress value={idx} max="10">
      </progress>
 
      <h1>{surveyList[idx].genre}</h1>
      <h2>{surveyList[idx].content}</h2>
      <div className="genre-btn">
        <input className="genre-btn-item" type="radio" name="genre" id="genre-yes" />
        { yes ? 
        <label className="yes yes-choose" onClick={() => clickYes(idx)} htmlFor="genre-yes">Yes</label>
        :
        <label className="yes not-choose" onClick={() => clickYes(idx)} htmlFor="genre-yes">Yes</label>
        }
        <input className="genre-btn-item" type="radio" name="genre" id="genre-no" />
        { no ?
        <label className="no no-choose" onClick={() => clickNo(idx)} htmlFor="genre-no">No</label>
        :
        <label className="no not-choose" onClick={() => clickNo(idx)} htmlFor="genre-no">No</label>
        }
        <span className="genre-btn-background"></span>
      </div>
      <div className="games">
        {surveyList[idx].games.map(game => (
          <Card game={game} key={game.id} />
        ))}
      </div>


      {/*<div className="eightbit-btn">*/}
      <div className="step-btn">
        <button
          className="eightbit-btn"
          style={{ visibility: idx === 0 ? "hidden":"visible"}}
          onClick={clickPreviousIdx}>Previous</button>
        <button
          className="eightbit-btn"
          // style={{ backgroundColor: genreCheckList.includes(genreList[idx]) ? "#C7B963":"gray"}}
          disabled={!genreCheckList.includes(genreList[idx])}
          onClick={clickNextIdx}>
          {
            idx === 10 ? 'Finish':'Next'
          }
        </button>
      </div>
    </div>
  )
} 
