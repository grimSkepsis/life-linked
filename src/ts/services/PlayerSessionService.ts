import { PlayerData, getFakePlayerData } from "./PlayerSessionUtil";

export class PlayerSessionService {
  public getPlayersFromSessionId(): Promise<PlayerData[]> {
    return new Promise(function fetchPlayers(resolve) {
      setTimeout(() => resolve(getFakePlayerData()), 10);
    });
  }
}
