import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, createContext } from "react";
import { message } from "antd";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
  const [dataMovies, setDataMovies] = useState([]);
  const [fetchStatusMovies, setFetchStatusMovies] = useState(true);
  const [currentIdMovies, setCurrentIdMovies] = useState(-1);
  const [dispay, setDisplay] = useState(false);
  const [inputMovies, setInputMovies] = useState({
    title: "",
    image_url: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    rating: "",
    review: "",
  });

  const fetchDataMovies = async () => {
    setDisplay(true);
    let { data } = await axios.get(
      `https://backendexample.sanbersy.com/api/data-movie`
    );
    // console.log(data);
    let results = data.map((res) => {
      let {
        description,
        duration,
        genre,
        id,
        image_url,
        rating,
        review,
        title,
        year,
      } = res;

      return {
        id,
        title,
        image_url,
        description,
        year,
        duration,
        genre,
        rating,
        review,
      };
    });
    setDataMovies([...results]);
    setDisplay(false);
  };

  const functionCreateUpdateMovies = () => {
    let {
      title,
      image_url,
      description,
      year,
      duration,
      genre,
      rating,
      review,
    } = inputMovies;

    if (currentIdMovies === -1) {
      axios
        .post(
          ` https://backendexample.sanbersy.com/api/data-movie`,
          {
            title,
            image_url,
            description,
            year,
            duration,
            genre,
            rating,
            review,
          },
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((resData) => {
          setFetchStatusMovies(true);
          setTimeout(() => {
            message.success("Success Add Data");
          }, 500);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${currentIdMovies}`,
          {
            title,
            image_url,
            description,
            year,
            duration,
            genre,
            rating,
            review,
          },
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((resData) => {
          setFetchStatusMovies(true);
          setTimeout(() => {
            message.success("Success Edit Data");
          }, 500);
        });
    }
    setInputMovies({
      title: "",
      image_url: "",
      description: "",
      year: "",
      duration: "",
      genre: "",
      rating: "",
      review: "",
    });
    setCurrentIdMovies(-1);
  };

  const functionEditMovies = (idMovies) => {
    axios
      .get(`https://backendexample.sanbersy.com/api/data-movie/${idMovies}`)
      .then((res) => {
        let data = res.data;
        setInputMovies({
          title: data.title,
          image_url: data.image_url,
          description: data.description,
          year: data.year,
          duration: data.duration,
          genre: data.genre,
          rating: data.rating,
          review: data.review,
        });
        setCurrentIdMovies(data.id);
        setFetchStatusMovies(true);
      });
  };

  const functionDeleteMovies = (idMovies) => {
    axios
      .delete(
        `https://backendexample.sanbersy.com/api/data-movie/${idMovies}`,
        {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        }
      )
      .then(() => {
        setFetchStatusMovies(true);
        setTimeout(() => {
          message.success("Success Delete Data");
        }, 500);
      });
  };

  const functionsMovies = {
    fetchDataMovies,
    functionCreateUpdateMovies,
    functionEditMovies,
    functionDeleteMovies,
  };

  return (
    <MoviesContext.Provider
      value={{
        dataMovies,
        setDataMovies,
        fetchStatusMovies,
        setFetchStatusMovies,
        currentIdMovies,
        setCurrentIdMovies,
        inputMovies,
        setInputMovies,
        dispay,
        setDisplay,
        functionsMovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};
