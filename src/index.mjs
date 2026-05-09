import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("hellowrold"));
app.use(routes);

app.get("/", (request, response) => {
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
