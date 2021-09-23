const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CRUDDataBase",
  password: "passass224",
  port: 5432,
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create-room", (req, res) => {
  const roomName = req.body.name;
  const roomPass = req.body.pass;
  const sqlInsert = "INSERT INTO rooms (room_name, room_pass) VALUES ($1, $2)";
  console.log(roomName, roomPass);
  pool.query(sqlInsert, [roomName, roomPass], (err, result) => {
    console.log(err);
    res.status(200).send("done");
  });
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
