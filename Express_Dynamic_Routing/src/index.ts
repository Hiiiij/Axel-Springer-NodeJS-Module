import express, { Request, Response, NextFunction } from "express" //@types/express
import {port } from "./config"
import router from './routes.js'


const app = express();
//middleware to send a data as json
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
