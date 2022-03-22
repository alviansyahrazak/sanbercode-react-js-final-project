import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { GamesContext } from "../context/GamesContext";

import axios from "axios";

const GamesList = () => {
  const {
    dataGames,
    setDataGames,
    fetchStatusGames,
    setFetchStatusGames,
    functionsGames,
  } = useContext(GamesContext);

  const { fetchDataGames, functionEditGames, functionDeleteGames } =
    functionsGames;

  let history = useHistory();

  useEffect(() => {
    if (fetchStatusGames) {
      fetchDataGames();
      setFetchStatusGames(false);
    }
  }, [fetchDataGames, fetchStatusGames, setFetchStatusGames]);

  const handleEditGames = (event) => {
    let idGames = parseInt(event.target.value);
    history.push(`/add-games/edit/${idGames}`);
    functionEditGames(idGames);
  };

  const handleDeleteGames = (event) => {
    let idGames = parseInt(event.target.value);
    functionDeleteGames(idGames);
  };

  /*==================Search=====================*/

  const [searchGames, setSearchGames] = useState("");
  const handleSearchGames = (event) => {
    setSearchGames(event.target.value);
  };

  /*==================Filter=====================*/

  const [filterGames, setFilterGames] = useState({
    year: "",
    duration: "",
    rating: "",
  });

  const handleChangefilterGames = (event) => {
    let value = event.target.value;

    setFilterGames(value);
  };

  const handleFilterGames = (event) => {
    event.preventDefault();

    let filterDataGames = async () => {
      let { data } = await axios.get(
        "https://backendexample.sanbersy.com/api/data-game"
      );
      let filterOnData = data.filter((res) => {
        return Object.values(res)
          .join(" ")
          .toLowerCase()
          .includes(filterGames.toLowerCase());
      });

      // console.log(filterOnData);

      setDataGames([...filterOnData]);
    };
    filterDataGames();
    setFilterGames({ platform: "", genre: "", release: "" });
  };

  //handle text
  const handleTextGames = (param) => {
    if (param === null) {
      return "";
    } else {
      return param.slice(0, 30) + "";
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image_url",
      render: (res) => (
        <img width={50} height={50} style={{ objectFit: "cover" }} src={res} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p>{handleTextGames(text)}</p>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      sorter: (a, b) => a.platform.length - b.platform.length,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      sorter: (a, b) => a.genre.length - b.genre.length,
    },
    {
      title: "Release",
      dataIndex: "release",
      sorter: (a, b) => a.release - b.release,
    },
    {
      title: "Single Player",
      dataIndex: "singlePlayer",
      render: (res) => <p>{res === 1 ? "Yes" : "No"}</p>,
      sorter: (a, b) => a.release.length - b.release.length,
    },
    {
      title: "Multiplayer",
      dataIndex: "multiplayer",
      render: (res) => <p>{res === 1 ? "Yes" : "No"}</p>,
      sorter: (a, b) => a.release.length - b.release.length,
    },
    {
      title: "Action",
      key: "action",
      render: (res, button) => (
        <div key={button} style={{ display: "flex" }}>
          <button className="games-list-btn" onClick={handleEditGames} value={res.id}>
            Edit
          </button>
          &nbsp;
          <button className="games-list-btn" onClick={handleDeleteGames} value={res.id}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data =
    dataGames &&
    dataGames.filter((val) => {
      if (searchGames === "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchGames.toLowerCase()))
        return val;
    });

  return (
    <>
      <div className="games-list-container">
        <h1 className="h1-header-games-list">Games List</h1>
        <div className="games-list-serach-filter-container">
          <div className="search-form-games-container">
            <h1 className="h1-search-games-list">Search Games</h1>
            <div className="search-form-games">
              <div className="search-input-form-games">
                <Input
                  onChange={handleSearchGames}
                  placeholder="Search by Name"
                  prefix={<SearchOutlined />}
                  type="text"
                  name="name"
                />
              </div>
            </div>
          </div>

          <div className="filter-form-games-container">
            <h1 className="h1-filter-games-list">Filter Games</h1>
            <form className="filter-form-games" onSubmit={handleFilterGames}>
              <div className="filter-input-form-games">
                <Input
                  onChange={handleChangefilterGames}
                  placeholder="Platform"
                  type="text"
                  required
                  value={filterGames.platform}
                  name="platform"
                />
              </div>
              <div className="filter-input-form-games">
                <Input
                  onChange={handleChangefilterGames}
                  placeholder="Genre"
                  type="text"
                  required
                  value={filterGames.genre}
                  name="genre"
                />
              </div>
              <div className="filter-input-form-games">
                <Input
                  onChange={handleChangefilterGames}
                  placeholder="Release"
                  required
                  type="text"
                  value={filterGames.release}
                  name="release"
                />
              </div>

              <Button
                className="games-list-filter-btn"
                type="primary"
                htmlType="submit"
              >
                Filter
              </Button>
            </form>
          </div>
          <div className="reset-games-list">
            <Button
              className="games-list-reset-btn"
              htmlType="submit"
              onClick={() => {
                setFetchStatusGames(true);
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default GamesList;
