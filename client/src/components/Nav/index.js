import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Nav.scss";

export function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-nav">
        <Link className="navbar-brand" to="/">
          <img src="/images/reccoon-lg.png" alt="Recco logo" className="logo" />
        </Link>
        <Link to="/movies"
        className={props.currentPage === "Movies" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-movie"></i>
            <span className="nav-link__text">
              Movies{props.currentPage === "Movies" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/shows"
        className={props.currentPage === "Shows" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-show"></i>
            <span className="nav-link__text">
              Shows{props.currentPage === "Shows" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/books"
        className={props.currentPage === "Books" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-book"></i>
            <span className="nav-link__text">
              Books{props.currentPage === "Books" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/music"
        className={props.currentPage === "Music" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-music"></i>
            <span className="nav-link__text">
              Music{props.currentPage === "Music" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/games"
        className={props.currentPage === "Games" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-game"></i>
            <span className="nav-link__text">
              Games{props.currentPage === "Games" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/friends"
        className={props.currentPage === "Friends" ? "nav-link ml-auto active" : "nav-link ml-auto"}>
          <div className="nav-link__tab">
            <span className="nav-link__text">
              Friends{props.currentPage === "Friends" ? <span className="sr-only"> (current)</span> : ""}
            </span>
            <i className="icon icon-users"></i>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
