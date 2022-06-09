const {data} = require("./p4-data.js");
const fastify = require("fastify")();
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
const {
    getQuestions,
    getAnswers,
    getQuestionsAnswers,
    getQuestion,
    getAnswer,
    getQuestionAnswer,
} = require('./p4-module.js');

fastify.get("/cit/question", function (request,reply){
    response= {error: "", statusCode: 200, questions: getQuestions()}
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});

fastify.get("/cit/answer", function (request,reply){
    response= {error: "", statusCode: 200, questions: getAnswers()}
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});
fastify.get("/cit/questionanswer", function (request,reply){
    response= {error: "", statusCode: 200, "questions_answers:": getQuestionsAnswers()};
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});
fastify.get("/cit/question/:number", function (request,reply)
{
    let {number} = request.params;
    response= {error: "", 
    statusCode: 200, 
    question: getQuestion(number).question,
     number: parseInt(number),};
    
     reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});

fastify.get("/cit/answer/:number", function (request,reply)
{
    let {number} = request.params;
    response= {error: "", 
    statusCode: 200, 
    answer: getAnswer(number).answer,
     number: parseInt(number),};
    
     reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});

fastify.get("/cit/questionanswer/:number", function (request,reply)
{
    let {number} = request.params;
    response= {error: "", 
    statusCode: 200, 
    question: getQuestion(number).question,
    answer: getAnswer(number).answer,
    number: parseInt(number),};
    
     reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});

fastify.get('*' , function (request,reply) {
    response= {error: "Route not found", statusCode: 404,}
    reply
    .code(200)
    .header('Content-Type', 'application/json; charset= utf-8')
    .send(response);
});
