import express from 'express';
const app = express();

const PORT = process.env.PORT || 5000;

const mockUsers = [
    { id: 1, userName: "anson", displayName: "Anson" },
    { id: 2, userName: "jonson", displayName: "Jonson" },
    { id: 3, userName: "adam", displayName: "Adam" }
];

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello World!" });
});

app.get("/api/users", (request, response) => {
    response.send(mockUsers);
});

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId)) return response.status(404).send({ mas: "Bad request or invalid id !" });
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});


app.get("/api/products", (request, response) => {
    response.send([
        { id: 123, prosucts: "Chicken Breats", price: 12.20 }
    ]);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});