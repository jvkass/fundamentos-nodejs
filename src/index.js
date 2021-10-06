const express = require('express');

const app = express();

app.use(express.json());

app.get("/courses", (request, response)=>{
    const query = request.query;
    console.log(query);
    return response.json(["Cursos 1", "Cursos 2", "Cursos 3"]);
});

app.post("/courses", (request, response)=>{
    const body = request.body;
    console.log(body);

    return response.json(["Cursos 1", "Cursos 2", "Cursos 3","Cursos 4"]);
});

app.put("/courses/:id",(request, response)=>{
    const {id} = request.params;
    console.log(id);
    return response.json(["Cursos 6", "Cursos 2", "Cursos 3","Cursos 4"]);
});

app.patch("/courses/:id",(request, response)=>{
    return response.json(["Cursos 6", "Cursos 7", "Cursos 3","Cursos 4"]);
});

app.delete("/courses/:id",(request, response)=>{
    return response.json(["Cursos 6", "Cursos 7","Cursos 4"]);
});

app.listen(3333);