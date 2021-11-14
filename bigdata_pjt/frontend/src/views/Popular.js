import { React, useState, useEffect } from 'react';
import { getCookie } from '../hooks/cookie';
import axios from 'axios';
import '../sass/pages/_popular.scss';
import GameList from '../components/common/GameList';

export default function Popular() {
  const [dataHighRated, setDataHighRated] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/high-rated/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setDataHighRated(res.data));
  }, []);

  const [dataManyReview, setDataManyReview] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/high-rated/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setDataManyReview(res.data));
  }, []);

  const [dataHighPlayHour, setDataHighPlayHour] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/game/high-rated/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setDataHighPlayHour(res.data));
  }, []);

  const [algo, setAlgo] = useState('dataHighRated');

  const clickHighRated = () => {
    setAlgo('dataHighRated');
  };

  const clickManyReview = () => {
    setAlgo('dataManyReview');
  };

  const clickHighPlayHour = () => {
    setAlgo('dataHighPlayHour');
  };

  return (
    <div className="popular">
      <div className="popular-header">Popular</div>
      <div className="selectAlgo">
        <button className="eightbit-btn" onClick={clickHighRated}>
          별점높은순
        </button>
        <button className="eightbit-btn eightbit-btn--proceed" onClick={clickManyReview}>
          리뷰많은순
        </button>
        <button className="eightbit-btn eightbit-btn--reset" onClick={clickHighPlayHour}>
          플레이시간많은순
        </button>
      </div>
      <div className="popular-list">
        {algo === 'dataHighRated' && <GameList data={dataHighRated} />}
        {algo === 'dataManyReview' && <GameList data={dataManyReview} />}
        {algo === 'dataHighPlayHour' && <GameList data={dataHighPlayHour} />}
      </div>
    </div>
  );
}
