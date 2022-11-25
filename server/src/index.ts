import { createServer, IncomingMessage, ServerResponse } from 'http';
const path = require('path');
const { createTables, connectDatabase, dropTables } = require(path.resolve(
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
    const profileId = req.url.split('/')[3];
    Task.getProfileTasks(req, res, profileId);
  } else if (req.url === '/api/tasks' && req.method === 'POST') {
    Task.createTask(req, res);
  } else if (req.url === '/api/tasks' && req.method === 'DELETE') {
    Task.removeTask(req, res);
  } else if (req.url === '/api/profiles' && req.method === 'GET') {
    Task.getProfiles(req, res);
  } else if (req.url === '/api/profiles' && req.method === 'POST') {
    Task.createUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

server.listen(PORT, () => {
  createTables();
  console.log(`Server listening on port ${PORT}`);
});
