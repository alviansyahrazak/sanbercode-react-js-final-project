import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { movieslug } = useParams();
  const [dataMovies, setDataMovies] = useState([]);
  const [fetchStatusMovies, setFetchStatusMovies] = useState(true);

  useEffect(() => {
    if (movieslug !== undefined) {
      const fetchDataMovies = async () => {
        let { data } = await axios.get(
          `https://backendexample.sanbersy.com/api/data-movie/${movieslug}`
        );
        // console.log(data);

        setDataMovies({ ...data });
      };

      if (fetchStatusMovies) {
        fetchDataMovies();
        setFetchStatusMovies(false);
      }
    }
  }, [fetchStatusMovies, setFetchStatusMovies]);

  return (
    <>
      <div className="detail-movie-container">
        <div className="detail-movie">
          <div className="detail-movie-img">
            <img className="src-detail-movie-img" src={dataMovies.image_url} />
          </div>
          <div className="detail-all-description">
            <div className="detail-movie-title">
              <h1 className="h1-title-detail-movie">{dataMovies.title}</h1>
            </div>
            <div className="detail-movie-description">
              <p>Description :</p>
              <p>{dataMovies.description}</p>
            </div>
            <div className="detail-movie-year">
              <p>Release Year : {dataMovies.year}</p>
            </div>
            <div className="detail-movie-genre">
              <p>Genre : {dataMovies.genre}</p>
            </div>
            <div className="detail-movie-duration">
              <p>Duration : {dataMovies.duration} Minutes</p>
            </div>
            <div className="detail-movie-rating">
              <p>Rating : {dataMovies.rating}/10</p>
            </div>
            <div className="detail-movie-review">
              <p>Review :</p>
              <p>{dataMovies.review}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
