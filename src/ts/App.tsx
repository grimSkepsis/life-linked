import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PlayerSessionService } from "./services/PlayerSessionService";
import { PlayerData } from "./services/PlayerSessionUtil";
import ClassicLifeTracker from "./ClassLifeTracker";

const App = (): ReactElement => {
  var sessionService = new PlayerSessionService();

  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    async function fetchPlayers(): Promise<void> {
      var newPlayers = await sessionService.getPlayersFromSessionId();
      setPlayers(newPlayers);
    }
    void fetchPlayers();
  }, []);

  return (
    <div className="w-full h-full bg-black">
      <ClassicLifeTracker
        playerData={players}
        decrementHealthCallback={decrementHealth}
        incrementHealthCallback={incrementHealth}
      />
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
};

ReactDOM.render(<App />, document.getElementById("root"));
