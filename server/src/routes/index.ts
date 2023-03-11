import { Request, Response, Application } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import categoryRoute from "./category.route";
const initRoutes = (app: Application) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/category", categoryRoute);
  return app.use("/", (req: Request, res: Response) => {
    res.send("server on...");
  });
};

export default initRoutes;
