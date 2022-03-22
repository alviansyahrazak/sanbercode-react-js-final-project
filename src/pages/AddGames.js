import React, { useContext } from "react";
import { Input, Button } from "antd";
import { GamesContext } from "../context/GamesContext";
import { useHistory } from "react-router-dom";

const AddGames = () => {
  const { inputGames, setInputGames, functionsGames } =
    useContext(GamesContext);

  const { functionCreateUpdateGames } = functionsGames;

  let history = useHistory();

  const handleChangeGames = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let modeGames = ["singlePlayer", "multiplayer"];

    if (modeGames.indexOf(name) === -1) {
      setInputGames({ ...inputGames, [name]: value });
    } else {
      setInputGames({ ...inputGames, [name]: !inputGames[name] });
    }
  };

  const handleSubmitGames = (event) => {
    event.preventDefault();
    // console.log(inputGames);
    history.push(`/games-list`);

    functionCreateUpdateGames();
  };

  return (
    <>
      <div className="add-games-container">
        <h1 className="h1-header-form-add-games">Form Add Games</h1>
        <form className="form-add-games-container" onSubmit={handleSubmitGames}>
          <div className="label-input-form-add-games">
            <label>Name</label>
            <div className="input-form-add-games">
              <Input
                className=""
                onChange={handleChangeGames}
                type="text"
                required
                value={inputGames.name}
                name="name"
              />
            </div>
          </div>

          <div className="label-input-form-add-games">
            <label>Genre</label>
            <div className="input-form-add-games">
              <Input
      
                onChange={handleChangeGames}
                type="text"
                required
                value={inputGames.genre}
                name="genre"
              />
            </div>
          </div>

          <div className="label-input-form-add-games">
            <label>Platform</label>
            <div className="input-form-add-games">
              <Input
             
                onChange={handleChangeGames}
                type="text"
                required
                value={inputGames.platform}
                name="platform"
              />
            </div>
          </div>

          <div className="label-input-form-add-games">
            <label>Release</label>
            <div className="input-form-add-games">
              <Input
            
                onChange={handleChangeGames}
                type="number"
                required
                value={inputGames.release}
                name="release"
                min={"2000"}
                max={"2021"}
              />
            </div>
          </div>

          <div className="label-input-form-add-games">
            <label>Image Url</label>
            <div className="input-form-add-games">
              <Input
     
                onChange={handleChangeGames}
                type="text"
                required
                value={inputGames.image_url}
                name="image_url"
              />
            </div>
          </div>

          <label>Mode</label>
          <div className="label-input-games-player">
            <div className="label-input-radio-form-add-games">
              <div className="input-radio-form-add-games-container">
                <div className="input-radio-form-add-games">
                  <input
                    className="radio-games-player"
                    onChange={handleChangeGames}
                    type="checkbox"
                    id="singlePlayer"
                    checked={inputGames.singlePlayer}
                    name="singlePlayer"
                  />
                  <label>Single Player</label>
                </div>
              </div>
            </div>
            <div className="label-input-radio-form-add-games">
              <div className="input-radio-form-add-games-container">
                <div className="input-radio-form-add-games">
                  <input
                    className="radio-games-player"
                    onChange={handleChangeGames}
                    type="checkbox"
                    id="multiplayer"
                    checked={inputGames.multiplayer}
                    name="multiplayer"
                  />
                  <label>Multi Player</label>
                </div>
              </div>
            </div>
          </div>

          <Button className="add-games-btn" type="primary" htmlType="submit">
            Add Games
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddGames;
