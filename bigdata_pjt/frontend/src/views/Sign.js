import { React, useState } from "react";
import axios from "axios";
import BGM from "../audio/Pixelated Autumn Leaves - Jeremy Blake.mp3"

// redux, login시 token redux에 저장하기 위함
import { useDispatch } from "react-redux";
import { setToken, store } from "../store";
// 쿠키 설정
import { setCookie } from "../hooks/cookie";

import "../sass/components/_sign.scss"

export default function Sign() {
  const [ now, setNow ] = useState('select')

  const clickNew = () => {
    setNow('new')
  }
  const clickLoad = () => {
    setNow('load')
  }

  const clickBack = () => {
    setNow('select')
  }

  return (
    <div className="sign">
      <audio autoPlay>
        <source src={BGM}/>
      </audio>
      <div className="box">
        { now === 'select' && (
          <div>
            <div className="title">
              <span>GATCHA</span>
            </div>
            <div className="choice">
              <span onClick={clickNew}>NEW GAME</span>
              <span onClick={clickLoad}>LOAD GAME</span>
            </div>
          </div>
        )}

        { now === 'load' && (
          <div>
            <div className="title">
              <span>GATCHA</span>
            </div>
            <div className="choice">
              <Login backMenu={clickBack}/>
            </div>
          </div>
        )}

        { now === 'new' && (
          <div>
            <div className="signup">
              <Signup backMenu={clickBack}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Login({ backMenu }) {
  const [ id, setId ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ disabled, setDisable ] = useState(false);
  const handleIdChange = ({ target: { value }}) => setId(value);
  const handlePasswordChange = ({ target: { value }}) => setPassword(value);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    setDisable(true);
    event.preventDefault();
    // 중복 제출 방지
    await new Promise((r) => setTimeout(r, 500));
    const data = {
      username: id,
      password
    };
    axios({
      method: "POST",
      url: "/accounts/api-token-auth/",
      data: data,
    })
      .then(res => {
        setCookie('myToken', res.data.token, {
          path: '/',
          domain: 'j5a402.p.ssafy.io',
          secure: true,
          sameSite: "none",
        })
	console.log('되나요')
        dispatch(setToken(res.data))
        console.log(store.getState())
        window.location.href = '/main'
      })
      .catch(err => console.log(err))
    setDisable(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <div className="input-area">
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleIdChange}
            placeholder="id"/>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
          />
        </div>
        <div className="btn-area">
          <button
            type="submit"
            disabled={disabled}
          >
            LOGIN
          </button>
          <button onClick={backMenu}>
            BACK
          </button>
        </div>
      </div>
    </form>
  )
}

function Signup({ backMenu }) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [ nickname, setNickname ] = useState("");
  const [ genderStatus, setGenderStatus ] = useState(false)
  const [ radioStatus, setRadioStatus ] = useState(0)

  const handleUsernameChange = ({ target: { value }}) => setUsername(value);
  const handlePasswordChange = ({ target: { value }}) => setPassword(value);
  const handlePasswordConfirmChange = ({ target: { value }}) => setPasswordConfirm(value);
  const handleNicknameChange = ({ target: { value }}) => setNickname(value);
  const handleClickRadioButton = (gender) => {
    setGenderStatus(gender);
    if(gender == 'male'){
      setRadioStatus(1);
    }else {
      setRadioStatus(2);
    }
  }


  const maleImg = {
    default:'male.png',
    clicked: 'male_move.gif',
    nonclicked: 'male.png',
  }
  const femaleImg = {
    default:'female.png',
    clicked: 'female.png',
    nonclicked: 'female_move.gif',
  }
  const getImage = (radio) => {
    if(radio == 0){
      return 'default'
    }else if(radio == 1){
      return 'clicked'
    }else {
      return 'nonclicked'
    }
  };
  const maleState = getImage(radioStatus);
  const femaleState = getImage(radioStatus);


  const handleSubmit = event => {



    event.preventDefault()
    let gender = (genderStatus === "male") ? 0 : 1;


    const data = {
      username,
      password,
      password_confirmation: passwordConfirm,
      nickname,
      gender,
    }
    axios({
      method: "POST",
      url: "/accounts/user/",
      data,
    })
      .then(res => backMenu())
      .catch(err => console.log(err))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-wrap">
        <div className="text-input">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="PasswordConfirm"
          />
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="nickname"
          />
        </div>
        <div className="gender-select">
          <label htmlFor="male">
            <img src={maleImg[maleState]} />
            <input type="radio" name="gender" id="male" checked={genderStatus === "male"} onChange={() => handleClickRadioButton('male')}/>
          </label>
          <label htmlFor="female">
            <img src={femaleImg[femaleState]} />
            <input type="radio" name="gender" id="female" checked={genderStatus === "female"} onChange={() => handleClickRadioButton('female')}/>
          </label>
        </div>
        <div className="btn-area">
          <button type="submit">Signup</button>
          <button onClick={backMenu}>
            BACK
          </button>
        </div>
      </div>
    </form>
  )
}
