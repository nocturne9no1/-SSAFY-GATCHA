import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { getCookie } from '../hooks/cookie';
import '../sass/base/_test.scss';
import '../sass/pages/_recommend.scss';
import GameList from '../components/common/GameList';
import Loader from '../hooks/loader';

export default function Recommend() {
  const [dataContentsBased, setDataContentsBased] = useState([]);
  const [algo, setAlgo] = useState('dataContentsBased');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/content-based/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setDataContentsBased(res.data));
  }, []);

  const [dataCollaborativeBased, setDataCollaborativeBased] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/colaborative/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => (setDataCollaborativeBased(res.data), setLoading(false)));
  }, []);
  console.log(dataCollaborativeBased);
  const clickContent = () => {
    setAlgo('dataContentsBased');
  };

  const clickCollaborative = () => {
    setAlgo('dataCollaborativeBased');
  };

  return (
    <div className="recommend">
      <div className="recommend-header">Recommend</div>
      <div className="selectAlgo">
        <button className="eightbit-btn" onClick={clickContent}>
          컨텐츠
        </button>
        <button className="eightbit-btn eightbit-btn--proceed" onClick={clickCollaborative}>
          협업
        </button>
      </div>
      <div className="recommend-list">
        {loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
        {algo === 'dataContentsBased' ? <GameList data={dataContentsBased} /> : <GameList data={dataCollaborativeBased} />}
      </div>
    </div>
  );
}
