import { ReactElement } from "react";

type props = {
  name: string;
  health: number;
};

const PlayerTile = (props: props): ReactElement => {
  return <div className="w-50">test me {props.name}</div>;
};

export default PlayerTile;
