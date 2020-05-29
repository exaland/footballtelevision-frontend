import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../config" 
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Momeentfr from "moment-fr"
export function dateFrance({date}) {
  return Momeentfr(date).format('Do MMMM YYYY, h:mm:ss a')
}

function Match() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://204.48.23.93/matches")
      .then(res => {
        setMatches(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredMatches(
      matches.filter(matchs =>
        matchs.match.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, matches]);

  if (loading) {
    return <p>Chargement des Matchs...</p>;
  }

  return (
    <div className="App">
      <h1>FOOTBALL TELEVISION</h1>
      <p>
        SITE EN CONSTRUCTION POUR OBTENIR TOUS LES MATCHS DE FOOTBALL{" "}
        <a
          style={{ color: "red" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.exaland.fr/"
        >
          UNE PRODUCTION EXALAND CONCEPT
        </a>
      </p>
      <input
        type="text"
        placeholder="Rechercher un Match"
        onChange={e => setSearch(e.target.value)}
      />
      {filteredMatches.map((matchs, idx) => (
        <MatchsDetail key={idx} {...matchs} />
      ))}
    </div>
  );
}

const MatchsDetail = props => {
  const { match, chaines, datematch } = props;
  console.log(props)
  return (
    <>
      <p>
        <img src={API_URL + chaines.logo.url} alt={match} style={{ width: "80px", height: "90px" }} />
      </p>
      <div className="datematch">
      <span className="badge badge-primary">{dateFrance(datematch)}</span>
      </div>
      <p className="alert alert-primary">{match}</p>
    </>
  );
};

export default Match;