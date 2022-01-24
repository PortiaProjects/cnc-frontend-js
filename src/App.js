import React, { useState, useEffect } from "react";

export default function App() {
  const [list, setList] = useState(true);
  const [card, setCard] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/tracks/list")
      .then((response) => response.json())
      .then((responseJson) => {
        setTracks(responseJson.data);
      });
  }, []);

  let showCard = (id) => {
    fetch(`http://localhost:3001/tracks/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setTrack(responseJson.data);
        setList(false);
        setCard(true);
      });
  };

  let showList = () => {
    setCard(false);
    setList(true);
  };

  return (
    <div className="App" align="center">
      <h1>ClicknClear Tracklist</h1>
      <div className="container">
        {list ? (
          <div className="list-group">
            {tracks.map((track) => (
              <li
                onClick={() => showCard(track.id)}
                className="list-group-item list-group-item-action"
              >
                Track {track.id}
              </li>
            ))}
          </div>
        ) : null}
        {card ? (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <p class="card-text">Track {track.id}</p>
              <h5 class="card-title">{track.title}</h5>
              <p class="card-text">{track.artist}</p>
              <div onClick={() => showList()} class="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
