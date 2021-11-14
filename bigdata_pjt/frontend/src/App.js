import React from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { Route, Routes } from "react-router-dom";
// views
import Sign from "./views/Sign";
import Home from "./views/Home";
import Popular from "./views/Popular";
import Recommend from "./views/Recommend";
import MyGames from "./views/MyGames";
import Profile from "./views/Profile";
import Survey from "./views/Survey";
import SurveyResult from "./views/SurveyResult";
import GameDetail from "./components/common/GameDetail";
import GameTest from "./views/GameTest";
import PopularGenre from "./views/PopularGenre";
import Search from "./views/Search";


function App() {
  return (
    <div>
      { window.location.pathname != '/' && <Navbar/>}
      { window.location.pathname != '/' && <Sidebar />}
      <Routes>
        <Route path="/" element={<Sign />}/>
        <Route path="/main" element={<Home />}/>
        <Route path="/popular" element={<Popular />}/>
        <Route path="/popular/:category" element={<PopularGenre />}/>
        <Route path="/recommend" element={<Recommend />}/>
        <Route path="/mygames" element={<MyGames />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/survey" element={<Survey />}/>
        <Route path="/survey-result/:survey" element={<SurveyResult />}/>
        <Route path="/detail/:id" element={<GameDetail />}/>
        <Route path="/testgame" element={<GameTest />}/>
        <Route path="/search/:game_name" element={<Search />}/>
      </Routes>
    </div>
  );
}

export default App;
