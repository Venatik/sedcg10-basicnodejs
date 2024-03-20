import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import userValidator from "../middleware/user-validator.js";

const router = Router();

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/:id/logout", AuthController.logoutUser);
router.post("/refresh-token", AuthController.refreshAccessToken);

export default router;