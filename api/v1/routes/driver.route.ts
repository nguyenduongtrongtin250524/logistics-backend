import express from "express";
const router = express.Router();

import validate from "../validates/driver.validate";
import controller from "../controllers/driver.controller";

router.post(
  "/register",
  validate.register,
  controller.register
);

export default router;