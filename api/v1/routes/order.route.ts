import express from "express";
const router = express.Router();

import validate from "../validates/order.validate";
import controller from "../controllers/order.controller";

router.post(
  "/create",
  validate.create,
  controller.create
);

export default router;