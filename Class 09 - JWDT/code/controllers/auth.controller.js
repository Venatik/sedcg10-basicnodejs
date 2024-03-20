import AuthModel from "../models/auth.model.js";
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from "../services/jwt.service.js";

export default class AuthController {
    static async registerUser(req, res) {
        try {
            const userData = req.body;
            const registeredUser = await AuthModel.registerUser(userData);
            res.status(201).send(registeredUser);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async loginUser(req, res) {
        try {
            const credentials = req.body;
            const user = await AuthModel.loginUser(credentials);
            // Crate and send token to the client
            const accessToken = createAccessToken(user.id);
            res.setHeader("Autherization", accessToken);

            // Create and send refresh token to the client
            const refreshToken = createRefreshToken(user.id);

            // Saving the refresh token in the database
            await AuthModel.saveRefreshToken(refreshToken, user.id);

            res.cookie("refresh-token", refreshToken), {
                httpOnly: true,
                secure: false,
                path: "/api/refresh-token",
            };
            res.status(200).send({ user, accessToken, refreshToken });
        } catch (error) {
            res.status(401).send(error.message);
        }
    }

    static async logoutUser(req, res) {
        try {
            const userId = req.params.id;
            const refreshToken = req.body.refreshToken;

            await AuthModel.deleteRefreshToken(userId, refreshToken);
            res.status(200).send("User logged out successfully");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async refreshAccessToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            // If the token doesn't exist
            if (!refreshToken) {
                return res.sendStatus(403);
            }
            const { userId } = verifyRefreshToken(refreshToken);

            const foundUser = await AuthModel.getById(userId);

            if (!foundUser) {
                res.sendStatus(403);
            }

            if (!foundUser.refreshToken.some(token => token === refreshToken)) {
                res.sendStatus(403);
            }

            const accessToken = createAccessToken(foundUser.id);
            //1. Create a new refresh token
            const newRefreshToken = createRefreshToken(foundUser.id);

            //2. Delete the old refresh token
            await AuthModel.deleteRefreshToken(foundUser.id, refreshToken);

            //3. Save the new refresh token
            await AuthModel.saveRefreshToken(foundUser.id, newRefreshToken);

            //4. Send new access and refresh tokens to the client
            res.status(200).send({ accessToken, refreshToken: newRefreshToken });
        } catch (error) {
            res.status(403).send(error.message);
        }
    }
}