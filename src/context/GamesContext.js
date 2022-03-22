import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, createContext } from "react";
import { message } from "antd";

export const GamesContext = createContext();

export const GamesProvider = (props) => {
  const [dataGames, setDataGames] = useState([]);
  const [fetchStatusGames, setFetchStatusGames] = useState(true);
  const [currentIdGames, setCurrentIdGames] = useState(-1);
  const [inputGames, setInputGames] = useState({
    name: "",
    genre: "",
    platform: "",
    release: "",
    image_url: "",
    singlePlayer: "",
    multiplayer: "",
  });

  const fetchDataGames = async () => {
    let { data } = await axios.get(
      `https://backendexample.sanbersy.com/api/data-game`
    );
    // console.log(data)
    let results = data.map((res) => {
      let {
        genre,
        id,
        image_url,
        multiplayer,
        name,
        platform,
        release,
        singlePlayer,
      } = res;

      return {
        id,
        name,
        genre,
        platform,
        release,
        image_url,
        singlePlayer,
        multiplayer,
      };
    });

    setDataGames([...results]);
  };

  const functionCreateUpdateGames = () => {
    let {
      name,
      genre,
      platform,
      release,
      image_url,
      singlePlayer,
      multiplayer,
    } = inputGames;

    if (currentIdGames === -1) {
      axios
        .post(
          ` https://backendexample.sanbersy.com/api/data-game`,
          {
            name,
            genre,
            platform,
            release,
            image_url,
            singlePlayer,
            multiplayer,
          },
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((resData) => {
          setFetchStatusGames(true);
          setTimeout(() => {
            message.success("Success Add Data");
          }, 500);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-game/${currentIdGames}`,
          {
            name,
            genre,
            platform,
            release,
            image_url,
            singlePlayer,
            multiplayer,
          },
          {
            headers: { Authorization: "Bearer " + Cookies.get("token") },
          }
        )
        .then((resData) => {
          setFetchStatusGames(true);
          setTimeout(() => {
            message.success("Success Edit Data");
          }, 500);
        });
    }
    setInputGames({
      name: "",
      genre: "",
      platform: "",
      release: "",
      image_url: "",
      singlePlayer: "",
      multiplayer: "",
    });
    setCurrentIdGames(-1);
  };

  const functionEditGames = (idGames) => {
    axios
      .get(`https://backendexample.sanbersy.com/api/data-game/${idGames}`)
      .then((res) => {
        let data = res.data;
        setInputGames({
          name: data.name,
          genre: data.genre,
          platform: data.platform,
          release: data.release,
          image_url: data.image_url,
          singlePlayer: data.singlePlayer,
          multiplayer: data.multiplayer,
        });
        setCurrentIdGames(data.id);
        setFetchStatusGames(true);
      });
  };

  const functionDeleteGames = (idGames) => {
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${idGames}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then(() => {
        setFetchStatusGames(true);
        setTimeout(() => {
          message.success("Success Delete Data");
        }, 500);
      });
  };

  const functionsGames = {
    fetchDataGames,
    functionCreateUpdateGames,
    functionEditGames,
    functionDeleteGames,
  };

  return (
    <GamesContext.Provider
      value={{
        dataGames,
        setDataGames,
        fetchStatusGames,
        setFetchStatusGames,
        currentIdGames,
        setCurrentIdGames,
        inputGames,
        setInputGames,
        functionsGames,
      }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};
