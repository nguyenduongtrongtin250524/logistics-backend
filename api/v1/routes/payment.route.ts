import express from "express";
const router = express.Router();

import validate from "../validates/payment.validate";
import controller from "../controllers/payment.controller";

router.post(
  "/create",
  validate.create,
  controller.create
);

export default router;