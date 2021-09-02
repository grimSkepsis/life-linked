import { ReactElement } from "react";

const ClassicTrackerMenu = (): ReactElement => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-white inline-block">
        <p>Num Players: </p>
        <div className="flex">
          <input type="radio" id="two" name="numPlayers" value="two" />
          <label htmlFor="two"> Two</label>
          <input type="radio" id="three" name="numPlayers" value="three" />
          <label htmlFor="three"> Three</label>
          <input type="radio" id="four" name="numPlayers" value="four" />
          <label htmlFor="four"> Four</label>
          <input type="radio" id="five" name="numPlayers" value="five" />
          <label htmlFor="five"> Five</label>
          <input type="radio" id="six" name="numPlayers" value="six" />
          <label htmlFor="six"> Six</label>
        </div>
        <p className="mt-5">Starting Life: </p>
        <div className="flex">
          <input
            type="radio"
            id="twenty"
            name="startingHealth"
            value="twenty"
          />
          <label htmlFor="twenty"> Twenty</label>
          <input
            type="radio"
            id="thirty"
            name="startingHealth"
            value="thirty"
          />
          <label htmlFor="thirty"> Thirty</label>
          <input
            type="radio"
            id="fourty"
            name="startingHealth"
            value="fourty"
          />
          <label htmlFor="fourty"> Fourty</label>
          <input
            type="radio"
            id="custom"
            name="startingHealth"
            value="custom"
          />
          <label htmlFor="custom"> Custom</label>
        </div>
        <button className="bg-blue-500 mt-5">Start Game</button>
      </div>
    </div>
  );
};

export default ClassicTrackerMenu;
