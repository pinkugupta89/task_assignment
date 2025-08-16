import { Router } from "express";
import { getCities } from "../controllers/city.controller";

const router = Router();
router.get("/cities", getCities);

export default router;