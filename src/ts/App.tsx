import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PlayerSessionService } from "./services/PlayerSessionService";
import { PlayerData } from "./services/PlayerSessionUtil";
import ClassicLifeTracker from "./ClassLifeTracker";
import ClassicTrackerMenu from "./ClassicTrackerMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (): ReactElement => {
  var sessionService = new PlayerSessionService();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [startingHealth, setStartingHealth] = useState<number>(40);
  const [hasCustomHealth, setHasCustomHealth] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPlayers(): Promise<void> {
      var newPlayers = await sessionService.getPlayersFromSessionId();
      setPlayers(newPlayers);
    }
    void fetchPlayers();
  }, []);

  return (
    <div className="w-full h-full bg-black">
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
            <ClassicTrackerMenu
              numPlayers={numPlayers}
              startingHealth={startingHealth}
              updateNumPlayersCallback={updateNumPlayers}
              updateStartingHealthCallback={updateStartingHealth}
              startGameCallback={startClassicGame}
              setCustomLifeTotalCallback={setCustomLifeTotal}
              hasCustomHealth={hasCustomHealth}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );

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
  }

  function setCustomLifeTotal(value: number) {
    setHasCustomHealth(true);
    setStartingHealth(value);
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
