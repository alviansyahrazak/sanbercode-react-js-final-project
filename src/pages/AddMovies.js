import React, { useContext } from "react";
import { Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { MoviesContext } from "../context/MoviesContext";

import { useHistory } from "react-router-dom";

const AddMovies = () => {
  const { inputMovies, setInputMovies, functionsMovies } =
    useContext(MoviesContext);

  const { functionCreateUpdateMovies } = functionsMovies;

  let history = useHistory();

  const handleChangeMovies = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputMovies({ ...inputMovies, [name]: value });
  };

  const handleSubmitMovies = (event) => {
    event.preventDefault();
    history.push(`/movies-list`);

    functionCreateUpdateMovies();
  };

  return (
    <>
      <div className="add-movies-container">
        <h1 className="h1-header-form-add-movies">Form Add Movies</h1>
        <form
          className="form-add-movies-container"
          onSubmit={handleSubmitMovies}
        >
          <div className="label-input-form-add-movies">
            <label>Title</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="text"
                required
                value={inputMovies.title}
                name="title"
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Description</label>
            <div className="input-form-add-movies">
              <TextArea
                onChange={handleChangeMovies}
                required
                value={inputMovies.description}
                name="description"
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Year</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="number"
                required
                value={inputMovies.year}
                name="year"
                min={1980}
                max={2021}
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Duration</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="number"
                required
                value={inputMovies.durationMovies}
                name="duration"
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Rating</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="number"
                required
                value={inputMovies.rating}
                name="rating"
                min={0}
                max={10}
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Genre</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="text"
                required
                value={inputMovies.genreMovies}
                name="genre"
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Review</label>
            <div className="input-form-add-movies">
              <TextArea
                onChange={handleChangeMovies}
                required
                value={inputMovies.review}
                name="review"
              />
            </div>
          </div>

          <div className="label-input-form-add-movies">
            <label>Image Url</label>
            <div className="input-form-add-movies">
              <Input
                onChange={handleChangeMovies}
                type="text"
                required
                value={inputMovies.image_url}
                name="image_url"
              />
            </div>
          </div>

          <Button className="add-movies-btn" type="primary" htmlType="submit">
            Add Movies
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddMovies;
