import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { googleLoginRouter } from "./routes/auth.route";
import helmet from "helmet"
import morgan from "morgan";
import { userRouter } from "./routes/user.route";

dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")
app.use(helmet())

app.use(googleLoginRouter);
app.use(userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});