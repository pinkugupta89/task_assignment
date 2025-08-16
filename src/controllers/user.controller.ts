import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};

export const refreshUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};
