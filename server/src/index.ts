import { createServer, IncomingMessage, ServerResponse } from 'http';
const path = require('path');
const { createTable, connectDatabase } = require(path.resolve(
  __dirname,
  'models/table'
));
const Task = require('./controllers/taskController');

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const PORT = process.env.PORT || 5000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/tasks' && req.method === 'GET') {
    Task.getTasks(req, res);
  } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'GET') {
    const profile = req.url.split('/')[3];
    Task.getProfileTasks(req, res, profile);
  } else if (req.url === '/api/tasks' && req.method === 'POST') {
    Task.createTask(req, res);
  }
  // else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'PUT') {
  //   const id = req.url.split('/')[3];
  //   updateTask(req, res, id);
  // } else if (req.url.match(/\/api\/tasks\/\w+/) && req.method === 'DELETE') {
  //   const id = req.url.split('/')[3];
  //   deleteTask(req, res, id);
  // }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

server.listen(PORT, () => {
  connectDatabase();
  console.log(`Server listening on port ${PORT}`);
});
