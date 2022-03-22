import React, { useContext, useEffect } from "react";
import { Divider } from "antd";
import { GamesContext } from "../context/GamesContext";
import { Link } from "react-router-dom";

const Games = () => {
  const { dataGames, fetchStatusGames, setFetchStatusGames, functionsGames } =
    useContext(GamesContext);

  const { fetchDataGames } = functionsGames;

  useEffect(() => {
    if (fetchStatusGames) {
      fetchDataGames();
      setFetchStatusGames(false);
    }
  }, [fetchDataGames, fetchStatusGames, setFetchStatusGames]);

  return (
    <>
      <Divider
        orientation="left"
        style={{ color: "#7f98ae", fontWeight: "bold" }}
      >
        All Games
      </Divider>
      <div className="games-page-container">
        {dataGames !== null && (
          <>
            {dataGames.map((res, keygp) => {
              return (
                <>
                  <div className="cards-games-page" key={keygp}>
                    <Link to={`/detail-game/${res.id}`}>
                      <div className="card-img-hover-games-page">
                        <img
                          className="card-img-games-page"
                          alt="image_games-page"
                          src={`${res.image_url}`}
                        />
                      </div>
                    </Link>
                    <div className="des-card-games-page">
                      <Link to={`/detail-game/${res.id}`}>
                        <h3 className="h3-games-page">{`${res.name}`}</h3>
                      </Link>
                      <p>{`${res.platform}`}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Games;
