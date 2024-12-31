import express from "express";
const router = express.Router();

import validate from "../validates/user.validate";

import controller from "../controllers/user.controller";

router.post(
  "/register",
  validate.register, 
  controller.register
);
router.post(
  "/login",
  controller.login
);
router.post("/refreshToken", controller.refreshToken);

export default router;