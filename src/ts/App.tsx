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

  function renderPlayer(
    { id, name, health }: PlayerData,
    idx: number
  ): ReactElement {
    return (
      <PlayerTile
        key={id}
        name={name}
        health={health}
        decrementHealthCallback={() => decrementHealth(id)}
        incrementHealthCallback={() => incrementHealth(id)}
        sizeClass={getSizeClass(idx, players.length)}
        orientationClass={getOrientationClass(idx, players.length)}
      />
    );
  }

  function getOrientationClass(idx: number, numPlayers: number): string {
    const flippedRotation = "-rotate-180";
    var orientationClass = "";
    switch (numPlayers) {
      case 2:
        orientationClass = idx == 0 ? flippedRotation : "";
        break;
      case 3:
        orientationClass = idx <= 1 ? flippedRotation : "";
        break;
      case 4:
        orientationClass = idx <= 1 ? flippedRotation : "";
        break;
      case 5:
        orientationClass = idx <= 2 ? flippedRotation : "";
        break;
      default:
        orientationClass = idx <= 2 ? flippedRotation : "";
    }
    return orientationClass;
  }

  function getSizeClass(idx: number, numPlayers: number): string {
    var sizeClass = "";
    switch (numPlayers) {
      case 2:
        sizeClass = "w-full";
        break;
      case 3:
        sizeClass = "w-1/2";
        break;
      case 4:
        sizeClass = "w-1/2";
        break;
      case 5:
        sizeClass = "w-1/3";
        break;
      default:
        sizeClass = "w-1/3";
    }
    return sizeClass;
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
