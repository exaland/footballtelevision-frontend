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

function Emissions() {
  const [emissions, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://204.48.23.93/emissions")
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
      emissions.filter(emissions =>
        emissions.titre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, emissions]);

  if (loading) {
    return <p>Chargement des Emissions...</p>;
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
        placeholder="Rechercher une Emission"
        onChange={e => setSearch(e.target.value)}
      />
      {filteredMatches.map((matchs, idx) => (
        <EmissionsDetails key={idx} {...matchs} />
      ))}
    </div>
  );
}

const EmissionsDetails = props => {
  const { titre, presentateur,image, datematch } = props;
  console.log(props)
  return (
    <>
      <p>
        <img src={API_URL + image.url} alt={titre} style={{ width: "80px", height: "90px" }} />
      </p>
      <div className="datematch">
      <span className="badge badge-primary">Présentateur : {presentateur}</span>
      </div>
      <p className="alert alert-primary">{titre}</p>
    </>
  );
};

export default Emissions;