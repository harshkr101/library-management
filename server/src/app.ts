import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

import apiRoutes from "./routes";

export const app = express();
const port = 3001;
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(helmet());

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
