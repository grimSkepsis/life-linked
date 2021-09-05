import { ReactElement } from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";

type Props = {
  startingHealth: number;
  numPlayers: number;
  updateStartingHealthCallback: (health: number) => void;
  updateNumPlayersCallback: (numPlayers: number) => void;
  startGameCallback: () => void;
};

const ClassicTrackerMenu = ({
  startingHealth,
  numPlayers,
  updateNumPlayersCallback,
  updateStartingHealthCallback,
  startGameCallback,
}: Props): ReactElement => {
  var renderHealthOption = R.curry(renderOption)("startingHealth");
  var renderPlayerOption = R.curry(renderOption)("numPlayers");
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-white inline-block">
        <p>Num Players: </p>
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
        <p className="mt-5">Starting Life: </p>
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
          {renderHealthOption("Custom")(
            !isStandardHealthAmount(startingHealth)
          )(() => updateStartingHealthCallback(50))}
        </div>
        <Link to="/classic-tracker">
          <button className="bg-blue-500 mt-5" onClick={startGameCallback}>
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );

  function renderOption(
    name: string,
    value: string,
    isChecked: boolean,
    callBack: () => void
  ): ReactElement {
    return (
      <div>
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

  function isStandardHealthAmount(health: number): boolean {
    return health == 20 || health == 30 || health == 40;
  }
};

export default ClassicTrackerMenu;
