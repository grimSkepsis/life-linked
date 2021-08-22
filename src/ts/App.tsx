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
    <div>
      <h1>Test title</h1>
      {players.map(renderPlayer)}
    </div>
  );

  function renderPlayer({ id, name, health }: PlayerData): ReactElement {
    return <PlayerTile key={id} name={name} health={health} />;
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
