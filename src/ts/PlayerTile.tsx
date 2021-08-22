import { ReactElement } from "react";

type Props = {
  name: string;
  health: number;
};

const PlayerTile = ({ name, health }: Props): ReactElement => {
  return (
    <div className="w-1/2 h-auto flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="text-center mb-2">{name}</div>
        <div className="flex">
          <div className="w-6 overflow-hidden inline-block cursor-pointer">
            <div className=" h-16  bg-red-500 -rotate-45  hover:bg-red-800  transform origin-top-right"></div>
          </div>
          <div className="mx-2 text-2xl">{health}</div>
          <div className="w-6 overflow-hidden inline-block cursor-pointer">
            <div className="h-16 bg-red-500 rotate-45 hover:bg-red-800 transform origin-top-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTile;
