import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PlayerSessionService } from "./services/PlayerSessionService";
import { PlayerData } from "./services/PlayerSessionUtil";
import ClassicLifeTracker from "./ClassLifeTracker";
import ClassicTrackerMenu from "./ClassicTrackerMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "../../node_modules/axios/index";

const App = (): ReactElement => {
  var sessionService = new PlayerSessionService();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [startingHealth, setStartingHealth] = useState<number>(40);
  const [hasCustomHealth, setHasCustomHealth] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomPass, setRoomPass] = useState<string>("");

  useEffect(() => {
    async function fetchPlayers(): Promise<void> {
      var newPlayers = await sessionService.getPlayersFromSessionId();
      setPlayers(newPlayers);
    }
    void fetchPlayers();
  }, []);

  return (
    <div className="w-full h-full app-bg text-white">
      <Router>
        <Switch>
          <Route path="/classic-tracker">
            <ClassicLifeTracker
              playerData={players}
              incrementHealthCallback={incrementHealth}
              decrementHealthCallback={decrementHealth}
            />
          </Route>
          <Route path="/">
            {/* <ClassicTrackerMenu
              numPlayers={numPlayers}
              startingHealth={startingHealth}
              updateNumPlayersCallback={updateNumPlayers}
              updateStartingHealthCallback={updateStartingHealth}
              startGameCallback={startClassicGame}
              setCustomLifeTotalCallback={setCustomLifeTotal}
              hasCustomHealth={hasCustomHealth}
            /> */}
            <div className="flex flex-col w-1/2 m-auto h-full justify-center">
              <label htmlFor="room-name">Room name</label>
              <input
                type="text"
                className="text-black"
                onChange={handleRoomNameChange}
                name="room-name"
                id="room-name"
              />

              <label htmlFor="room-pass" className="mt-5">
                Room pass
              </label>
              <input
                type="text"
                onChange={handleRoomPassChange}
                className="text-black"
                name="room-pass"
                id="room-pass"
              />
              <button className="btn mt-5" onClick={handleCreateRoom}>
                create room
              </button>
              <input type="submit" className="btn mt-5" value="join" />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );

  function handleCreateRoom(): void {
    console.log("axios", axios);
    axios
      .post("http://localhost:3001/api/create-room", {
        name: roomName,
        pass: roomPass,
      })
      .then(() => {
        alert("successful insert");
      });
  }

  function handleRoomNameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRoomName(event.target.value);
  }

  function handleRoomPassChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRoomPass(event.target.value);
  }

  function decrementHealth(id: string): void {
    var newPlayers: PlayerData[] = [...players] ?? [];
    var playerToBeModified = newPlayers.find((player) => player.id == id);
    if (playerToBeModified) {
      playerToBeModified.health--;
    }
    setPlayers(newPlayers);
  }
  function incrementHealth(id: string): void {
    var newPlayers: PlayerData[] = [...players] ?? [];
    var playerToBeModified = newPlayers.find((player) => player.id == id);
    if (playerToBeModified) {
      playerToBeModified.health++;
    }
    setPlayers(newPlayers);
  }

  function updateNumPlayers(numPlayers: number): void {
    setNumPlayers(numPlayers);
  }
  function updateStartingHealth(health: number): void {
    setHasCustomHealth(false);
    setStartingHealth(health);
  }

  function startClassicGame(): void {
    var classicPlayers: PlayerData[] = [];
    for (let i = 0; i < numPlayers; i++) {
      classicPlayers.push({
        id: String(i),
        name: `Player ${i}`,
        health: startingHealth,
      });
    }
    setPlayers(classicPlayers);
    document.getElementById("root")?.requestFullscreen();
  }

  function setCustomLifeTotal(value: number) {
    setHasCustomHealth(true);
    setStartingHealth(value);
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
