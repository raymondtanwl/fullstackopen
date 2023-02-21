const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(
  morgan(function (tokens, req, res) {
    console.log("req", req);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const generateId = () => {
  const newId = getRandomInt(9999);
  if (persons.filter((p) => p.id === newId).length > 0) {
    return generateId();
  }

  return newId;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "Content missing",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    });
  }

  if (
    persons.filter((p) => p.name.toLowerCase() === body.name.toLowerCase())
      .length > 0
  ) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.write(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
