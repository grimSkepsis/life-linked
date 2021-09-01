import { ReactElement } from "react";
import { PlayerData } from "./services/PlayerSessionUtil";
import PlayerTile from "./PlayerTile";

type Props = {
  playerData: PlayerData[];
  decrementHealthCallback: (id: string) => void;
  incrementHealthCallback: (id: string) => void;
};

const ClassicLifeTracker = ({
  playerData,
  decrementHealthCallback,
  incrementHealthCallback,
}: Props): ReactElement => {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-white">Life Linked</h1>
      <div className="flex flex-wrap flex-1 classic-tracker">
        {playerData.map(renderPlayer)}
      </div>
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
        decrementHealthCallback={() => decrementHealthCallback(id)}
        incrementHealthCallback={() => incrementHealthCallback(id)}
        sizeClass={getSizeClass(idx, playerData.length)}
        orientationClass={getOrientationClass(idx, playerData.length)}
      />
    );
  }

  function getOrientationClass(idx: number, numPlayers: number): string {
    const flippedRotation = "-rotate-180 flipped";
    const notFlipped = "not-flipped";
    var orientationClass = "";
    switch (numPlayers) {
      case 2:
        orientationClass = idx == 0 ? flippedRotation : notFlipped;
        break;
      case 3:
        orientationClass = idx <= 1 ? flippedRotation : notFlipped;
        break;
      case 4:
        orientationClass = idx <= 1 ? flippedRotation : notFlipped;
        break;
      case 5:
        orientationClass = idx <= 2 ? flippedRotation : notFlipped;
        break;
      default:
        orientationClass = idx <= 2 ? flippedRotation : notFlipped;
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
};

export default ClassicLifeTracker;