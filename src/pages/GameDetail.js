import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GameDetail = () => {
  const { gameslug } = useParams();
  const [dataGames, setDataGames] = useState([]);
  const [fetchStatusGames, setFetchStatusGames] = useState(true);

  useEffect(() => {
    if (gameslug !== undefined) {
      const fetchDataGames = async () => {
        let { data } = await axios.get(
          `https://backendexample.sanbersy.com/api/data-game/${gameslug}`
        );
        // console.log(data);

        setDataGames({ ...data });
      };

      if (fetchStatusGames) {
        fetchDataGames();
        setFetchStatusGames(false);
      }
    }
  }, [fetchStatusGames, setFetchStatusGames]);

  const handleSinglePlayer = (res) => {
    let mode = res;
    if (mode === 1) {
      return "Single Player";
    } else {
      return "Not Support Single Player";
    }
  };

  const handleMultiplayer = (res) => {
    let mode = res;
    if (mode === 0) {
      return "Multiplayer";
    } else {
      return "Not Support Multiplayer";
    }
  };

  return (
    <>
      <div className="detail-game-container">
        <div className="detail-game">
          <div className="detail-game-img">
            <img className="src-detail-game-img" src={dataGames.image_url} />
          </div>
          <div className="detail-all-description-game">
            <div className="detail-game-title">
              <h1 className="h1-title-game-movie">{dataGames.name}</h1>
              <div className="detail-game-year">
                <p>Platform : {dataGames.platform}</p>
              </div>
            </div>
            <div className="detail-all-description-game">
              <p>Genre : {dataGames.genre}</p>
            </div>
            <div className="detail-game-genre">
              <p>Release : {dataGames.release}</p>
            </div>
            <div className="detail-game-duration">
              <p>
                Mode : {handleSinglePlayer(dataGames.singlePlayer)}, &nbsp;
                {handleMultiplayer(dataGames.multiplayer)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
