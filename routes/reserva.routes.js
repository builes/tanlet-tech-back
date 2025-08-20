import { Router } from "express";
import {
  cancelarReserva,
  crearReserva,
  obtenerReservasPorDia,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/:id", obtenerReservasPorDia);

router.post("/", crearReserva);

router.put("/:id_reserva", cancelarReserva);

export default router;
