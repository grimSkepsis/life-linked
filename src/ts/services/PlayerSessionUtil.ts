export type PlayerData = {
  id: string;
  name: string;
  health: number;
};

const NUM_PLAYERS = 4;

export function getFakePlayerData(): PlayerData[] {
  var players: PlayerData[] = [];
  for (let i = 0; i < NUM_PLAYERS; i++) {
    players.push({
      id: String(i),
      name: `Player ${i}`,
      health: 40,
    });
  }
  return players;
}
