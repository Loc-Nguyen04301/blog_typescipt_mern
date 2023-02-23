import express from "express";
import authController from "../controllers/auth.controller";
import { validRegister } from "../middlewares/valid";

const router = express.Router();

router.post("/register", validRegister, authController.register);
router.get("/active", authController.activeAccount);
router.post("/login", authController.login);
router.get("/refresh_token", authController.refreshToken);
router.get("/logout", authController.logout);

export default router;
