const rooms = {};

const io = require("socket.io")(3004, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("alert-message", "test");
  socket.on("room-create-request", ({ userName, roomName, roomPass }) => {
    console.log("creating room...");
    if (roomName != "" && !rooms[roomName]) {
      rooms[roomName] = {
        name: roomName,
        players: [
          {
            id: socket.id,
            name: userName,
            health: 40,
          },
        ],
        roomPass: roomPass,
      };

      socket.emit("room-create-success", rooms[roomName]);
    } else {
      console.log("invalid room creation request...");
      socket.emit(
        "room-already-exists",
        `The room ${roomName} already exists, try joining or try a new name.`
      );
    }
  });

  socket.on("room-join-request", ({ userName, roomName, roomPass }) => {
    if (rooms[roomName] && rooms[roomName].roomPass === roomPass) {
      console.log("joining room...");
      if (!rooms[roomName].players.some((player) => player.id == socket.id)) {
        rooms[roomName].players.push({
          id: socket.id,
          name: userName,
          health: 40,
        });
      }
      socket.emit("room-join-success", rooms[roomName]);
    } else if (!rooms[roomName]) {
      socket.emit("room-join-error", `The room "${roomName}" does not exist.`);
    } else {
      socket.emit(
        "room-join-error",
        `Incorrect password for room "${roomName}"`
      );
    }
  });
});
