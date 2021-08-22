import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PlayerTile from "./PlayerTile";
import { PlayerSessionService } from "./services/PlayerSessionService";
import { PlayerData } from "./services/PlayerSessionUtil";

const App = () => {
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
    <div className="w-full h-full flex flex-col">
      <h1>Life Linked</h1>
      <div className="flex flex-wrap flex-1">{players.map(renderPlayer)}</div>
    </div>
  );

  function renderPlayer({ id, name, health }: PlayerData): ReactElement {
    return (
      <PlayerTile
        key={id}
        name={name}
        health={health}
        decrementHealthCallback={() => decrementHealth(id)}
        incrementHealthCallback={() => incrementHealth(id)}
      />
    );
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
};

ReactDOM.render(<App />, document.getElementById("root"));
