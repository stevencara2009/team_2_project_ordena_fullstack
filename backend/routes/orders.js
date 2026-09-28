import { Router } from "express";
import { OrderController } from "../controllers/orders.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.js";

export const createOrderRouter = ({ orderModel }) => {
  const orderRouter = Router();
  const orderController = new OrderController({ orderModel });

  // ============================
  // RUTA PÚBLICA (cliente, vía QR)
  // ============================
  orderRouter.post("/client", orderController.createFromClient);

  // ============================
  // RUTAS PROTEGIDAS (staff)
  // ============================
  orderRouter.get(
    "/",
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
    orderController.getAll,
  );
  orderRouter.get(
    "/table/:id",
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
    orderController.getByTable,
  );
  orderRouter.get(
    "/:id",
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
    orderController.getById,
  );
  orderRouter.post(
    "/",
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
    orderController.create,
  );
  orderRouter.patch(
    "/:id",
    verifyToken,
    authorizeRoles("ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"),
    orderController.update,
  );
  orderRouter.delete(
    "/:id",
    verifyToken,
    authorizeRoles("ADMINISTRADOR"),
    orderController.delete,
  );

  return orderRouter;
};
