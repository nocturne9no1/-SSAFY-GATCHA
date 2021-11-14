import React from "react";
import { Link } from "react-router-dom";
import "../../sass/layout/_sidebar.scss";

import { useDispatch } from "react-redux";
import { delToken, store } from "../../store";
import axios from "axios";
import { useCookies } from "react-cookie"


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div id="leftside-navigation" className="side-nav">
        <SidebarContent />
      </div>
    </aside>
  )
};

function SidebarContent() {
  function showCategory(e) {
    const popularCategory = document.getElementById("popularCategory");
    popularCategory.style.height = popularCategory.scrollHeight + "px";
  }
  function hideCategory(e) {
    const popularCategory = document.getElementById("popularCategory");
    popularCategory.style.height = null;
  }
  
  const dispatch = useDispatch();
  const [ cookies, setCookie, removeCookie ] = useCookies(['myToken']);
  const clickLogout = () => {
    axios.defaults.headers.common['Authorization'] = '';
    dispatch(delToken());
    console.log(store.getState());
    removeCookie('myToken');
    window.location.href = '/';
  }

  return (
    <ul className="side-nav-content">
      <li><Link to="/main" className="nav-item"><i className="fas fa-home"></i><span>Home</span></Link></li>
      <div className="popular-area"
          onMouseEnter={showCategory}
          onMouseLeave={hideCategory}
        >
        <li>
          <Link
            to="/popular"
            className="nav-item"
          >
            <i className="fas fa-fire-alt"></i><span>Popular</span>
          </Link>
        </li>
        <Popular />
      </div>
      <li><Link to="/recommend" className="nav-item"><i className="fas fa-thumbs-up"></i><span>Recommend</span></Link></li>
      <li><Link to="/survey" className="nav-item"><i className="fas fa-list-alt"></i><span>Survey</span></Link></li>
      <li><Link to="/profile" className="nav-item"><i className="fas fa-user-circle"></i><span>Profile</span></Link></li>
      <li><div onClick={clickLogout} className="nav-item"><i className="fas fa-sign-out-alt"></i><span>Logout</span></div></li>
    </ul>
  )
};

const clickCategory = (category) => {
  window.location.href=`/popular/${category}`
}

function Popular() {
  return (
    <ul className="popular-item" id="popularCategory">
      {/* 향후 각 카테고리에 Link 태그를 추가하여 /popular/{category} 로 이동할 수 있도록 함*/}
      <li onClick={()=>clickCategory('FPS')}>FPS</li>
      <li onClick={()=>clickCategory('Action')}>Action</li>
      <li onClick={()=>clickCategory('Sports')}>Sports</li>
      <li onClick={()=>clickCategory('Racing')}>Racing</li>
      <li onClick={()=>clickCategory('Horror')}>Horror</li>
      <li onClick={()=>clickCategory('Puzzle')}>Puzzle</li>
      <li onClick={()=>clickCategory('RPG')}>RPG</li>
      <li onClick={()=>clickCategory('Simulation')}>Simulation</li>
      <li onClick={()=>clickCategory('Casual')}>Casual</li>
      <li onClick={()=>clickCategory('Open World')}>Open World</li>
      <li onClick={()=>clickCategory('Music')}>Music</li>      
    </ul>
  )
};