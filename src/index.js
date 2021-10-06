const express = require('express');

const app = express();

app.get("/courses", (request, response)=>{
    return response.json(["Cursos 1", "Cursos 2", "Cursos 3"]);
});

app.post("/courses", (request, response)=>{
    return response.json(["Cursos 1", "Cursos 2", "Cursos 3","Cursos 4"]);
});

app.put("/courses:id",(request, response)=>{
    return response.json(["Cursos 6", "Cursos 2", "Cursos 3","Cursos 4"]);
});

app.patch("/courses:id",(request, response)=>{
    return response.json(["Cursos 6", "Cursos 7", "Cursos 3","Cursos 4"]);
});

app.delete("/courses:id",(request, response)=>{
    return response.json(["Cursos 6", "Cursos 7","Cursos 4"]);
});

app.listen(3333);