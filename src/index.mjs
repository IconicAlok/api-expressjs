import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import { mockUsers } from "./utils/constants.mjs";
import session from "express-session";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("hellowrold"));
app.use(session({ secret: "hello", resave: false, saveUninitialized: false }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello World!" });
});

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS" });
  request.session.user = findUser;
  return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) =>
    console.log(session),
  );
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});
app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []);
});
