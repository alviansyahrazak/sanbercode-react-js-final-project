import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";

import axios from "axios";

const MoviesList = () => {
  const {
    dataMovies,
    setDataMovies,
    fetchStatusMovies,
    setFetchStatusMovies,
    functionsMovies,
  } = useContext(MoviesContext);

  const { fetchDataMovies, functionEditMovies, functionDeleteMovies } =
    functionsMovies;

  let history = useHistory();

  useEffect(() => {
    if (fetchStatusMovies) {
      fetchDataMovies();
      setFetchStatusMovies(false);
    }
  }, [fetchDataMovies, fetchStatusMovies, setFetchStatusMovies]);

  const handleEditMovies = (event) => {
    let idMovies = parseInt(event.target.value);
    history.push(`/add-movies/edit/${idMovies}`);
    functionEditMovies(idMovies);
  };

  const handleDeleteMovies = (event) => {
    let idMovies = parseInt(event.target.value);
    functionDeleteMovies(idMovies);
  };

  /*==================Search=====================*/

  const [searchMovies, setSearchMovies] = useState("");
  const handleSearchMovies = (event) => {
    setSearchMovies(event.target.value);
  };

  /*==================Filter=====================*/

  const [filterMovies, setFilterMovies] = useState({
    year: "",
    duration: "",
    rating: "",
  });

  const handleChangeFilterMovies = (event) => {
    let { value, name } = event.target;

    setFilterMovies({ ...filterMovies, [name]: value });
  };

  const handleFilter = (event) => {
    event.preventDefault();

    let { year, duration, rating } = filterMovies;

    let filterDataMovies = async () => {
      let { data } = await axios.get(
        "https://backendexample.sanbersy.com/api/data-movie"
      );
      let filterOnData = data.filter((res) => {
        return (
          res.year === parseInt(year) &&
          res.duration === parseInt(duration) &&
          res.rating === parseInt(rating)
        );
      });

      // console.log(filterOnData);

      setDataMovies([...filterOnData]);
    };
    filterDataMovies();
    setFilterMovies({ year: "", duration: "", rating: "" });
  };

  //handle text
  const handleTextMovies = (param) => {
    if (param === null) {
      return "";
    } else {
      return param.slice(0, 20) + "...";
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image_url",
      render: (res) => (
        <img
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
          src={res}
          alt="image_list"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <p>{handleTextMovies(text)}</p>,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      render: (text) => <p>{handleTextMovies(text)}</p>,
      sorter: (a, b) => a.genre.length - b.genre.length,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Review",
      dataIndex: "review",
      render: (text) => <p>{handleTextMovies(text)}</p>,
      sorter: (a, b) => a.review.length - b.review.length,
    },
    {
      title: "Action",
      key: "action",
      render: (res, button) => (
        <div key={button} style={{ display: "flex" }}>
          <button
            className="movies-list-btn"
            onClick={handleEditMovies}
            value={res.id}
          >
            Edit
          </button>
          &nbsp;
          <button
            className="movies-list-btn"
            onClick={handleDeleteMovies}
            value={res.id}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data =
    dataMovies &&
    dataMovies.filter((val) => {
      if (searchMovies === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchMovies.toLowerCase()))
        return val;
    });

  return (
    <>
      <div className="movies-list-container">
        <h1 className="h1-header-movies-list">Movies List</h1>
        <div className="movies-list-serach-filter-container">
          <div className="search-form-movies-container">
            <h1 className="h1-search-movies-list">Search Movies</h1>
            <div className="search-form-movies">
              <div className="search-input-form-movies">
                <Input
                  onChange={handleSearchMovies}
                  placeholder="Search by Title"
                  prefix={<SearchOutlined />}
                  required
                  type="text"
                  name="title"
                />
              </div>
            </div>
          </div>

          <div className="filter-form-movies-container">
            <h1 className="h1-filter-movies-list">Filter Movies</h1>
            <form className="filter-form-movies" onSubmit={handleFilter}>
              <div className="filter-input-form-movies">
                <Input
                  onChange={handleChangeFilterMovies}
                  placeholder="Year"
                  type="number"
                  required
                  value={filterMovies.year}
                  name="year"
                />
              </div>

              <div className="filter-input-form-movies">
                <Input
                  onChange={handleChangeFilterMovies}
                  placeholder="Duration"
                  type="text"
                  required
                  value={filterMovies.duration}
                  name="duration"
                />
              </div>
              <div className="filter-input-form-movies">
                <Input
                  onChange={handleChangeFilterMovies}
                  placeholder="Rating"
                  required
                  type="number"
                  value={filterMovies.rating}
                  name="rating"
                />
              </div>

              <Button
                className="movies-list-filter-btn"
                type="primary"
                htmlType="submit"
              >
                Filter
              </Button>
            </form>
          </div>
          <div className="reset-movies-list">
            <Button
              className="movies-list-reset-btn"
              htmlType="submit"
              onClick={() => {
                setFetchStatusMovies(true);
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

export default MoviesList;
