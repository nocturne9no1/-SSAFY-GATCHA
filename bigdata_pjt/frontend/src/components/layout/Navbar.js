import React from "react";
import { Link } from "react-router-dom"

import "../../sass/layout/_navbar.scss"
// import Logo from "../../logo.png"


export default function Navbar() {

  const searchGame = (gameName) => {
    console.log(gameName)
    // props.history.push("/main")
    window.location.href=`/search/${gameName}`
  }

  return (
    <nav>
      <ul className="nav-container">
        <div className="nav-left">
          <Link to="/main"><img className="logo" src="/logo.png" alt="aa" /></Link>
        </div>
        <div className="nav-right">
          <div className="search-bar" id="search-bar">
            <input onKeyPress={(e) => e.key === 'Enter' && searchGame(e.target.value)} type="search" />
          </div>
        </div>
      </ul>
    </nav>
  )

}