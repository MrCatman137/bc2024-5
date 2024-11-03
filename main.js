const { program } = require("commander");
const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();

program
  .requiredOption("-h, --host <host>", "server host")
  .requiredOption("-p, --port <port>", "server port")
  .requiredOption("-c, --cache <path>", "cache directory path");

program.parse(process.argv);

const { host, port, cache } = program.opts();

app.get("/", (req, res) => {
  res.send("Yepi");
});

let notes = {};

app.get("/notes/:note", (req, res) => {
  const note = req.params.note;
  if (notes[note]) {
    res.send(notes[note]);
  }
  res.status(404).send("Not found");
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running: http://${host}:${port}`);
});
