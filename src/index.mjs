import express from "express";

import routes from "./routes/index.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
