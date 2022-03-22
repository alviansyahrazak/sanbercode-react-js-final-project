import React, { useContext, useEffect } from "react";
import { Divider, Spin } from "antd";
import { MoviesContext } from "../context/MoviesContext";
import { GamesContext } from "../context/GamesContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    dataMovies,
    fetchStatusMovies,
    setFetchStatusMovies,
    functionsMovies,
    dispay,
  } = useContext(MoviesContext);

  const { fetchDataMovies } = functionsMovies;

  const { dataGames, fetchStatusGames, setFetchStatusGames, functionsGames } =
    useContext(GamesContext);

  const { fetchDataGames } = functionsGames;

  useEffect(() => {
    if (fetchStatusMovies) {
      fetchDataMovies();
      setFetchStatusMovies(false);
    }
  }, [fetchDataMovies, fetchStatusMovies, setFetchStatusMovies]);

  useEffect(() => {
    if (fetchStatusGames) {
      fetchDataGames();
      setFetchStatusGames(false);
    }
  }, [fetchDataGames, fetchStatusGames, setFetchStatusGames]);

  return (
    <>
      <div>
        <iframe
          className="carol-homepage"
          src="https://embed.lottiefiles.com/animation/63868"
        >
          {dispay && <Spin />}
        </iframe>
      </div>

      <Divider
        orientation="left"
        style={{ color: "#7f98ae", fontWeight: "bold" }}
      >
        Latest Movies
      </Divider>
      <div className="movies-home-container">
        {dataMovies !== null && (
          <>
            {dataMovies.map((res, keyhm) => {
              return (
                <>
                  <div className="cards-home" key={keyhm}>
                    <Link to={`/detail-movie/${res.id}`}>
                      <div className="card-img-hover-home">
                        <img
                          className="card-img-home"
                          alt="image_movies"
                          src={`${res.image_url}`}
                        />
                      </div>
                    </Link>
                    <div className="des-card-home">
                      <Link to={`/detail-movie/${res.id}`}>
                        <h3 className="h3-home">{`${res.title}`}</h3>
                      </Link>
                      <p>{`⭐ ${res.rating}/10`}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>

      <Divider
        orientation="left"
        style={{ color: "#7f98ae", fontWeight: "bold" }}
      >
        Latest Games{" "}
      </Divider>
      <div className="games-home-container">
        {dataGames !== null && (
          <>
            {dataGames.map((res, keyhg) => {
              return (
                <>
                  <div className="cards-home" key={keyhg}>
                    <Link to={`/detail-game/${res.id}`}>
                      <div className="card-img-hover-home">
                        <img
                          className="card-img-home"
                          alt="image_movies"
                          src={`${res.image_url}`}
                        />
                      </div>
                    </Link>
                    <div className="des-card-home">
                      <Link to={`/detail-game/${res.id}`}>
                        <h3 className="h3-home">{`${res.name}`}</h3>
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

export default Home;
