import { React, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "../../sass/components/_card.scss";
import GameDetail from "./GameDetail";

export default function GameCard(game) {
  const imgSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.game.id}/header.jpg`
  // const [ title, setTitle ] = useState("")
  
  // 제목 글자 수 처리
  function textLengthOverCut(txt, len, lastTxt) {
    if (len == "" || len == null) { // 기본값
        len = 20;
    }
    if (lastTxt == "" || lastTxt == null) { // 기본값
        lastTxt = "...";
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  }

  const title = textLengthOverCut(game.game.app_name, 20, '...')

  const tagList = document.getElementsByClassName(`${game.game.id}tag`);
  function showTags(e) {
    for (let i=0; i<tagList.length; i++ ) {
      tagList[i].style.height = tagList[i].scrollHeight + 'px';
      tagList[i].style.opacity = 1;
      tagList[i].style.transitionDelay = i * 0.08 + 's';
    }
  }
  function hideTags(e) {
    for (let i=0; i < tagList.length; i++ ) {
      tagList[i].style.height = null;
      tagList[i].style.opacity = 0;
      tagList[i].style.transitionDelay = i * 0.08 + 's';
    }
  }

  const StyledModal = Modal.styled`
    width: 20rem;
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    opacity: ${(props) => props.opacity};
    transition : all 0.3s ease-in-out;`;

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function openModal(e) {
    console.log("열")
    setOpacity(0);
    setIsOpen(true);
  }

  function closeModal(e) {
    // setOpacity(1);
    console.log("닫")
    setIsOpen(false);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }


  const FadingBackground = styled(BaseModalBackground)`
    opacity: ${(props) => props.opacity};
    transition: all 0.3s ease-in-out;
    `;
  
  return(
    <div className="game-card">
      <ModalProvider backgroundComponent={FadingBackground}>
        <div
          className="card-body"
          onMouseEnter={showTags}
          onMouseLeave={hideTags}
          onClick={openModal}
        >
          <img src={imgSrc} alt="game-poster" className="card-img" />
          <div className="tags" id="tags">
            <div className={[game.game.id + 'tag', 'tag'].join(' ')}>{game.game.tags[0]}</div>
            <div className={[game.game.id + 'tag', 'tag'].join(' ')}>{game.game.tags[1]}</div>
            <div className={[game.game.id + 'tag', 'tag'].join(' ')}>{game.game.tags[2]}</div>
          </div>

          <div className="card-content">
            <span className="game-title">{title}</span>
            <div className="small-content">
              <span>{game.game.price}</span>
            </div>
          </div>
        </div>
        <StyledModal
            isOpen={isOpen}
            afterOpen={afterOpen}
            beforeClose={beforeClose}
            onBackgroundClick={closeModal}
            onEscapeKeydown={closeModal}
            opacity={opacity}
            backgroundProps={{ opacity }}
          >
          <GameDetail id={game.game.id}/>
        </StyledModal>
      </ModalProvider>
    </div>
  )
}