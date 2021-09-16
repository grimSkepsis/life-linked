import { ReactElement } from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";

type Props = {
  startingHealth: number;
  numPlayers: number;
  hasCustomHealth: boolean;
  updateStartingHealthCallback: (health: number) => void;
  updateNumPlayersCallback: (numPlayers: number) => void;
  startGameCallback: () => void;
  setCustomLifeTotalCallback: (health: number) => void;
};

const ClassicTrackerMenu = ({
  startingHealth,
  numPlayers,
  updateNumPlayersCallback,
  updateStartingHealthCallback,
  startGameCallback,
  setCustomLifeTotalCallback,
  hasCustomHealth,
}: Props): ReactElement => {
  var renderHealthOption = R.curry(renderOption)("startingHealth");
  var renderPlayerOption = R.curry(renderOption)("numPlayers");
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-white inline-block">
        <p className="menu-title">Num Players: </p>
        <div className="flex">
          {renderPlayerOption("Two")(numPlayers == 2)(() =>
            updateNumPlayersCallback(2)
          )}
          {renderPlayerOption("Three")(numPlayers == 3)(() =>
            updateNumPlayersCallback(3)
          )}
          {renderPlayerOption("Four")(numPlayers == 4)(() =>
            updateNumPlayersCallback(4)
          )}
          {renderPlayerOption("Five")(numPlayers == 5)(() =>
            updateNumPlayersCallback(5)
          )}
          {renderPlayerOption("Six")(numPlayers == 6)(() =>
            updateNumPlayersCallback(6)
          )}
        </div>
        <p className="mt-5 menu-title">Starting Life: </p>
        <div className="flex">
          {renderHealthOption("Twenty")(startingHealth == 20)(() =>
            updateStartingHealthCallback(20)
          )}
          {renderHealthOption("Thirty")(startingHealth == 30)(() =>
            updateStartingHealthCallback(30)
          )}
          {renderHealthOption("Fourty")(startingHealth == 40)(() =>
            updateStartingHealthCallback(40)
          )}
          {renderHealthOption("Custom")(hasCustomHealth)(() =>
            setCustomLifeTotalCallback(50)
          )}
        </div>
        {hasCustomHealth ? (
          <div className="text-black">
            <input
              type="text"
              value={startingHealth}
              onChange={onSetCustomHealth}
            />
          </div>
        ) : null}

        <Link to="/classic-tracker">
          <button className="mt-5 btn" onClick={startGameCallback}>
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );

  function onSetCustomHealth(event: React.ChangeEvent<HTMLInputElement>): void {
    setCustomLifeTotalCallback(Number(event.target.value));
  }

  function renderOption(
    name: string,
    value: string,
    isChecked: boolean,
    callBack: () => void
  ): ReactElement {
    return (
      <div className="menu-option">
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          checked={isChecked}
          onClick={callBack}
        />
        <label htmlFor={value}> {value}</label>
      </div>
    );
  }
};

export default ClassicTrackerMenu;
