import { Express } from "express";

import userRoutes from "./user.route";
import orderRoutes from "./order.route";
import driverRoutes from "./driver.route";
import paymentRoutes from "./payment.route";

const routesV1 = (app: Express) => {
  const preRoute = "/api/v1";
  
  app.use(preRoute + "/users", userRoutes);
  app.use(preRoute + "/orders", orderRoutes); 
  app.use(preRoute + "/drivers", driverRoutes);
  app.use(preRoute + "/payments", paymentRoutes);
}

export default routesV1;