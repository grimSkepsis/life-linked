import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";
import { io, Socket } from "socket.io-client";

type Props = {};
const socket: Socket = io("http://localhost:3004");
const CreateOrJoinRoomMenu = (): ReactElement => {
  const [roomName, setRoomName] = useState<string>("");
  const [roomPass, setRoomPass] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    socket.on("room-already-exists", (data) => {
      alert(data);
    });

    socket.on("room-join-error", (data) => {
      alert(data);
    });

    socket.on("room-create-success", (data) => {
      console.log(data);
    });

    socket.on("room-join-success", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-auto text-white w-1/4">
        <label htmlFor="user-name" className="mt-5">
          Username
        </label>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          className="text-black"
          name="user-name"
          id="user-name"
        />
        <label htmlFor="room-name" className="mt-5">
          Room name
        </label>
        <input
          type="text"
          className="text-black"
          value={roomName}
          onChange={handleRoomNameChange}
          name="room-name"
          id="room-name"
        />
        <label htmlFor="room-pass" className="mt-5">
          Room pass
        </label>
        <input
          type="text"
          value={roomPass}
          onChange={handleRoomPassChange}
          className="text-black"
          name="room-pass"
          id="room-pass"
        />
        <button className="btn mt-5" onClick={handleCreateRoom}>
          create room
        </button>
        <button className="btn mt-5" onClick={handleJoinRoom}>
          join room
        </button>
      </div>
    </div>
  );

  function handleCreateRoom(): void {
    socket.emit("room-create-request", {
      roomName: roomName,
      userName: userName,
      roomPass: roomPass,
    });
  }

  function handleJoinRoom(): void {
    socket.emit("room-join-request", {
      roomName: roomName,
      userName: userName,
      roomPass: roomPass,
    });
  }

  function handleRoomNameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRoomName(event.target.value);
  }

  function handleRoomPassChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRoomPass(event.target.value);
  }

  function handleUserNameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setUserName(event.target.value);
  }
};

export default CreateOrJoinRoomMenu;
