import { Request, Response } from "express";
import * as cityService from "../services/city.service";

export const getCities = async (req: Request, res: Response) => {
    try {
        const { country = "PL", page = 1, limit = 10 } = req.query as {
            country?: string;
            page?: number;
            limit?: number;
        };
        const cities = await cityService.getCity({ country, limit, page });
        res.status(201).send(cities);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};
