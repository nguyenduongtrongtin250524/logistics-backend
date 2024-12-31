import express from "express";
const router = express.Router();

import validate from "../validates/notification.validate";
import controller from "../controllers/notification.controller";

router.post(
  "/order-status",
  validate.orderStatus,
  controller.orderStatus
);

export default router;