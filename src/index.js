const { request, response } = require('express');
const express = require('express');
const { v4 : uuidv4} = require("uuid")


const app = express();

app.use(express.json());

const custumers = [];

//middleware
function verifyExistsAccountCPF(request,response,next){
    const {cpf} =  request.headers;

    const custumer = custumers.find(custumer =>custumer.cpf === cpf);

    if(!custumer){
        return response.status(400).json({error: "Custurmers not found"});
    }

    request.custumer = custumer;

    return next();
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation)=>{
        if(operation.type === 'credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    },0);

    return balance;
}

app.post("/account", (request, response)=>{
    const {cpf,name} = request.body;

    const custumersAlreadyExists = custumers.some(
        (custumer) => custumer.cpf === cpf
    );

    if (custumersAlreadyExists){
        return response.status(400).json({ error:"Custumer already exist!"})
    }

    const id = uuidv4();

    custumers.push({
        cpf,
        name,
        id,
        statement:[]    
    });

    return response.status(201).send();
});

app.get("/statement",verifyExistsAccountCPF,(request, response)=>{
    const {custumer} = request;
    return response.status(200).json(custumer.statement);
});

app.post("/deposit", verifyExistsAccountCPF,(request,response)=>{
   const {description,amount} = request.body;

   const {custumer} = request;

   const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type:"credit"
   }

   custumer.statement.push(statementOperation);

   return response.status(201).send();
})

app.post("/withdraw",verifyExistsAccountCPF,(request,response)=>{
    const {amount} = request.body;
    const {custumer} = request;

    const balance = getBalance(custumer.statement);

    if (balance < amount){
        return response.status(400).json({ error:"Insufficient founds!"})
    }

    const statementOperation = {
        amount,
        created_at:new Date(),
        type: "debit",
    };

    custumer.statement.push(statementOperation);

    return response.status(201).send();
});

app.listen(3333);