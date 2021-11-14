import '../sass/base/_test.scss';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { getCookie } from '../hooks/cookie';
import MyGames from './MyGames';
import '../sass/pages/_profile.scss';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/accounts/my-profile/',
      headers: {
        authorization: `jwt ${getCookie('myToken')}`,
      },
    }).then((res) => setProfile(res.data));
  }, []);

  return (
    <div className="profile">
      <div className="profile-area">{profile.nickname}'s Games</div>
      <div className="game-area">
        <MyGames />
      </div>
    </div>
  );
}
