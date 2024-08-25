//asynch method of loading modules and supporing tree-shaking (eliminating unused code)
import http from 'http';
import dotenv from 'dotenv';
import { greeting } from './helpers';
import { port } from './config';
import { logServerMessage } from './logger';

//create server
http.createServer((req, res) => {
//set http headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(greeting());
}).listen(port, () => logServerMessage(`Server is running on http://localhost:${port}/`));

