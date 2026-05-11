import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import {
  filterUserValidationSchema,
  createUserValidationSchema,
} from "../utils/validationSchemas.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resoveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.get(
  "/api/users",
  checkSchema(filterUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;
    //when filter and value are undefined
    // if(!filter &&  !value) return response.send(mockUsers);

    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value)),
      );
    return response.send(mockUsers);
  },
);

router.get("/api/users/:id", resoveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

/*
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    // console.log(request.body);
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(404).send({ errors: result.array() });

    const data = matchedData(request);
    const newUsers = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUsers);
    return response.status(201).send(newUsers);
  },
);
*/

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result.array());
    const data = matchedData(request);
    console.log(data);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return response.sendStatus(400);
    }
  },
);

router.put("/api/users/:id", resoveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resoveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resoveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
