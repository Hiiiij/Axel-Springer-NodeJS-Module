import express, { Request, Response, NextFunction } from "express" //@types/express
import userHandelers from './userControllers.js';


const router = express.Router();
const app = express();
app.use(express.json());


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  if (req.headers.authorization === "Bearer abcd")
  {
    next()
  } else
  {
    res.status(401).send("Unauthorized");
  }
}
 
const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  if (!req.body || !req.body.name)
  {
    res.status(403).json({ message: "Name is required" });
  } else
  {
    next()
  }
};

//Creating API Endpoints
router.get("/users", userHandelers.getAll)

router.get("/users/:id", userHandelers.get);

router.post("/users", authMiddleware, validationMiddleware, userHandelers.post);
router.delete("/users/:id", authMiddleware, userHandelers.remove)
router.put("/users/:id", userHandelers.put)

router.all('/secret', (req: Request, res: Response) => {
    console.log("a request has been made to the secure route");
    res.json({ message: "request send" });
})

export default router;