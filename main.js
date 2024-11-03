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

app.use(express.json());

app.put("/notes/:note", (req, res) => {
  const note = req.params.note;
  const text = req.params.text;
  if (notes[note]) {
    notes[note] = text;
    res.send("Note updated");
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/notes/:note", (req, res) => {
  const note = req.params.note;
  if (notes[note]) {
    delete notes[note];
    res.send("Note deleted");
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/notes", (req, res) => {
  const notesList = Object.keys(notes).map((note) => ({
    name: note,
    text: notes[noteName],
  }));
  res.status(200).send(notesList);
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running: http://${host}:${port}`);
});
