import { Express } from "express";

import userRoutes from "./user.route";

const routesV1 = (app: Express) => {
  const preRoute = "/api/v1";
  
  app.use(preRoute + "/users", userRoutes);
}

export default routesV1;