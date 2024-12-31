import express from "express";
const router = express.Router();

import validate from "../validates/route.validate";
import controller from "../controllers/route.controller";

router.post(
  "/optimize",
  validate.optimizes,
  controller.optimizes
);

export default router;