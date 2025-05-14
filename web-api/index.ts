import express, { Request, Response } from "express";

const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const data = {
    message: "Request Succeeded",
    status: "success",
    code: 200,
  };
  res.json(data);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
