import { Router } from "express";
import {
  mostrarServicios,
  mostrarServicioPorId,
} from "../controllers/servicios.controller.js";

const router = Router();

// Ruta para registro
router.get("/", mostrarServicios);

router.get("/:id", mostrarServicioPorId);

export default router;
