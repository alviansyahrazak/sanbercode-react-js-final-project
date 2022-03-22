import React, { useContext, useEffect } from "react";
import { Divider } from "antd";
import { MoviesContext } from "../context/MoviesContext";
import { Link } from "react-router-dom";

const Movies = () => {
  const {
    dataMovies,
    fetchStatusMovies,
    setFetchStatusMovies,
    functionsMovies,
  } = useContext(MoviesContext);

  const { fetchDataMovies } = functionsMovies;

  useEffect(() => {
    if (fetchStatusMovies) {
      fetchDataMovies();
      setFetchStatusMovies(false);
    }
  }, [fetchDataMovies, fetchStatusMovies, setFetchStatusMovies]);
  return (
    <>
      <Divider
        orientation="left"
        style={{ color: "#7f98ae", fontWeight: "bold" }}
      >
        All Movies
      </Divider>
      <div className="movies-page-container">
        {dataMovies !== null && (
          <>
            {dataMovies.map((res, keymp) => {
              return (
                <>
                  <div className="cards-movies-page" key={keymp}>
                    <Link to={`/detail-movie/${res.id}`}>
                      <div className="card-img-hover-movies-page">
                        <img
                          className="card-img-movies-page"
                          alt="image_movies-page"
                          src={`${res.image_url}`}
                        />
                      </div>
                    </Link>
                    <div className="des-card-movies-page">
                      <Link to={`/detail-movie/${res.id}`}>
                        <h3 className="h3-movies-page">{`${res.title}`}</h3>
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
    </>
  );
};

export default Movies;
