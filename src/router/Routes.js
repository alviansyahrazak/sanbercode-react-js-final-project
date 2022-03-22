import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Cookies from "js-cookie";
import LayoutComponent from "../layout/LayoutComponent";
import Home from "../pages/HomePage";
import Movies from "../pages/MoviesPage";
import Games from "../pages/GamesPage";
import Register from "../pages/Register";
import Login from "../auth/Login";
import { UserProvider } from "../context/UserContext";
import AddGames from "../pages/AddGames";
import AddMovies from "../pages/AddMovies";
import MoviesList from "../pages/MoviesList";
import { MoviesProvider } from "../context/MoviesContext";
import { GamesProvider } from "../context/GamesContext";
import GamesList from "../pages/GamesList";
import ChangePassword from "../pages/ChangePassword";
import MovieDetail from "../pages/MovieDetail";
import GameDetail from "../pages/GameDetail";

const Routes = () => {
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Redirect path="/" />;
    } else {
      return <Route {...props} />;
    }
  };
  return (
    <Router>
      <UserProvider>
        <MoviesProvider>
          <GamesProvider>
            <Switch>
              <LoginRoute path={"/register"} exact>
                <LayoutComponent content={<Register />} />
              </LoginRoute>
              <LoginRoute path={"/login"} exact>
                <LayoutComponent content={<Login />} />
              </LoginRoute>
              <Route path={"/"} exact>
                <LayoutComponent content={<Home />} />
              </Route>
              <Route path={"/movies"} exact>
                <LayoutComponent content={<Movies />} />
              </Route>
              <Route path={"/games"} exact>
                <LayoutComponent content={<Games />} />
              </Route>
              <Route path={"/movies-list"} exact>
                <LayoutComponent content={<MoviesList />} />
              </Route>
              <Route path={"/detail-movie/:movieslug"} exact>
                <LayoutComponent content={<MovieDetail />} />
              </Route>
              <Route path={"/add-movies"} exact>
                <LayoutComponent content={<AddMovies />} />
              </Route>
              <Route path={"/add-movies/edit/:id"} exact>
                <LayoutComponent content={<AddMovies />} />
              </Route>
              <Route path={"/games-list"} exact>
                <LayoutComponent content={<GamesList />} />
              </Route>
              <Route path={"/detail-game/:gameslug"} exact>
                <LayoutComponent content={<GameDetail />} />
              </Route>
              <Route path={"/add-games"} exact>
                <LayoutComponent content={<AddGames />} />
              </Route>
              <Route path={"/add-games/edit/:id"} exact>
                <LayoutComponent content={<AddGames />} />
              </Route>
              <Route path={"/change-password"} exact>
                <LayoutComponent content={<ChangePassword />} />
              </Route>
            </Switch>
          </GamesProvider>
        </MoviesProvider>
      </UserProvider>
    </Router>
  );
};

export default Routes;
