import { ReactElement } from "react";

type Props = {
  name: string;
  health: number;
  decrementHealthCallback: () => void;
  incrementHealthCallback: () => void;
  sizeClass: string;
  orientationClass: string;
};

const PlayerTile = ({
  name,
  health,
  decrementHealthCallback,
  incrementHealthCallback,
  sizeClass,
  orientationClass,
}: Props): ReactElement => {
  return (
    <div
      className={`${sizeClass} ${orientationClass} transform flex-grow h-auto flex justify-center items-center`}
    >
      <div className="flex flex-col justify-center">
        <div className="text-center mb-2">{name}</div>
        <div className="flex">
          <button
            onClick={decrementHealthCallback}
            className="w-6 h-8 overflow-hidden inline-block cursor-pointer"
          >
            <div className="h-16  bg-red-500 -rotate-45  hover:bg-red-800  transform origin-top-right"></div>
          </button>
          <div className="mx-2 text-2xl">{health}</div>
          <button
            onClick={incrementHealthCallback}
            className="w-6 h-8 overflow-hidden inline-block cursor-pointer"
          >
            <div className="h-16 bg-red-500 rotate-45 hover:bg-red-800 transform origin-top-left"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerTile;
