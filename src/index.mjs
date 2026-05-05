import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
}

const resoveIndexByUserId = (request, response, next) => {
    const { body,
        params: { id }
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();
}

app.use(loggingMiddleware);

const mockUsers = [
    { id: 1, userName: "anson", displayName: "Anson" },
    { id: 2, userName: "jason", displayName: "Jason" },
    { id: 3, userName: "adam", displayName: "Adam" },
    { id: 4, userName: "jack", displayName: "Jack" },
    { id: 5, userName: "tina", displayName: "Tina" },
    { id: 6, userName: "marilyn", displayName: "Marilyn" },
    { id: 7, userName: "henry", displayName: "Henry" },

];

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello World!" });
});

app.get("/api/users", (request, response) => {
    console.log(request.query);
    const {
        query: { filter, value },
    } = request;
    //when filter and value are undefined
    // if(!filter &&  !value) return response.send(mockUsers);

    if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    return response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
    // console.log(request.body);
    const { body } = request;
    const newUsers = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
    mockUsers.push(newUsers);
    return response.status(201).send(newUsers);
});

app.get("/api/users/:id", resoveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});


app.get("/api/products", (request, response) => {
    response.send([
        { id: 123, prosucts: "Chicken Breats", price: 12.20 }
    ]);
});

app.put("/api/users/:id", resoveIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return response.sendStatus(200);
});


app.patch("/api/users/:id", resoveIndexByUserId, (request, response) => {
    const { body,
        findUserIndex
    } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
});

app.delete("/api/users/:id", resoveIndexByUserId, (request, response) => {
    const { findUserIndex } = request;

    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// localhost:3000
// localhost:3000/users
// localhost:3000/products
// localhost:3000/products?key=value&key2=value2

// PUT
// PATCH
// DELET