import express from 'express';
const app = express();

const PORT = process.env.PORT || 5000;

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
        query: {filter, value},
    } = request;
    //when filter and value are undefined
    // if(!filter &&  !value) return response.send(mockUsers);

    if(filter && value) return response.send(
        mockUsers.filter((user)=>user[filter].includes(value))
    );
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