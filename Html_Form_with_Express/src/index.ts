import * as fs from 'fs';
import * as https from 'https';
import { port, sslCert, sslKey } from './route.js';
// import { router } from express.Router();
// import { Router } from 'express';


const options = {
  key: fs.readFileSync(sslKey),
  cert: fs.readFileSync(sslCert),
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hi from sound & secure connection!');
}).listen(port, () => console.log(`Server is running on https://localhost:${port}/`));


