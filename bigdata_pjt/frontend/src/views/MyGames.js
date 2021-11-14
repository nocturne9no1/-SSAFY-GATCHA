import { React, useState, useEffect } from 'react';
import { getCookie } from '../hooks/cookie';
import axios from 'axios';
import '../sass/pages/_myGames.scss';
import GameList from '../components/common/GameList';

export default function MyGames() {
  const [dataMyGames, setDataMyGames] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/user-rated/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setDataMyGames(res.data));
  }, []);

  return (
    <div className="myGames">
      {/* <div className="myGames-header">
        MyGames
      </div> */}
      <div className="myGames-list">
        <GameList data={dataMyGames} />
      </div>
    </div>
  );
}
