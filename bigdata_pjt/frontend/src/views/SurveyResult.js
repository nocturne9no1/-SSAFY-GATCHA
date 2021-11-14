import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../hooks/cookie"
import axios from "axios";
import GameList from "../components/common/GameList";
import "../sass/pages/_surveyResult.scss"

export default function SurveyResult() {

  const { survey } = useParams();
  const [ result, setResult ] = useState([])

  // console.log(survey)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/game/category/${survey}/`,
      headers: {
        authorization: `jwt ${getCookie("myToken")}`
      }
    })
      .then(res => setResult(res.data))
  }, [survey]);

  console.log(result)

  return (
    <div className="survey-result">
        <div className="survey-result-header">
          {survey}
        </div>
        <div className="survey-result-list">
            <GameList data={result} />
        </div>
      </div>
  )
}